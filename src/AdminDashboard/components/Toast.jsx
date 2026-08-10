import React from "react";

export default function Toast({ toast }) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 shadow-lg text-sm font-medium text-white ${
        isError ? "bg-[#993C1D]" : "bg-[#0D47A8]"
      }`}
    >
      {toast.message}
    </div>
  );
}
