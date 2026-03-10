import { NextRequest, NextResponse } from "next/server";
import {
  COUNTRY_COOKIE_NAME,
  DEFAULT_COUNTRY,
  normalizeSupportedCountry,
} from "@/lib/constants/countries";

function buildCountryRedirectPath(pathname: string, country: string) {
  return pathname === "/" ? `/${country}/login` : `/${country}/dashboard`;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const routeCountry = normalizeSupportedCountry(segments[0]);

  if (routeCountry) {
    if (segments.length === 1) {
      const redirectUrl = new URL(`/${routeCountry}/dashboard${search}`, request.url);
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.set(COUNTRY_COOKIE_NAME, routeCountry, { path: "/" });
      return response;
    }

    const response = NextResponse.next();
    const currentCookie = request.cookies.get(COUNTRY_COOKIE_NAME)?.value;

    if (currentCookie !== routeCountry) {
      response.cookies.set(COUNTRY_COOKIE_NAME, routeCountry, { path: "/" });
    }

    return response;
  }

  const cookieCountry = normalizeSupportedCountry(
    request.cookies.get(COUNTRY_COOKIE_NAME)?.value
  );
  const targetCountry = cookieCountry ?? DEFAULT_COUNTRY;
  const redirectPath = buildCountryRedirectPath(pathname, targetCountry);
  const redirectUrl = new URL(`${redirectPath}${search}`, request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set(COUNTRY_COOKIE_NAME, targetCountry, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
