import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">

      <div className="flex min-h-screen">

        <Sidebar />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  );
}