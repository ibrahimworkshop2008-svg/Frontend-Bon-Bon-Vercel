import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LayoutDashboard,
} from "lucide-react";

import logo from "../../assets/01_logo_bonbon.png";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // ================= NAV ITEMS =================

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Products",
      path: "/admin/productsShow",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },

     {
      name: "Products Status",
      path: "/admin/products",
      icon: ShoppingBag,
    },


  ];

  // ================= NAVIGATION =================

  const renderNavItems = () => {
    return navItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `
            group flex items-center gap-3 rounded-xl px-3 py-3
            text-sm font-medium transition-all duration-200
            ${
              isActive
                ? "bg-white text-[#1C6FEB] shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }
            `
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={19}
                strokeWidth={isActive ? 2.4 : 2}
                className="shrink-0"
              />

              <span>{item.name}</span>
            </>
          )}
        </NavLink>
      );
    });
  };

  return (
    <>
      {/* =====================================================
          MOBILE TOP BAR
      ===================================================== */}

      <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#1C6FEB] px-4 text-white shadow-md md:hidden">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Bon Bon"
            className="h-9 w-9 rounded-full object-contain"
          />

          <div className="leading-tight">
            <p
              className="text-lg font-[800] tracking-tight"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
              }}
            >
              BON BON
            </p>

            <p className="text-[9px] uppercase tracking-[0.2em] text-white/70">
              Admin
            </p>
          </div>
        </div>

        {/* MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[280px]
          flex-col bg-[#1C6FEB] px-5 py-6 text-white
          shadow-2xl transition-transform duration-300 ease-in-out
          md:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* MOBILE HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <img
              src={logo}
              alt="Bon Bon"
              className="h-10 w-10 rounded-full object-contain"
            />

            <div className="leading-tight">
              <p
                className="text-lg font-[800] tracking-tight"
                style={{
                  fontFamily: "'Baloo 2', sans-serif",
                }}
              >
                BON BON
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                Admin
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
            aria-label="Close admin menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* NAVIGATION */}

        <nav className="flex flex-col gap-1">
          {renderNavItems()}
        </nav>

        {/* FOOTER */}

        <div className="mt-auto border-t border-white/15 pt-5">

          <p className="text-xs text-white/60">
            Signed in as
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            Admin
          </p>

        </div>

      </aside>

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden min-h-screen w-60 shrink-0 flex-col bg-[#1C6FEB] px-5 py-6 text-white md:flex">

        {/* LOGO */}

        <div className="mb-10 flex items-center gap-2 px-1">

          <img
            src={logo}
            alt="Bon Bon"
            className="h-9 w-9 rounded-full object-contain"
          />

          <div className="leading-tight">

            <p
              className="text-lg font-[800] tracking-tight"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
              }}
            >
              BON BON
            </p>

            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
              Admin
            </p>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="flex flex-col gap-1">
          {renderNavItems()}
        </nav>

        {/* FOOTER */}

        <div className="mt-auto border-t border-white/15 pt-5">

          <p className="text-xs text-white/60">
            Signed in as
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            Admin
          </p>

        </div>

      </aside>
    </>
  );
}