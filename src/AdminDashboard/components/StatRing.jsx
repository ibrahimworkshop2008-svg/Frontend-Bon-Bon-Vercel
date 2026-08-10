import React from "react";

export default function StatRing({ label, value, pct, color }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-[#EEE7DA] rounded-2xl px-5 py-4">
      <div
        className="relative w-14 h-14 rounded-full shrink-0"
        style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, #EDEDE6 0deg)` }}
      >
        <div className="absolute inset-[5px] bg-white rounded-full" />
      </div>
      <div>
        <p className="text-2xl font-[700] text-[#1A1A2E] leading-none" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          {value}
        </p>
        <p className="text-sm text-[#6B6A66] mt-1">{label}</p>
      </div>
    </div>
  );
}
