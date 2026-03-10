export const SUPPORTED_COUNTRIES = ["AE", "SA", "TH", "SG"] as const;

export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];

export const DEFAULT_COUNTRY: SupportedCountry = "AE";
export const COUNTRY_COOKIE_NAME = "NEXT_COUNTRY";

export function normalizeSupportedCountry(
  value?: string | null
): SupportedCountry | undefined {
  if (!value) return undefined;

  const country = value.toUpperCase();
  return SUPPORTED_COUNTRIES.find((item) => item === country);
}
