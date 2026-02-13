"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

type MetricCardData = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  subtitle: string;
  sparklineData: { v: number }[];
};

const chartConfigUp = {
  v: { label: "Value", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const chartConfigDown = {
  v: { label: "Value", color: "var(--color-destructive)" },
} satisfies ChartConfig;

const metrics: MetricCardData[] = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    change: "+12.5%",
    trend: "up",
    description: "Trending up this month",
    subtitle: "Visitors for the last 6 months",
    sparklineData: [{ v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 28 }, { v: 35 }],
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "-20%",
    trend: "down",
    description: "Down 20% this period",
    subtitle: "Acquisition needs attention",
    sparklineData: [{ v: 35 }, { v: 30 }, { v: 32 }, { v: 25 }, { v: 22 }, { v: 20 }],
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    description: "Strong user retention",
    subtitle: "Engagement exceeds targets",
    sparklineData: [{ v: 18 }, { v: 22 }, { v: 20 }, { v: 28 }, { v: 32 }, { v: 36 }],
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    description: "Steady performance increase",
    subtitle: "Meets growth projections",
    sparklineData: [{ v: 15 }, { v: 18 }, { v: 20 }, { v: 22 }, { v: 24 }, { v: 28 }],
  },
  {
    title: "Avg. Order Value",
    value: "$89.50",
    change: "+7.2%",
    trend: "up",
    description: "Higher basket sizes",
    subtitle: "Upsell strategy is working",
    sparklineData: [{ v: 22 }, { v: 24 }, { v: 23 }, { v: 28 }, { v: 30 }, { v: 32 }],
  },
  {
    title: "Churn Rate",
    value: "2.4%",
    change: "-0.5%",
    trend: "down",
    description: "Slight increase in churn",
    subtitle: "Review retention efforts",
    sparklineData: [{ v: 30 }, { v: 28 }, { v: 29 }, { v: 25 }, { v: 24 }, { v: 22 }],
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    description: "Improved funnel performance",
    subtitle: "Landing page optimizations",
    sparklineData: [{ v: 12 }, { v: 15 }, { v: 14 }, { v: 18 }, { v: 20 }, { v: 22 }],
  },
  {
    title: "Support Tickets",
    value: "342",
    change: "-15%",
    trend: "down",
    description: "Fewer issues reported",
    subtitle: "Product stability improving",
    sparklineData: [{ v: 40 }, { v: 36 }, { v: 38 }, { v: 30 }, { v: 28 }, { v: 24 }],
  },
  {
    title: "Page Views",
    value: "1.2M",
    change: "+18.3%",
    trend: "up",
    description: "Traffic surge this month",
    subtitle: "Marketing campaigns effective",
    sparklineData: [{ v: 20 }, { v: 28 }, { v: 25 }, { v: 32 }, { v: 38 }, { v: 42 }],
  },
  {
    title: "Session Duration",
    value: "4m 32s",
    change: "+8.1%",
    trend: "up",
    description: "Users staying longer",
    subtitle: "Content engagement is high",
    sparklineData: [{ v: 18 }, { v: 20 }, { v: 22 }, { v: 25 }, { v: 28 }, { v: 30 }],
  },
  {
    title: "Bounce Rate",
    value: "38.5%",
    change: "-3.2%",
    trend: "down",
    description: "Fewer users leaving early",
    subtitle: "UX improvements paying off",
    sparklineData: [{ v: 35 }, { v: 32 }, { v: 33 }, { v: 28 }, { v: 26 }, { v: 24 }],
  },
  {
    title: "Net Promoter Score",
    value: "72",
    change: "+5.0%",
    trend: "up",
    description: "Customer satisfaction up",
    subtitle: "Positive feedback increasing",
    sparklineData: [{ v: 55 }, { v: 58 }, { v: 60 }, { v: 65 }, { v: 68 }, { v: 72 }],
  },
];

function MiniSparkline({
  data,
  trend,
}: {
  data: { v: number }[];
  trend: "up" | "down";
}) {
  const config = trend === "up" ? chartConfigUp : chartConfigDown;
  return (
    <ChartContainer config={config} className="h-8 w-16">
      <AreaChart
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id={`fill-${trend}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={`var(--color-v)`}
              stopOpacity={0.3}
            />
            <stop
              offset="100%"
              stopColor={`var(--color-v)`}
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="var(--color-v)"
          strokeWidth={1.5}
          fill={`url(#fill-${trend})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

function MetricCard({ metric }: { metric: MetricCardData }) {
  const isUp = metric.trend === "up";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <Card className="gap-4">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground font-medium">
            {metric.title}
          </Label>
          <div className="flex items-center gap-1.5">
            <MiniSparkline data={metric.sparklineData} trend={metric.trend} />
            <Badge
              variant="outline"
              className={`text-xs font-medium ${
                isUp
                  ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-950"
                  : "text-red-600 border-red-200 bg-red-50 dark:text-red-400 dark:border-red-800 dark:bg-red-950"
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
        <p className="text-muted-foreground text-xs">{metric.subtitle}</p>
      </CardFooter>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <MetricCard key={i} metric={metric} />
        ))}
      </div>
    </div>
  );
}
