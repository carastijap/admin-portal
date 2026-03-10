import { redirect } from "next/navigation";
import { DEFAULT_COUNTRY } from "@/lib/constants/countries";

/**
 * Redirect to the login page for the default country
 * Middleware should handle the country redirection
 * If the country is not supported, redirect to the default country
 */

export default function Home() {
  redirect(`/${DEFAULT_COUNTRY}/login`);
}
