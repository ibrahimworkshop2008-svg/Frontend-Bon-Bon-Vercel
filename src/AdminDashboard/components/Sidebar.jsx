import React from "react";
import Icon from "./AdminIcons";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col shrink-0 bg-[#1C6FEB] text-white min-h-screen px-5 py-6">
      <div className="flex items-center gap-2 px-1 mb-8">
        <Icon.donut className="w-7 h-7" />
        <div className="leading-tight">
          <p className="font-[800] text-lg tracking-tight" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            BON BON
          </p>
          <p className="text-[11px] uppercase tracking-widest text-white/70">Admin</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 text-[15px]">
        <a href="#" className="rounded-xl bg-white/15 px-3 py-2 font-medium">
          Products
        </a>
        <a href="#" className="rounded-xl px-3 py-2 text-white/70 hover:bg-white/10">
          Orders
        </a>
        <a href="#" className="rounded-xl px-3 py-2 text-white/70 hover:bg-white/10">
          Customers
        </a>
        <a href="#" className="rounded-xl px-3 py-2 text-white/70 hover:bg-white/10">
          Settings
        </a>
      </nav>
      <div className="mt-auto pt-6 border-t border-white/15 text-xs text-white/60">
        Signed in as admin
      </div>
    </aside>
  );
}
