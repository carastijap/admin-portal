"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLinkIcon, ShieldCheckIcon } from "lucide-react";

type DocumentCardProps = {
  title: string;
  placeholder: string;
  href: string;
};

export function DocumentCard({ title, placeholder, href }: DocumentCardProps) {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="pt-4 pb-0">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="aspect-4/3 w-full rounded-md bg-muted flex items-center justify-center border border-border/50">
          <span className="text-xs text-muted-foreground select-none">{placeholder}</span>
        </div>
      </CardContent>
      <CardFooter className="pb-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => window.open(href, "_blank")}
        >
          <ShieldCheckIcon className="size-4 text-emerald-700" />
          View More
          <ExternalLinkIcon className="size-3 ml-auto" />
        </Button>
      </CardFooter>
    </Card>
  );
}
