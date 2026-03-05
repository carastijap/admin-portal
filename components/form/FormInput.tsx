"use client";

import type { ComponentProps } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

type FormInputProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<"input">,
  "name"
> & {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  containerClassName?: string;
};

export function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  containerClassName,
  className,
  ...props
}: FormInputProps<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const errorMessage = getFieldErrorMessage(errors, name);

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      {label ? <Label htmlFor={String(name)}>{label}</Label> : null}
      <Input
        id={String(name)}
        aria-invalid={Boolean(errorMessage)}
        className={className}
        {...register(name)}
        {...props}
      />
      {description ? (
        <p className="text-muted-foreground text-xs">{description}</p>
      ) : null}
      {errorMessage ? (
        <p className="text-destructive text-xs">{errorMessage}</p>
      ) : null}
    </div>
  );
}
