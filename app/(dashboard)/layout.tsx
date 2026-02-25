import { AppSidebar } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
