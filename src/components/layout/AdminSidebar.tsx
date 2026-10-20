"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Store,
  X,
  PanelLeftClose,
} from "lucide-react";

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

const navigation = [
  {label: "Dashboard", href: "/", icon: LayoutDashboard},
  {label: "Products", href: "/products", icon: Package},
  {label: "Users", href: "/users", icon: Users},
  {label: "Carts", href: "/carts", icon: ShoppingCart},
  {label: "Settings", href: "/settings", icon: Settings},
];

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Menyuni yopish"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col
          border-r border-slate-800 bg-slate-950 text-slate-300
          transition-all duration-300
          ${collapsed ? "w-19" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Store size={21} />
            </span>

            {!collapsed && (
              <span className="truncate text-lg font-bold text-white">
                ShopAdmin
              </span>
            )}
          </Link>

          <button
            onClick={onCloseMobile}
            aria-label="Menyuni yopish"
            className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {!collapsed && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Main menu
            </p>
          )}

          {navigation.map(({label, href, icon: Icon}) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                  ${collapsed ? "justify-center" : ""}`}
              >
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-slate-800 p-3">
          <button
            onClick={onToggleCollapse}
            className="hidden w-full items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white lg:flex"
          >
            <PanelLeftClose
              size={20}
              className={collapsed ? "rotate-180" : ""}
            />
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
