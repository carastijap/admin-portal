"use client";

import type { FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

type FormSelectOption = {
  label: string;
  value: string;
};

type FormSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: FormSelectOption[];
  containerClassName?: string;
  triggerClassName?: string;
  disabled?: boolean;
};

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  placeholder = "Select an option",
  options,
  containerClassName,
  triggerClassName,
  disabled,
}: FormSelectProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const { field } = useController({ name, control });
  const errorMessage = getFieldErrorMessage(errors, name);

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      {label ? <Label htmlFor={String(name)}>{label}</Label> : null}
      <Select
        value={typeof field.value === "string" ? field.value : undefined}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={String(name)}
          aria-invalid={Boolean(errorMessage)}
          className={triggerClassName}
          onBlur={field.onBlur}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description ? (
        <p className="text-muted-foreground text-xs">{description}</p>
      ) : null}
      {errorMessage ? (
        <p className="text-destructive text-xs">{errorMessage}</p>
      ) : null}
    </div>
  );
}
