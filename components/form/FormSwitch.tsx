"use client";

import type { FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

type FormSwitchProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  containerClassName?: string;
  switchClassName?: string;
  disabled?: boolean;
};

export function FormSwitch<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  containerClassName,
  switchClassName,
  disabled,
}: FormSwitchProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const { field } = useController({ name, control });
  const errorMessage = getFieldErrorMessage(errors, name);

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={String(name)}>{label}</Label>
        <Switch
          id={String(name)}
          checked={Boolean(field.value)}
          aria-invalid={Boolean(errorMessage)}
          className={switchClassName}
          disabled={disabled}
          onCheckedChange={field.onChange}
          onBlur={field.onBlur}
        />
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
