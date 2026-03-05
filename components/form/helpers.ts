"use client";

import type { FieldErrors, FieldValues, Path } from "react-hook-form";

export function getFieldErrorMessage<TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
  name: Path<TFieldValues>
): string | undefined {
  const segments = String(name).split(".");
  let current: unknown = errors;

  for (const segment of segments) {
    if (!current || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  if (!current || typeof current !== "object") {
    return undefined;
  }

  const message = (current as { message?: unknown }).message;
  return typeof message === "string" ? message : undefined;
}
