"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ShieldCheckIcon } from "lucide-react";

export function CustomerProfileSection() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-base">
            JN
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold leading-tight">Japeth Naval</p>
          <p className="text-xs text-muted-foreground mt-0.5">Customer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-muted-foreground">Full Name</Label>
          <span className="text-sm font-medium">Japeth Naval</span>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-muted-foreground">Email</Label>
          <span className="text-sm font-medium">japeth@example.com</span>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-muted-foreground">Phone Number</Label>
          <span className="text-sm font-medium">+971 50 123 4567</span>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-xs text-muted-foreground">Documents Verified</Label>
          <div className="mt-0.5">
            <Badge
              variant="secondary"
              className="gap-1 text-xs font-medium text-emerald-700 bg-emerald-50"
            >
              <ShieldCheckIcon className="size-3" />
              Verified
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
