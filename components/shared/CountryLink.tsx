"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useCountryRouting } from "@/hooks";

type CountryLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function CountryLink({ href, ...props }: CountryLinkProps) {
  const { withCountryPrefix } = useCountryRouting();

  return <Link href={withCountryPrefix(href)} {...props} />;
}
