import "server-only"
import { getCookie } from "cookies-next/server"
import { cookies as nextCookies, headers } from "next/headers"
import { COUNTRY_COOKIE_NAME, DEFAULT_COUNTRY } from "@/lib/constants/countries"

const DEFAULT_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "carasti-app-version": "5.7.1",
  "carasti-system-type": "Web",
  "carasti-device-model": "",
} as const

const DEFAULT_LOCALE = "en"
const COUNTRY_CODE_MAPPER: Record<string, string> = {
  AE: "1",
  SA: "966",
  KW: "965",
  QA: "974",
  OM: "968",
  BH: "973",
}

export type ServerFetchOptions = Omit<RequestInit, "headers" | "body"> & {
  headers?: HeadersInit
  body?: unknown
  baseUrlOverride?: string
  withAppHeaders?: boolean
  withAuth?: boolean
  tokenCookieName?: string
  localeCookieName?: string
  countryCookieName?: string
}

function buildApiUrl(endpoint: string, baseUrlOverride?: string) {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint
  }

  const baseUrl = baseUrlOverride ?? process.env.NEXT_PUBLIC_CARASTI_BASE_URL
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_CARASTI_BASE_URL environment variable.")
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "")
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${normalizedBaseUrl}${normalizedEndpoint}`
}

async function buildServerHeaders(options?: ServerFetchOptions) {
  const withAppHeaders = options?.withAppHeaders ?? true
  const withAuth = options?.withAuth ?? true
  const localeCookieName = options?.localeCookieName ?? "NEXT_LOCALE"
  const countryCookieName = options?.countryCookieName ?? COUNTRY_COOKIE_NAME
  const tokenCookieName = options?.tokenCookieName ?? "TOKEN"
  const [headerStore, localeCookie, countryCookie, tokenCookie] = await Promise.all([
    headers(),
    getCookie(localeCookieName, { cookies: nextCookies }),
    getCookie(countryCookieName, { cookies: nextCookies }),
    getCookie(tokenCookieName, { cookies: nextCookies }),
  ])

  const locale =
    headerStore.get("next-locale") ??
    localeCookie ??
    DEFAULT_LOCALE

  const country =
    headerStore.get("next-country") ??
    countryCookie ??
    DEFAULT_COUNTRY

  const token = tokenCookie

  const mergedHeaders = new Headers(withAppHeaders ? DEFAULT_HEADERS : undefined)

  if (withAppHeaders) {
    mergedHeaders.set("carasti-lang", locale)
    mergedHeaders.set(
      "carasti-country-code",
      COUNTRY_CODE_MAPPER[country] ?? COUNTRY_CODE_MAPPER[DEFAULT_COUNTRY]
    )
  }

  if (withAuth && token) {
    mergedHeaders.set("Authorization", `Bearer ${token}`)
  }

  if (options?.headers) {
    const customHeaders = new Headers(options.headers)
    customHeaders.forEach((value, key) => {
      mergedHeaders.set(key, value)
    })
  }

  return mergedHeaders
}

function toRequestBody(body: unknown, headersMap: Headers) {
  if (body == null) return undefined
  if (typeof body === "string" || body instanceof FormData) return body

  if (!headersMap.has("Content-Type")) {
    headersMap.set("Content-Type", "application/json; charset=utf-8")
  }

  return JSON.stringify(body)
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    return response.json()
  }
  return response.text()
}

export async function serverFetch<TResponse = unknown, TTransformed = TResponse>(
  endpoint: string,
  options?: ServerFetchOptions,
  transformFn?: (data: TResponse) => TTransformed
): Promise<TTransformed | null> {
  try {
    const requestUrl = buildApiUrl(endpoint, options?.baseUrlOverride)
    const headersMap = await buildServerHeaders(options)

    const response = await fetch(requestUrl, {
      ...options,
      cache: options?.cache ?? "no-store",
      headers: headersMap,
      body: toRequestBody(options?.body, headersMap),
    })

    const responseData = await parseResponseBody(response)

    if (!response.ok) {
      console.error("Server fetch failed:", response.status, responseData)
      return null
    }

    const parsedData = responseData as TResponse
    return transformFn
      ? transformFn(parsedData)
      : (parsedData as unknown as TTransformed)
  } catch (error) {
    console.error("Server fetch failed:", error)
    return null
  }
}
