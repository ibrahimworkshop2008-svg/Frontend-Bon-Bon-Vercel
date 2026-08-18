import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllProducts,
  deleteProduct,
} from "../../api/productApi";

import StatRing from "./StatRing";
import Toast from "./Toast";
import ProductFormModal from "./ProductFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ProductTable from "./ProductTable";
import ProductToolbar from "./ProductToolbar";

import {
  STATUS,
  stockStatus,
} from "./adminDashboardUtils";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [formTarget, setFormTarget] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const [toast, setToast] =
    useState(null);

  // =====================================================
  // TOAST
  // =====================================================

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    window.clearTimeout(showToast._t);

    showToast._t = window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // =====================================================
  // GET ALL PRODUCTS
  // =====================================================

  const loadProducts = async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const data = await getAllProducts();

      setProducts(
        Array.isArray(data)
          ? data
          : data?.products || []
      );
    } catch (error) {
      console.error(
        "Error loading products:",
        error
      );

      setLoadError(
        "Couldn't load the product list. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all" ||
        stockStatus(product.stock) ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    statusFilter,
  ]);

  // =====================================================
  // PRODUCT COUNTS
  // =====================================================

  const counts = useMemo(() => {
    const total = products.length;

    const inStock =
      products.filter(
        (product) =>
          stockStatus(product.stock) ===
          STATUS.IN_STOCK
      ).length;

    const out =
      products.filter(
        (product) =>
          stockStatus(product.stock) ===
          STATUS.OUT
      ).length;

    return {
      total,
      inStock,
      out,
    };
  }, [products]);

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteProduct(
        deleteTarget._id
      );

      showToast(
        "Product removed successfully."
      );

      setDeleteTarget(null);

      await loadProducts();

    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      showToast(
        error?.response?.data?.message ||
          "Couldn't remove this product.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-[#FFFBF5]"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >

      <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 md:px-10 md:py-8">

        {/* =================================================
            HEADER / TOOLBAR
        ================================================= */}

        <ProductToolbar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onNewProduct={() =>
            setFormTarget({})
          }
        />

        {/* =================================================
            PRODUCT STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <StatRing
            label="Total products"
            value={counts.total}
            pct={100}
            color="#1C6FEB"
          />

          <StatRing
            label="In stock"
            value={counts.inStock}
            pct={
              counts.total
                ? (counts.inStock /
                    counts.total) *
                  100
                : 0
            }
            color="#1C6FEB"
          />

          <StatRing
            label="Out of stock"
            value={counts.out}
            pct={
              counts.total
                ? (counts.out /
                    counts.total) *
                  100
                : 0
            }
            color="#D4537E"
          />

        </div>

        {/* =================================================
            PRODUCT TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-[#EEE7DA] bg-white">

          {/* LOADING */}

          {loading && (
            <div className="px-6 py-14 text-center">

              <p className="text-sm text-[#8A897F]">
                Loading products...
              </p>

            </div>
          )}

          {/* ERROR */}

          {!loading && loadError && (
            <div className="px-6 py-14 text-center">

              <p className="mb-3 text-sm text-[#993C1D]">
                {loadError}
              </p>

              <button
                onClick={loadProducts}
                className="rounded-full bg-[#1C6FEB] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Retry
              </button>

            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !loadError &&
            filtered.length === 0 && (
              <div className="px-6 py-14 text-center">

                <p
                  className="text-base font-[700] text-[#1A1A2E]"
                  style={{
                    fontFamily:
                      "'Baloo 2', sans-serif",
                  }}
                >
                  {products.length === 0
                    ? "No products yet"
                    : "No matches"}
                </p>

                <p className="mb-4 mt-1 text-sm text-[#8A897F]">
                  {products.length === 0
                    ? "Add your first batch to start selling."
                    : "Try a different search or filter."}
                </p>

                {products.length ===
                  0 && (
                  <button
                    onClick={() =>
                      setFormTarget({})
                    }
                    className="rounded-full bg-[#1C6FEB] px-4 py-2 text-sm font-[700] text-white transition hover:opacity-90"
                  >
                    Add product
                  </button>
                )}

              </div>
            )}

          {/* PRODUCTS */}

          {!loading &&
            !loadError &&
            filtered.length > 0 && (
              <ProductTable
                filteredProducts={
                  filtered
                }
                onEdit={(product) =>
                  setFormTarget(
                    product
                  )
                }
                onDelete={(product) =>
                  setDeleteTarget(
                    product
                  )
                }
              />
            )}

        </div>

      </main>

      {/* ===================================================
          ADD / EDIT PRODUCT MODAL
      =================================================== */}

      {formTarget !== null && (
        <ProductFormModal
          initial={
            formTarget._id
              ? formTarget
              : null
          }
          onClose={() =>
            setFormTarget(null)
          }
          onSaved={() => {
            setFormTarget(null);
            loadProducts();
          }}
          showToast={showToast}
        />
      )}

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {deleteTarget && (
        <ConfirmDeleteModal
          product={deleteTarget}
          deleting={deleting}
          onCancel={() =>
            setDeleteTarget(null)
          }
          onConfirm={handleDelete}
        />
      )}

      {/* ===================================================
          TOAST
      =================================================== */}

      <Toast toast={toast} />

    </div>
  );
}