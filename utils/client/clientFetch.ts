"use client"
import { getCookie } from "cookies-next/client"
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

export type ClientFetchOptions = Omit<RequestInit, "headers" | "body" | "method"> & {
  headers?: HeadersInit
  body?: unknown
  baseUrlOverride?: string
  withAppHeaders?: boolean
  withAuth?: boolean
  tokenCookieName?: string
  localeCookieName?: string
  countryCookieName?: string
}

function getLocaleFromClient(cookieName: string) {
  const locale = getCookie(cookieName)
  if (locale) return locale

  if (typeof navigator === "undefined" || !navigator.language) {
    return DEFAULT_LOCALE
  }

  return navigator.language.split("-")[0] || DEFAULT_LOCALE
}

function getCountryCodeFromClient(cookieName: string) {
  const country = (getCookie(cookieName) ?? DEFAULT_COUNTRY).toUpperCase()
  return COUNTRY_CODE_MAPPER[country] ?? COUNTRY_CODE_MAPPER[DEFAULT_COUNTRY]
}

function getApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_CARASTI_BASE_URL
  return baseUrl?.replace(/\/+$/, "") ?? ""
}

function buildApiUrl(endpoint: string, baseUrlOverride?: string) {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint
  }

  const baseUrl = (baseUrlOverride ?? getApiBaseUrl()).replace(/\/+$/, "")
  if (!baseUrl) return null

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${baseUrl}${normalizedEndpoint}`
}

function buildClientHeaders(options?: ClientFetchOptions) {
  const mergedHeaders = new Headers()

  const withAppHeaders = options?.withAppHeaders ?? true
  const withAuth = options?.withAuth ?? true
  const tokenCookieName = options?.tokenCookieName ?? "TOKEN"
  const localeCookieName = options?.localeCookieName ?? "NEXT_LOCALE"
  const countryCookieName = options?.countryCookieName ?? COUNTRY_COOKIE_NAME

  if (withAppHeaders) {
    Object.entries(DEFAULT_HEADERS).forEach(([key, value]) => {
      mergedHeaders.set(key, value)
    })
    mergedHeaders.set("carasti-lang", getLocaleFromClient(localeCookieName))
    mergedHeaders.set(
      "carasti-country-code",
      getCountryCodeFromClient(countryCookieName)
    )
  }

  if (withAuth) {
    const token = getCookie(tokenCookieName)
    if (token) {
      mergedHeaders.set("Authorization", `Bearer ${token}`)
    }
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

export async function clientFetch<TResponse = unknown, TTransformed = TResponse>(
  endpoint: string,
  options?: ClientFetchOptions & { method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" },
  transformFn?: (data: TResponse) => TTransformed
): Promise<TTransformed | null> {
  try {
    const requestUrl = buildApiUrl(endpoint, options?.baseUrlOverride)
    if (!requestUrl) {
      console.error("Client fetch failed: missing NEXT_PUBLIC_CARASTI_BASE_URL.")
      return null
    }

    const headersMap = buildClientHeaders(options)
    const response = await fetch(requestUrl, {
      ...options,
      credentials: options?.credentials ?? "include",
      headers: headersMap,
      body: toRequestBody(options?.body, headersMap),
    })

    const responseData = await parseResponseBody(response)

    if (!response.ok) {
      console.error("Client fetch failed:", response.status, responseData)
      return null
    }

    const parsedData = responseData as TResponse
    return transformFn
      ? transformFn(parsedData)
      : (parsedData as unknown as TTransformed)
  } catch (error) {
    console.error("Client fetch failed:", error)
    return null
  }
}

export async function clientGet<TResponse = unknown, TTransformed = TResponse>(
  endpoint: string,
  options?: ClientFetchOptions,
  transformFn?: (data: TResponse) => TTransformed
): Promise<TTransformed | null> {
  return clientFetch<TResponse, TTransformed>(endpoint, {
    ...options,
    method: "GET",
  }, transformFn)
}

export async function clientPost<TResponse = unknown, TBody = unknown, TTransformed = TResponse>(
  endpoint: string,
  body?: TBody,
  options?: ClientFetchOptions,
  transformFn?: (data: TResponse) => TTransformed
): Promise<TTransformed | null> {
  return clientFetch<TResponse, TTransformed>(endpoint, {
    ...options,
    method: "POST",
    body,
  }, transformFn)
}
