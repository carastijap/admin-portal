export type MetricTrend = "up" | "down";

export interface MetricPoint {
  v: number;
};

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  trend: MetricTrend;
  description: string;
  subtitle: string;
  sparklineData: MetricPoint[];
};
