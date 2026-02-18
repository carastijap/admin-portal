"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ListTodo,
  CreditCard,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDownIcon,
  ClipboardListIcon,
  PlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavChild = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavItem =
  | { label: string; href: string; icon: React.ComponentType<{ className?: string }>; children?: never }
  | { label: string; children: NavChild[]; href?: never; icon?: never };

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  {
    label: "Sub Management",
    children: [
      { label: "Overview", href: "/sub-management", icon: CreditCard },
      // { label: "Booking List", href: "/booking-list", icon: ClipboardListIcon },
      // { label: "New Booking", href: "/manual-booking", icon: PlusIcon },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) =>
      setCollapsed(e.matches);
    handle(mq);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  // Auto-expand parent if a child route is active
  useEffect(() => {
    navItems.forEach((item) => {
      if (
        item.children?.some((child) => pathname.startsWith(child.href))
      ) {
        setOpenMenus((prev) => ({ ...prev, [item.label]: true }));
      }
    });
  }, [pathname]);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[420px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <span className="text-lg font-semibold">Admin Portal</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const hasChildren = !!item.children;
          const isOpen = openMenus[item.label];

          if (hasChildren) {
            const isAnyChildActive = item.children.some((child) =>
              pathname.startsWith(child.href)
            );

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isAnyChildActive &&
                      "text-sidebar-accent-foreground"
                  )}
                >
                  {!collapsed ? (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDownIcon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </>
                  ) : (
                    <ChevronDownIcon
                      className={cn(
                        "h-4 w-4 shrink-0 mx-auto transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {isOpen && !collapsed && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                    {item.children.map((child) => {
                      const isChildActive = pathname.startsWith(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isChildActive
                              ? "font-medium bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          <child.icon className="h-4 w-4 shrink-0" />
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive &&
                  "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
