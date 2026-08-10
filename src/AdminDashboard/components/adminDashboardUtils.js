export const STATUS = {
  IN_STOCK: "in_stock",
  LOW: "low",
  OUT: "out",
};

export function stockStatus(stock) {
  if (stock <= 0) return STATUS.OUT;
  if (stock <= 5) return STATUS.LOW;
  return STATUS.IN_STOCK;
}

export const STATUS_STYLES = {
  [STATUS.IN_STOCK]: { label: "In stock", ring: "#1C6FEB", pill: "bg-[#E6F1FB] text-[#0D47A8]" },
  [STATUS.LOW]: { label: "Low stock", ring: "#D4537E", pill: "bg-[#FBEAF0] text-[#8A2C4F]" },
  [STATUS.OUT]: { label: "Out of stock", ring: "#B4B2A9", pill: "bg-[#F1EFE8] text-[#5F5E5A]" },
};
