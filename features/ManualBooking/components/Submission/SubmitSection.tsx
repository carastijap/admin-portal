"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, SendIcon } from "lucide-react";

export function SubmitSection() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
      <div className="flex items-center gap-3">
        <BadgeCheckIcon className="size-6 text-primary" />
        <div>
          <p className="text-sm font-semibold">Ready to Submit</p>
          <p className="text-xs text-muted-foreground">
            All booking details have been reviewed and configured.
          </p>
        </div>
      </div>
      <Button type="submit" size="lg" className="gap-2 px-8">
        <SendIcon className="size-4" />
        Submit Booking
      </Button>
    </div>
  );
}
