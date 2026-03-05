"use client";

import type { ReactNode } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

type FormRadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type FormRadioGroupProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  options: FormRadioOption[];
  defaultValue?: string;
  renderOption?: (params: {
    option: FormRadioOption;
    itemId: string;
    itemDisabled: boolean;
  }) => ReactNode;
  containerClassName?: string;
  groupClassName?: string;
  disabled?: boolean;
};

export function FormRadioGroup<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  options,
  defaultValue,
  renderOption,
  containerClassName,
  groupClassName,
  disabled,
}: FormRadioGroupProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue as never,
  });
  const errorMessage = getFieldErrorMessage(errors, name);

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      {label ? <Label>{label}</Label> : null}
      <RadioGroup
        className={groupClassName}
        value={typeof field.value === "string" ? field.value : undefined}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        aria-invalid={Boolean(errorMessage)}
        disabled={disabled}
      >
        {options.map((option) => {
          const itemId = `${String(name)}-${option.value}`;
          const itemDisabled = Boolean(disabled || option.disabled);

          if (renderOption) {
            return (
              <div key={option.value}>
                {renderOption({
                  option,
                  itemId,
                  itemDisabled,
                })}
              </div>
            );
          }

          return (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                id={itemId}
                value={option.value}
                disabled={itemDisabled}
              />
              <Label htmlFor={itemId}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
      {description ? (
        <p className="text-muted-foreground text-xs">{description}</p>
      ) : null}
      {errorMessage ? (
        <p className="text-destructive text-xs">{errorMessage}</p>
      ) : null}
    </div>
  );
}
