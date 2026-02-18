"use client";

import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TrendingUp,
  TrendingDown,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

// --- Metric card types & config (reused from dashboard) ---

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
    title: "Total Bookings",
    value: "3,842",
    change: "+8.2%",
    trend: "up",
    description: "Bookings trending up",
    subtitle: "Compared to last month",
    sparklineData: [{ v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 28 }, { v: 35 }],
  },
  {
    title: "Pending Approvals",
    value: "127",
    change: "-12%",
    trend: "down",
    description: "Fewer pending items",
    subtitle: "Approval rate improving",
    sparklineData: [{ v: 35 }, { v: 30 }, { v: 32 }, { v: 25 }, { v: 22 }, { v: 20 }],
  },
  {
    title: "Active Subscriptions",
    value: "12,450",
    change: "+5.4%",
    trend: "up",
    description: "Steady subscription growth",
    subtitle: "Retention rate at 94%",
    sparklineData: [{ v: 18 }, { v: 22 }, { v: 20 }, { v: 28 }, { v: 32 }, { v: 36 }],
  },
  {
    title: "Revenue This Period",
    value: "$48,290",
    change: "+15.3%",
    trend: "up",
    description: "Strong revenue growth",
    subtitle: "Exceeds quarterly target",
    sparklineData: [{ v: 15 }, { v: 18 }, { v: 20 }, { v: 22 }, { v: 24 }, { v: 28 }],
  },
  {
    title: "Cancellations",
    value: "56",
    change: "-8.5%",
    trend: "down",
    description: "Cancellations declining",
    subtitle: "Customer satisfaction rising",
    sparklineData: [{ v: 30 }, { v: 28 }, { v: 29 }, { v: 25 }, { v: 24 }, { v: 22 }],
  },
  {
    title: "Avg. Booking Value",
    value: "$125.80",
    change: "+3.7%",
    trend: "up",
    description: "Higher booking values",
    subtitle: "Premium plans gaining traction",
    sparklineData: [{ v: 22 }, { v: 24 }, { v: 23 }, { v: 28 }, { v: 30 }, { v: 32 }],
  },
];

// --- Mini sparkline ---

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
          <linearGradient id={`fill-sub-${trend}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="var(--color-v)"
          strokeWidth={1.5}
          fill={`url(#fill-sub-${trend})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

// --- Metric card ---

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

// --- Date picker ---

function DatePicker({ label }: { label: string }) {
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
            onSelect={(d) => d && setDate(d)}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// --- Page ---

export default function SubManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sub Management</h1>

      {/* Action bar */}
      <Card className="py-4">
        <CardContent className="space-y-4">
          {/* Top row: action buttons */}
          <div className="flex items-center justify-between">
            <Button asChild>
              <Link href="/manual-booking">New Booking</Link>
            </Button>
            <Button variant="outline">Upload committed Data</Button>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Filter row: date pickers + search */}
          <div className="flex flex-wrap items-end gap-4">
            <DatePicker label="Bookings from" />
            <DatePicker label="Bookings to" />
            <div className="ml-auto">
              <Button>Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric cards — 6 visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <MetricCard key={i} metric={metric} />
        ))}
      </div>
    </div>
  );
}
