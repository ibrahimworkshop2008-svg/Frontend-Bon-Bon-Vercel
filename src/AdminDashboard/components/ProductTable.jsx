import React from "react";
import { STATUS_STYLES, stockStatus } from "./adminDashboardUtils";
import Icon from "./AdminIcons";

export default function ProductTable({ filteredProducts, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-[#EEE7DA] rounded-2xl overflow-hidden">
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[#8A897F] border-b border-[#EEE7DA]">
              <th className="font-medium px-5 py-3">Product</th>
              <th className="font-medium px-5 py-3">Category</th>
              <th className="font-medium px-5 py-3">Price</th>
              <th className="font-medium px-5 py-3">Stock</th>
              <th className="font-medium px-5 py-3">Status</th>
              <th className="font-medium px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const status = stockStatus(p.stock);
               const s = STATUS_STYLES[status];
              const thumb = p.images?.[0]?.url || p.images?.[0]?.imageUrl || null;
              return (
                <tr key={p._id} className="border-b border-[#F3EEE2] last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full shrink-0 bg-[#F1EFE8] overflow-hidden"
                        style={{ boxShadow: `0 0 0 2px ${s.ring}` }}
                      >
                        {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <span className="font-medium text-[#1A1A2E]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#6B6A66]">{p.category || "—"}</td>
                  <td className="px-5 py-3 text-[#1A1A2E]">${Number(p.price).toFixed(2)}</td>
                  <td className="px-5 py-3 text-[#1A1A2E]">{p.stock}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.pill}`}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(p)}
                        className="p-2 rounded-full text-[#1C6FEB] hover:bg-[#E6F1FB]"
                        aria-label="Edit product"
                      >
                        <Icon.edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(p)}
                        className="p-2 rounded-full text-[#D4537E] hover:bg-[#FBEAF0]"
                        aria-label="Delete product"
                      >
                        <Icon.trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-[#F3EEE2]">
        {filteredProducts.map((p) => {
          const status = stockStatus(p.stock);
          const s = STATUS_STYLES[status];
          const thumb = p.images?.[0]?.url || p.images?.[0]?.imageUrl || null;
          return (
            <div key={p._id} className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full shrink-0 bg-[#F1EFE8] overflow-hidden"
                  style={{ boxShadow: `0 0 0 2px ${s.ring}` }}
                >
                  {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[#1A1A2E] truncate">{p.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${s.pill}`}>
                      {s.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6A66] mt-1">{p.category || "—"}</p>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-[#1A1A2E]">${Number(p.price).toFixed(2)}</span>
                    <span className="text-[#6B6A66]">Stock: {p.stock}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="flex items-center gap-1 rounded-full bg-[#E6F1FB] px-3 py-2 text-sm text-[#1C6FEB]"
                    >
                      <Icon.edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="flex items-center gap-1 rounded-full bg-[#FBEAF0] px-3 py-2 text-sm text-[#D4537E]"
                    >
                      <Icon.trash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
