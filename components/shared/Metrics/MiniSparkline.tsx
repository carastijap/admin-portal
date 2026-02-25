"use client";

import { Area, AreaChart } from "recharts";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import type { MetricPoint, MetricTrend } from "@/types/metrics";

const chartConfigUp = {
  v: { label: "Value", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const chartConfigDown = {
  v: { label: "Value", color: "var(--color-destructive)" },
} satisfies ChartConfig;

type MiniSparklineProps = {
  data: MetricPoint[];
  trend: MetricTrend;
  gradientIdPrefix?: string;
};

export function MiniSparkline({
  data,
  trend,
  gradientIdPrefix = "metric",
}: MiniSparklineProps) {
  const config = trend === "up" ? chartConfigUp : chartConfigDown;
  const gradientId = `${gradientIdPrefix}-${trend}`;

  return (
    <ChartContainer config={config} className="h-8 w-16">
      <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="var(--color-v)"
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
