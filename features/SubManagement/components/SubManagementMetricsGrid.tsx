"use client";

import { MetricCard } from "@/components/shared/Metrics/MetricCard";
import { SUB_MANAGEMENT_METRICS } from "@/features/SubManagement/constants";

export function SubManagementMetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SUB_MANAGEMENT_METRICS.map((metric) => (
        <MetricCard
          key={metric.title}
          metric={metric}
          gradientIdPrefix={`sub-management-${metric.title}`}
        />
      ))}
    </div>
  );
}
