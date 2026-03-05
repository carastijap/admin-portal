"use client";

import * as React from "react";
import { format, isValid, parseISO } from "date-fns";
import type { FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

type FormDatePickerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  containerClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
};

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  placeholder = "Select date",
  containerClassName,
  buttonClassName,
  disabled,
}: FormDatePickerProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const { field } = useController({ name, control });
  const errorMessage = getFieldErrorMessage(errors, name);

  const selectedDate = React.useMemo(() => {
    if (typeof field.value !== "string" || !field.value) {
      return undefined;
    }

    const parsedDate = parseISO(field.value);
    return isValid(parsedDate) ? parsedDate : undefined;
  }, [field.value]);

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      {label ? <Label htmlFor={String(name)}>{label}</Label> : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={String(name)}
            variant="outline"
            disabled={disabled}
            aria-invalid={Boolean(errorMessage)}
            data-empty={!selectedDate}
            className={cn(
              "w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground",
              buttonClassName
            )}
            onBlur={field.onBlur}
          >
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : <span>{placeholder}</span>}
            <CalendarIcon className="size-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate}
            onSelect={(nextDate) => {
              field.onChange(nextDate ? format(nextDate, "yyyy-MM-dd") : "");
            }}
          />
        </PopoverContent>
      </Popover>
      {description ? (
        <p className="text-muted-foreground text-xs">{description}</p>
      ) : null}
      {errorMessage ? (
        <p className="text-destructive text-xs">{errorMessage}</p>
      ) : null}
    </div>
  );
}
