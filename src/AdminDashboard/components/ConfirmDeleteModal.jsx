import React from "react";

export default function ConfirmDeleteModal({ product, onCancel, onConfirm, deleting }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#1A1A2E]/40 px-3 sm:px-4">
      <div className="w-full max-w-sm bg-[#FFFBF5] rounded-3xl shadow-xl px-4 py-5 sm:px-6 sm:py-6">
        <h3 className="text-lg font-[700] text-[#1A1A2E]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Remove {product.name}?
        </h3>
        <p className="text-sm text-[#6B6A66] mt-2">
          This takes it off the shelf for every customer. You can always add it back later.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1A2E] hover:bg-[#EEE7DA]"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-full text-sm font-[700] text-white bg-[#D4537E] hover:bg-[#993556] disabled:opacity-60"
          >
            {deleting ? "Removing..." : "Remove product"}
          </button>
        </div>
      </div>
    </div>
  );
}
