"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateFilterProps = {
  label: string;
};

export function DateFilter({ label }: DateFilterProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-between text-left font-normal"
          >
            {format(date, "yyyy-MM-dd")}
            <CalendarIcon className="size-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
