"use client";

import * as React from "react";
import { useCombobox } from "downshift";
import type { FieldValues, Path } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";
import { SearchIcon, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/client/cn";

import { getFieldErrorMessage } from "./helpers";

export type FormAutocompleteItem = {
  id: string;
  displayName: string;
  value: string;
};

type FormAutocompleteProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  items: FormAutocompleteItem[];
  label?: string;
  description?: string;
  placeholder?: string;
  emptyText?: string;
  containerClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
};

export function FormAutocomplete<TFieldValues extends FieldValues>({
  name,
  items,
  label,
  description,
  placeholder = "Search...",
  emptyText = "No results found",
  containerClassName,
  inputClassName,
  disabled,
}: FormAutocompleteProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const { field } = useController({ name, control });

  const selectedItem = React.useMemo(() => {
    const currentValue =
      typeof field.value === "string" ? field.value : String(field.value ?? "");

    return items.find((item) => item.value === currentValue) ?? null;
  }, [field.value, items]);

  const [inputValue, setInputValue] = React.useState(
    selectedItem?.displayName ?? ""
  );

  const filteredItems = React.useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) {
      return items;
    }

    return items.filter((item) => {
      return (
        item.displayName.toLowerCase().includes(query) ||
        item.value.toLowerCase().includes(query)
      );
    });
  }, [inputValue, items]);

  const errorMessage = getFieldErrorMessage(errors, name);
  const hasSelectedItem = Boolean(selectedItem);

  const clearSelection = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      field.onChange("");
      setInputValue("");
    },
    [field]
  );

  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getMenuProps,
    getItemProps,
    openMenu,
  } = useCombobox<FormAutocompleteItem>({
    items: filteredItems,
    itemToString: (item) => item?.displayName ?? "",
    selectedItem,
    inputValue,
    onInputValueChange: ({ inputValue: nextInputValue }) => {
      setInputValue(nextInputValue ?? "");
    },
    onSelectedItemChange: ({ selectedItem: nextSelectedItem }) => {
      if (nextSelectedItem) {
        field.onChange(nextSelectedItem.value);
        setInputValue(nextSelectedItem.displayName);
      }
    },
  });

  return (
    <div className={cn("grid gap-2", containerClassName)}>
      {label ? <Label htmlFor={String(name)}>{label}</Label> : null}

      <div className="relative" onClick={() => openMenu()}>
        <Input
          aria-invalid={Boolean(errorMessage)}
          className={cn("pr-10", inputClassName)}
          disabled={disabled}
          {...getInputProps({
            id: String(name),
            placeholder,
            onBlur: () => field.onBlur(),
          })}
        />
        {hasSelectedItem ? (
          <button
            type="button"
            aria-label="Clear selection"
            className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            onClick={clearSelection}
            disabled={disabled}
          >
            <XIcon className="size-4" />
          </button>
        ) : (
          <SearchIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        )}

        <ul
          {...getMenuProps()}
          className={cn(
            "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover p-1 shadow-md",
            !isOpen && "hidden"
          )}
        >
          {isOpen && filteredItems.length === 0 ? (
            <li className="px-2 py-1.5 text-sm text-muted-foreground">
              {emptyText}
            </li>
          ) : null}

          {isOpen
            ? filteredItems.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    "cursor-pointer rounded-sm px-2 py-1.5 text-sm",
                    highlightedIndex === index && "bg-accent text-accent-foreground"
                  )}
                  {...getItemProps({
                    item,
                    index,
                    onClick: () => {
                      field.onChange(item.value);
                    },
                  })}
                >
                  {item.displayName}
                </li>
              ))
            : null}
        </ul>
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
