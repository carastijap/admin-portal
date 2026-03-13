// import { AppSidebar } from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-stretch">
      {/* <AppSidebar /> */}
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-10 xl:px-16">{children}</main>
    </div>
  );
}
