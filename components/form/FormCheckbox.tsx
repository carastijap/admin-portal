"use client";

import type { ComponentProps } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

type FormCheckboxProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<"input">,
  "name" | "type"
> & {
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  containerClassName?: string;
};

export function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  containerClassName,
  className,
  ...props
}: FormCheckboxProps<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const errorMessage = getFieldErrorMessage(errors, name);

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      <div className="flex items-center gap-2">
        <input
          id={String(name)}
          type="checkbox"
          aria-invalid={Boolean(errorMessage)}
          className={cn(
            "border-input text-primary focus-visible:ring-ring/50 h-4 w-4 rounded border",
            className
          )}
          {...register(name)}
          {...props}
        />
        <Label htmlFor={String(name)}>{label}</Label>
      </div>
      {description ? (
        <p className="text-muted-foreground text-xs">{description}</p>
      ) : null}
      {errorMessage ? (
        <p className="text-destructive text-xs">{errorMessage}</p>
      ) : null}
    </div>
  );
}
