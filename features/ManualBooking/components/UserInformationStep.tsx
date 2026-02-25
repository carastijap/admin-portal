"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchIcon, ShieldCheckIcon, ExternalLinkIcon } from "lucide-react";

export function UserInformationStep() {
  return (
    <div className="space-y-6">
      {/* Section title */}
      <h2 className="text-lg font-semibold">User information</h2>

      {/* Search – full width */}
      <div className="relative">
        <Input
          placeholder="Search by name, email or phone..."
          defaultValue="Japeth Naval"
          className="pr-10"
        />
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      </div>

      <Separator />

      {/* Avatar + name section */}
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

      <Separator />

      {/* Detail fields */}
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
          <Label className="text-xs text-muted-foreground">
            Documents Verified
          </Label>
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
      <Separator />

      {/* Document Verification */}
      <h2 className="text-lg font-semibold">Document Verification</h2>
      <p className="text-sm text-muted-foreground -mt-4">
        Ensure all required customer documents are uploaded before proceeding.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Passport */}
        <Card className="overflow-hidden py-0">
          <CardHeader className="pt-4 pb-0">
            <CardTitle className="text-sm">Passport</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="aspect-4/3 w-full rounded-md bg-muted flex items-center justify-center border border-border/50">
              <span className="text-xs text-muted-foreground select-none">
                Passport placeholder
              </span>
            </div>
          </CardContent>
          <CardFooter className="pb-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => window.open("#passport-check", "_blank")}
            >
              <ShieldCheckIcon className="size-4 text-emerald-700" />
              View More
              <ExternalLinkIcon className="size-3 ml-auto" />
            </Button>
          </CardFooter>
        </Card>

        {/* Driver's License */}
        <Card className="overflow-hidden py-0">
          <CardHeader className="pt-4 pb-0">
            <CardTitle className="text-sm">Driver&apos;s License</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="aspect-4/3 w-full rounded-md bg-muted flex items-center justify-center border border-border/50">
              <span className="text-xs text-muted-foreground select-none">
                Driver&apos;s License placeholder
              </span>
            </div>
          </CardContent>
          <CardFooter className="pb-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => window.open("#drivers-license-check", "_blank")}
            >
              <ShieldCheckIcon className="size-4 text-emerald-700" />
              View More
              <ExternalLinkIcon className="size-3 ml-auto" />
            </Button>
          </CardFooter>
        </Card>

        {/* Bank Statements */}
        <Card className="overflow-hidden py-0">
          <CardHeader className="pt-4 pb-0">
            <CardTitle className="text-sm">Bank Statements</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="aspect-4/3 w-full rounded-md bg-muted flex items-center justify-center border border-border/50">
              <span className="text-xs text-muted-foreground select-none">
                Bank Statements placeholder
              </span>
            </div>
          </CardContent>
          <CardFooter className="pb-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => window.open("#bank-statements-check", "_blank")}
            >
              <ShieldCheckIcon className="size-4 text-emerald-700" />
              View More
              <ExternalLinkIcon className="size-3 ml-auto" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
