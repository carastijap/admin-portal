"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import { MiniSparkline } from "@/components/shared/Metrics/MiniSparkline";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { MetricCardData } from "@/types/metrics";

type MetricCardProps = {
  metric: MetricCardData;
  gradientIdPrefix?: string;
};

export function MetricCard({
  metric,
  gradientIdPrefix = "metric",
}: MetricCardProps) {
  const isUp = metric.trend === "up";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <Card className="gap-4">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-muted-foreground">
            {metric.title}
          </Label>
          <div className="flex items-center gap-1.5">
            <MiniSparkline
              data={metric.sparklineData}
              trend={metric.trend}
              gradientIdPrefix={gradientIdPrefix}
            />
            <Badge
              variant="outline"
              className={`text-xs font-medium ${
                isUp
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                  : "border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
              }`}
            >
              {metric.change}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <CardTitle className="text-3xl font-bold tracking-tight">
          {metric.value}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="flex items-center gap-1 font-medium">
          {metric.description}
          <TrendIcon className="size-4" />
        </div>
        <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
      </CardFooter>
    </Card>
  );
}
