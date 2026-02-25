import { SubManagementActionBar } from "@/features/SubManagement/components/SubManagementActionBar";
import { SubManagementMetricsGrid } from "@/features/SubManagement/components/SubManagementMetricsGrid";

export function SubManagementView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sub Management</h1>
      <SubManagementActionBar />
      <SubManagementMetricsGrid />
    </div>
  );
}
