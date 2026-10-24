"use client";

import Link from "next/link";
import {Menu, Search, SquareArrowRightExitIcon, User} from "lucide-react";

interface AdminHeaderProps {
  onOpenMobile: () => void;
}
const token:null = null;

export default function AdminHeader({onOpenMobile}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-slate-950 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
          <span>Admin</span>
          <span>/</span>
          <span className="font-semibold text-slate-200">Dashboard</span>
        </div>

        <span className="text-sm font-semibold text-slate-900 sm:hidden">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          aria-label="Search"
          className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-300 hover:bg-slate-800 sm:block"
        >
          <Search size={19} />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-800">
          {token === null ? (
            <Link href="/auth" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-indigo-800">
              <SquareArrowRightExitIcon />
            </Link>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-indigo-800">
              <User />
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
