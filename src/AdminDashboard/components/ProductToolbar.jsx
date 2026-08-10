import React from "react";
import Icon from "./AdminIcons";

export default function ProductToolbar({ search, setSearch, statusFilter, setStatusFilter, onNewProduct }) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-[800] text-[#1A1A2E]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            Products
          </h1>
          <div className="h-1 w-20 sm:w-24 bg-[#DCE8FB] rounded-full mt-1" />
        </div>
        <button
          onClick={onNewProduct}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-[700] text-white bg-[#1C6FEB] hover:bg-[#0D47A8] w-full sm:w-auto"
        >
          <Icon.plus className="w-4 h-4" />
          New product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Icon.search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A897F]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full rounded-full border border-[#DCD5C6] bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-[#DCD5C6] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
        >
          <option value="all">All statuses</option>
          <option value="in_stock">In stock</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>
    </>
  );
}
