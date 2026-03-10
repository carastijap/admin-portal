"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountryLink } from "@/components/shared";
import { DateFilter } from "@/features/SubManagement/components/DateFilter";

export function SubManagementActionBar() {
  return (
    <Card className="py-4">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Button asChild>
            <CountryLink href="/manual-booking">New Booking</CountryLink>
          </Button>
          <Button variant="outline">Upload committed Data</Button>
        </div>

        <div className="border-t" />

        <div className="flex flex-wrap items-end gap-4">
          <DateFilter label="Bookings from" />
          <DateFilter label="Bookings to" />
          <div className="ml-auto">
            <Button>Search</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
