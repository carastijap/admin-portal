import {
  DEFAULT_COUNTRY,
  normalizeSupportedCountry,
  type SupportedCountry,
} from "@/lib/constants/countries";

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function resolveCountryFromPathname(pathname: string): SupportedCountry {
  const segments = pathname.split("/").filter(Boolean);
  return normalizeSupportedCountry(segments[0]) ?? DEFAULT_COUNTRY;
}

export function buildCountryPath(
  href: string,
  country: SupportedCountry
): string {
  const normalizedHref = normalizePath(href);
  const hrefSegments = normalizedHref.split("/").filter(Boolean);
  const hrefCountry = normalizeSupportedCountry(hrefSegments[0]);
  const pathWithoutCountry = hrefCountry
    ? `/${hrefSegments.slice(1).join("/")}`
    : normalizedHref;

  return pathWithoutCountry === "/"
    ? `/${country}`
    : `/${country}${pathWithoutCountry}`;
}
