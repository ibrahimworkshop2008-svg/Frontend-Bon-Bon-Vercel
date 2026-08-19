import React, { useEffect, useState } from "react";

import {
  getAllProducts,
  deleteProduct,
} from "../../api/productApi";

import Toast from "./Toast";
import ProductFormModal from "./ProductFormModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ProductTable from "./ProductTable";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formTarget, setFormTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  // =====================================================
  // TOAST
  // =====================================================

  const showToast = (message, type = "success") => {
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

      const productData = Array.isArray(data)
        ? data
        : data?.products || [];

      setProducts(productData);
    } catch (error) {
      console.error("Error loading products:", error);

      setLoadError(
        "Couldn't load the product list. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteProduct(deleteTarget._id);

      showToast("Product removed successfully.");

      setDeleteTarget(null);

      await loadProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      showToast(
        error?.response?.data?.message ||
          "Couldn't remove this product.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-[#FFFBF5]"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8 md:py-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold text-[#1A1A2E] sm:text-3xl"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
              }}
            >
              Products
            </h1>

            <p className="mt-1 text-sm text-[#8A897F]">
              Manage your products
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFormTarget({})}
            className="
              rounded-full
              bg-[#1C6FEB]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:opacity-90
              active:scale-95
            "
          >
            + Add Product
          </button>
        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-[#EEE7DA] bg-white">

          {/* LOADING */}

          {loading && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1C6FEB]" />

              <p className="text-sm text-[#8A897F]">
                Loading products...
              </p>
            </div>
          )}

          {/* ERROR */}

          {!loading && loadError && (
            <div className="px-6 py-16 text-center">

              <p className="mb-4 text-sm text-[#993C1D]">
                {loadError}
              </p>

              <button
                type="button"
                onClick={loadProducts}
                className="
                  rounded-full
                  bg-[#1C6FEB]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Retry
              </button>

            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !loadError &&
            products.length === 0 && (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F7FF]">
                  <span className="text-2xl">
                    📦
                  </span>
                </div>

                <h2
                  className="mt-5 text-xl font-bold text-[#1A1A2E]"
                  style={{
                    fontFamily:
                      "'Baloo 2', sans-serif",
                  }}
                >
                  No products yet
                </h2>

                <p className="mt-1 text-sm text-[#8A897F]">
                  Add your first product to start selling.
                </p>

                <button
                  type="button"
                  onClick={() => setFormTarget({})}
                  className="
                    mt-5
                    rounded-full
                    bg-[#1C6FEB]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:opacity-90
                  "
                >
                  Add Product
                </button>

              </div>
            )}

          {/* PRODUCT TABLE */}

          {!loading &&
            !loadError &&
            products.length > 0 && (
              <ProductTable
                filteredProducts={products}

                onEdit={(product) => {
                  setFormTarget(product);
                }}

                onDelete={(product) => {
                  setDeleteTarget(product);
                }}
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
          onClose={() => {
            setFormTarget(null);
          }}
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
          onCancel={() => {
            setDeleteTarget(null);
          }}
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