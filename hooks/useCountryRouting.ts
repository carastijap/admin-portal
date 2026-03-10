"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { buildCountryPath, resolveCountryFromPathname } from "@/utils/shared/normalizePath";

export const useCountryRouting = () => {
  const pathname = usePathname();
  const routeCountry = resolveCountryFromPathname(pathname);

  const withCountryPrefix = useCallback(
    (href: string) => buildCountryPath(href, routeCountry),
    [routeCountry]
  );

  return {
    pathname,
    routeCountry,
    withCountryPrefix,
  };
};
