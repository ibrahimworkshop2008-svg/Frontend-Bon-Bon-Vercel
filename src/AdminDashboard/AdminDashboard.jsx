import React, { useEffect, useMemo, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/productApi";
import Sidebar from "./components/Sidebar";
import StatRing from "./components/StatRing";
import Toast from "./components/Toast";
import ProductFormModal from "./components/ProductFormModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import ProductTable from "./components/ProductTable";
import ProductToolbar from "./components/ProductToolbar";
import { STATUS, stockStatus } from "./components/adminDashboardUtils";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formTarget, setFormTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3000);
  };

  const loadProducts = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      setLoadError("Couldn't load the product list. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || stockStatus(p.stock) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const counts = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => stockStatus(p.stock) === STATUS.IN_STOCK).length;
    const out = products.filter((p) => stockStatus(p.stock) === STATUS.OUT).length;
    return { total, inStock, out };
  }, [products]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      showToast("Product removed.");
      setDeleteTarget(null);
      loadProducts();
    } catch (err) {
      showToast(err?.response?.data?.message || "Couldn't remove this product.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFBF5] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar />

      <main className="flex-1 w-full px-4 py-4 sm:px-6 md:px-10 md:py-8 max-w-6xl mx-auto">
        <ProductToolbar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onNewProduct={() => setFormTarget({})}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatRing label="Total products" value={counts.total} pct={100} color="#1C6FEB" />
          <StatRing
            label="In stock"
            value={counts.inStock}
            pct={counts.total ? (counts.inStock / counts.total) * 100 : 0}
            color="#1C6FEB"
          />
          <StatRing
            label="Out of stock"
            value={counts.out}
            pct={counts.total ? (counts.out / counts.total) * 100 : 0}
            color="#D4537E"
          />
        </div>

        <div className="bg-white border border-[#EEE7DA] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="px-6 py-14 text-center text-[#8A897F] text-sm">Loading your batch...</div>
          ) : loadError ? (
            <div className="px-6 py-14 text-center">
              <p className="text-sm text-[#993C1D] mb-3">{loadError}</p>
              <button
                onClick={loadProducts}
                className="px-4 py-2 rounded-full text-sm font-medium text-white bg-[#1C6FEB]"
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-base font-[700] text-[#1A1A2E]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                {products.length === 0 ? "No products yet" : "No matches"}
              </p>
              <p className="text-sm text-[#8A897F] mt-1 mb-4">
                {products.length === 0
                  ? "Add your first batch to start selling."
                  : "Try a different search or filter."}
              </p>
              {products.length === 0 && (
                <button
                  onClick={() => setFormTarget({})}
                  className="px-4 py-2 rounded-full text-sm font-[700] text-white bg-[#1C6FEB]"
                >
                  Add product
                </button>
              )}
            </div>
          ) : (
            <ProductTable filteredProducts={filtered} onEdit={(product) => setFormTarget(product)} onDelete={(product) => setDeleteTarget(product)} />
          )}
        </div>
      </main>

      {formTarget !== null && (
        <ProductFormModal
          initial={formTarget._id ? formTarget : null}
          onClose={() => setFormTarget(null)}
          onSaved={() => {
            setFormTarget(null);
            loadProducts();
          }}
          showToast={showToast}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          product={deleteTarget}
          deleting={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
