import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowRight,
  Loader2,
  PackageOpen,
} from "lucide-react";

import api from "../api/axiosInstance";
import { useCart } from "../ContextAuth/ProductProvider";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  // ==========================================
  // GET ALL PRODUCTS
  // ==========================================

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/product/all"
        );

        console.log("Products API:", response.data);

        // Your backend returns:
        // { products: [...] }

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
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="w-full bg-white py-16">

      {/* ========================================
          HEADER
      ========================================= */}

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">

          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-[3px]
              text-[#087fd3]
            "
          >
            Our Menu
          </p>

          <h2
            className="
              mt-2
              text-3xl
              font-extrabold
              tracking-tight
              text-[#17253d]
              sm:text-4xl
              lg:text-5xl
            "
          >
            OUR DELICIOUS
            <span className="block text-[#087fd3]">
              DONUTS
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-[#34445b]
              sm:text-base
            "
          >
            Discover our delicious collection of freshly
            made donuts. Choose your favorite and enjoy
            every bite.
          </p>

        </div>


        {/* ========================================
            LOADING
        ========================================= */}

        {loading && (
          <div
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
            "
          >
            <div className="flex flex-col items-center">

              <Loader2
                size={40}
                className="
                  animate-spin
                  text-[#087fd3]
                "
              />

              <p className="mt-4 text-sm font-medium text-gray-500">
                Loading delicious donuts...
              </p>

            </div>
          </div>
        )}


        {/* ========================================
            ERROR
        ========================================= */}

        {!loading && error && (
          <div
            className="
              mx-auto
              max-w-lg
              rounded-2xl
              border
              border-red-100
              bg-red-50
              p-6
              text-center
            "
          >
            <p className="font-semibold text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-4
                rounded-full
                bg-red-500
                px-5
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-600
              "
            >
              Try Again
            </button>
          </div>
        )}


        {/* ========================================
            EMPTY
        ========================================= */}

        {!loading &&
          !error &&
          products.length === 0 && (

            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                bg-[#f5fbff]
                p-8
                text-center
              "
            >

              <PackageOpen
                size={50}
                className="text-[#087fd3]"
              />

              <h3
                className="
                  mt-4
                  text-xl
                  font-bold
                  text-[#17253d]
                "
              >
                No products found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                There are currently no products available.
              </p>

            </div>
          )}


        {/* ========================================
            PRODUCTS GRID
        ========================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >

              {products.map((product) => (

                <div
                  key={product._id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-blue-50
                    bg-white
                    shadow-[0_8px_30px_rgba(23,37,61,0.06)]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-[0_18px_40px_rgba(23,37,61,0.12)]
                  "
                >

                  {/* ==================================
                      PRODUCT IMAGE
                  =================================== */}

                  <Link
                    to={`/product/${product._id}`}
                    className="
                      relative
                      block
                      overflow-hidden
                      bg-[#f5fbff]
                    "
                  >

                    <div
                      className="
                        flex
                        h-[240px]
                        items-center
                        justify-center
                        p-6
                      "
                    >

                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-contain
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />

                    </div>


                    {/* View Details */}

                    <div
                      className="
                        absolute
                        bottom-4
                        left-1/2
                        -translate-x-1/2
                        translate-y-4
                        rounded-full
                        bg-white
                        px-4
                        py-2
                        text-xs
                        font-bold
                        text-[#087fd3]
                        opacity-0
                        shadow-lg
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      View Details
                    </div>

                  </Link>


                  {/* ==================================
                      PRODUCT CONTENT
                  =================================== */}

                  <div className="p-5">

                    <Link
                      to={`/product/${product._id}`}
                      className="
                        block
                        truncate
                        text-lg
                        font-extrabold
                        text-[#17253d]
                        transition-colors
                        hover:text-[#087fd3]
                      "
                    >
                      {product.name}
                    </Link>


                    {/* Description */}

                    {product.description && (
                      <p
                        className="
                          mt-2
                          line-clamp-2
                          min-h-[40px]
                          text-sm
                          leading-5
                          text-[#667085]
                        "
                      >
                        {product.description}
                      </p>
                    )}


                    {/* Price + Cart */}

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Price
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xl
                            font-extrabold
                            text-[#087fd3]
                          "
                        >
                          ${product.price}
                        </p>
                      </div>


                      {/* Add To Cart */}

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#087fd3]
                          text-white
                          shadow-md
                          shadow-blue-100
                          transition-all
                          duration-300
                          hover:scale-105
                          hover:bg-[#066db8]
                          active:scale-95
                        "
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart size={19} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}


        {/* ========================================
            VIEW ALL PRODUCTS
        ========================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div className="mt-12 text-center">

              <Link
                to="/services"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#087fd3]
                  px-7
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_5px_15px_rgba(0,100,180,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#066db8]
                "
              >
                View All Products

                <ArrowRight size={17} />

              </Link>

            </div>
          )}

      </div>
    </section>
  );
};

export default Menu;