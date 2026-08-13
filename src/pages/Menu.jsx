import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowRight,
  Loader2,
  PackageOpen,
  Heart,
  Plus,
} from "lucide-react";

import api from "../api/axiosInstance";
import { useCart } from "../ContextAuth/ProductProvider";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const { addToCart } = useCart();

  // ==========================================
  // GET ALL PRODUCTS
  // ==========================================

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/product/all");

        const productData = response.data?.products || [];

        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ==========================================
  // PRODUCT IMAGE
  // ==========================================

  const getProductImage = (product) => {
    return (
      product?.images?.[0]?.url ||
      product?.imageUrl ||
      product?.image ||
      "/placeholder.png"
    );
  };

  // ==========================================
  // FAVORITE
  // ==========================================

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="w-full bg-[#fbfaf7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-3">

              <p className="text-[13px] font-bold uppercase tracking-[3px] text-[#087fd3]">
                Freshly made
              </p>
            </div>

            <h2 className="font-['Bebas_Neue'] text-4xl leading-[1.05] tracking-tight text-[#17253d] sm:text-5xl lg:text-6xl">
              Something sweet
              <span className="block font-normal text-[#087fd3]">
                for every mood.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#667085] sm:text-base">
              From classic favorites to little indulgences,
              discover donuts made to brighten your day.
            </p>

          </div>

          {/* Small collection info */}

          {!loading && !error && products.length > 0 && (
            <div className="hidden shrink-0 md:block">
              <p className="text-right text-xs uppercase tracking-[2px] text-[#98a2b3]">
                Our collection
              </p>

              <p className="mt-1 text-right text-sm font-semibold text-[#17253d]">
                {products.length} delicious choices
              </p>
            </div>
          )}

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="flex min-h-[360px] items-center justify-center">
            <div className="flex flex-col items-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#dcecf7] bg-white">
                <Loader2
                  size={24}
                  className="animate-spin text-[#087fd3]"
                />
              </div>

              <p className="mt-5 text-sm text-[#667085]">
                Finding something delicious...
              </p>

            </div>
          </div>
        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div className="mx-auto max-w-lg rounded-[28px] border border-red-100 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <PackageOpen
                size={25}
                className="text-red-400"
              />
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#17253d]">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-[#667085]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-[#17253d] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#087fd3]"
            >
              Try Again
            </button>

          </div>
        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e9edf1] bg-white px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f8fc]">
                <PackageOpen
                  size={28}
                  className="text-[#087fd3]"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#17253d]">
                Nothing here yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#667085]">
                We're preparing something delicious.
                Please check back soon.
              </p>

            </div>
          )}


        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product, index) => {

                const isFavorite = favorites.includes(product._id);

                return (
                  <article
                    key={product._id}
                    className="group relative"
                  >

                    {/* ====================================
                        PRODUCT IMAGE
                    ==================================== */}

                    <div className="relative overflow-hidden rounded-[28px] bg-white">

                      {/* Product number */}

                      <span className="absolute left-4 top-4 z-10 flex h-8 min-w-8 items-center justify-center rounded-full bg-white/90 px-2 text-[10px] font-bold text-[#17253d] shadow-sm backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>


                      {/* Favorite */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(product._id)
                        }
                        aria-label={
                          isFavorite
                            ? `Remove ${product.name} from favorites`
                            : `Add ${product.name} to favorites`
                        }
                        className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${
                          isFavorite
                            ? "text-red-500"
                            : "text-[#17253d] hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>


                      <Link
                        to={`/product/${product._id}`}
                        className="relative block"
                      >

                        <div className="flex h-[285px] items-center justify-center overflow-hidden p-7 sm:h-[300px]">

                          <img
                            src={getProductImage(product)}
                            alt={product.name}
                            loading="lazy"
                            className="
                              h-full
                              w-full
                              object-contain
                              transition-all
                              duration-700
                              ease-out
                              group-hover:scale-[1.07]
                              group-hover:-rotate-1
                            "
                          />

                        </div>


                        {/* View product */}

                        <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                          <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-xs font-bold text-[#17253d] shadow-lg backdrop-blur-sm">

                            View product

                            <ArrowRight size={14} />

                          </div>

                        </div>

                      </Link>

                    </div>


                    {/* ====================================
                        PRODUCT INFO
                    ==================================== */}

                    <div className="px-1 pt-5">

                      {/* Category */}

                      <div className="mb-2 flex items-center gap-2">

                        <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#087fd3]">
                          {product.category || "Donut"}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#cbd5df]" />

                        <span className="text-[10px] uppercase tracking-[1px] text-[#98a2b3]">
                          Fresh
                        </span>

                      </div>


                      {/* Name */}

                      <Link
                        to={`/product/${product._id}`}
                        className="block"
                      >
                        <h3 className="truncate font-serif text-[22px] font-semibold leading-tight text-[#17253d] transition-colors duration-300 group-hover:text-[#087fd3]">
                          {product.name}
                        </h3>
                      </Link>


                      {/* Description */}

                      {product.description && (
                        <p className="mt-2 line-clamp-2 min-h-[40px] max-w-[290px] text-[13px] leading-5 text-[#7a8492]">
                          {product.description}
                        </p>
                      )}


                      {/* =================================
                          PRICE / CART
                      ================================= */}

                      <div className="mt-5 flex items-center justify-between border-t border-[#e8ecef] pt-4">

                        <div>

                          <span className="block text-[10px] uppercase tracking-[1.5px] text-[#98a2b3]">
                            Price
                          </span>

                          <span className="mt-1 block text-xl font-bold text-[#17253d]">
                            ${product.price}
                          </span>

                        </div>


                        {/* Add button */}

                        <button
                          type="button"
                          onClick={() =>
                            handleAddToCart(product)
                          }
                          className="
                            group/cart
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-[#17253d]
                            px-4
                            py-3
                            text-xs
                            font-bold
                            text-white
                            transition-all
                            duration-300
                            hover:bg-[#087fd3]
                            active:scale-95
                          "
                        >

                          <ShoppingCart
                            size={15}
                            className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
                          />

                          <span className="hidden sm:inline">
                            Add
                          </span>

                          <Plus
                            size={13}
                            className="opacity-70"
                          />

                        </button>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}


        {/* =================================================
            VIEW ALL
        ================================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div className="mt-16 flex flex-col items-center">

              <p className="mb-4 text-center text-xs uppercase tracking-[2px] text-[#98a2b3]">
                Can't decide? Explore them all.
              </p>

              <Link
                to="/services"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#17253d]
                  bg-transparent
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-[#17253d]
                  transition-all
                  duration-300
                  hover:bg-[#17253d]
                  hover:text-white
                "
              >

                View all products

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>
          )}

      </div>
    </section>
  );
};

export default Menu;