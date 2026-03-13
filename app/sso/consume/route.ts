import { NextRequest, NextResponse } from "next/server";
import { COUNTRY_COOKIE_NAME, DEFAULT_COUNTRY, normalizeSupportedCountry } from "@/lib/constants/countries";
import { endpoints } from "@/lib/constants/endpoints";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { createServerLogger } from "@/utils/server/logger";

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_CARASTI_BASE_URL;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_CARASTI_BASE_URL environment variable");
  }
  return baseUrl.replace(/\/+$/, "");
}

function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
}

function normalizeHandoffToken(rawToken: string): string {
  // Query params can turn "+" into spaces; restore to avoid invalid exchange payload.
  return rawToken.trim().replace(/ /g, "+");
}

// Allowed internal redirect targets
const ALLOWED_TARGETS = ["manual-booking", "dashboard"] as const;
type AllowedTarget = (typeof ALLOWED_TARGETS)[number];

interface ExchangeResponse {
  msg: string;
  data: {
    token: string;
    expiresIn?: number;
  };
}

const logger = createServerLogger("sso-consume");

function isAllowedTarget(target: string): target is AllowedTarget {
  return ALLOWED_TARGETS.includes(target as AllowedTarget);
}

function sanitizeTarget(to: string | null): AllowedTarget {
  if (!to) return "dashboard";
  
  // Remove leading/trailing slashes
  const cleaned = to.replace(/^\/+|\/+$/g, "");
  
  // Block absolute and external URLs
  if (cleaned.includes("://") || cleaned.startsWith("//")) {
    return "dashboard";
  }
  
  // Only allow whitelisted internal targets
  if (isAllowedTarget(cleaned)) {
    return cleaned;
  }
  
  return "dashboard";
}

async function getTargetCountry(request: NextRequest): Promise<string> {
  const countryParam = request.nextUrl.searchParams.get("country");
  
  // Check query param first
  if (countryParam) {
    const normalized = normalizeSupportedCountry(countryParam);
    if (normalized) return normalized;
  }
  
  // Fall back to cookie country
  const cookieCountry = await getCookie(COUNTRY_COOKIE_NAME, { cookies });
  if (cookieCountry) {
    const normalized = normalizeSupportedCountry(cookieCountry as string);
    if (normalized) return normalized;
  }
  
  // Final fallback to default country
  return DEFAULT_COUNTRY;
}

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const token = request.nextUrl.searchParams.get("token");
    const to = request.nextUrl.searchParams.get("to");
    
    // Validate required parameters
    if (!token || token.trim() === "") {
      logger.error("Missing handoff token in query params", {
        path: request.nextUrl.pathname,
        query: request.nextUrl.searchParams.toString(),
      });
      const country = await getTargetCountry(request);
      return NextResponse.redirect(
        new URL(`/${country}/login?sso=failed`, request.url)
      );
    }
    
    if (!to || to.trim() === "") {
      logger.error("Missing target route (to) in query params", {
        path: request.nextUrl.pathname,
        query: request.nextUrl.searchParams.toString(),
      });
      const country = await getTargetCountry(request);
      return NextResponse.redirect(
        new URL(`/${country}/login?sso=failed`, request.url)
      );
    }
    
    // Call backend exchange endpoint
    const exchangeUrl = buildApiUrl(endpoints.ssoExchange);
    const normalizedToken = normalizeHandoffToken(token);
    
    const exchangeResponse = await fetch(exchangeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: normalizedToken }),
    });
    
    if (!exchangeResponse.ok) {
      const exchangeErrorBody = await exchangeResponse.text();
      logger.error("SSO exchange request failed", {
        status: exchangeResponse.status,
        endpoint: exchangeUrl,
        requestBody: { tokenLength: normalizedToken.length },
        responseBody: exchangeErrorBody,
      });
      const country = await getTargetCountry(request);
      return NextResponse.redirect(
        new URL(`/${country}/login?sso=failed`, request.url)
      );
    }
    
    const exchangeData: ExchangeResponse = await exchangeResponse.json();

    if (!exchangeData.data?.token) {
      logger.error("SSO exchange succeeded but token missing in response", {
        endpoint: exchangeUrl,
        response: exchangeData,
      });
      const country = await getTargetCountry(request);
      return NextResponse.redirect(
        new URL(`/${country}/login?sso=failed`, request.url)
      );
    }
    
    // Sanitize target and get country
    const sanitizedTarget = sanitizeTarget(to);
    const country = await getTargetCountry(request);
    
    // Create redirect response
    const redirectUrl = new URL(
      `/${country}/${sanitizedTarget}`,
      request.url
    );
    const response = NextResponse.redirect(redirectUrl);
    
    // Set TOKEN cookie (Path /, SameSite Lax, Secure in production)
    response.cookies.set("TOKEN", exchangeData.data.token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: exchangeData.data.expiresIn || 86400 * 7, // seconds
    });
    
    return response;
  } catch (error) {
    logger.error("Unhandled error in SSO consume route", { error });
    const country = await getTargetCountry(request);
    return NextResponse.redirect(
      new URL(`/${country}/login?sso=failed`, request.url)
    );
  }
}
