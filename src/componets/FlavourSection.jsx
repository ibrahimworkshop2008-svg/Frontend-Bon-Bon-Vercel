import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useCart } from "../ContextAuth/ProductProvider";

import api from "../api/axiosInstance";

const FlavorSection = () => {
  // ========================================
  // CART CONTEXT
  // ========================================

  const {
    addToCart,
    setIsCartOpen,
  } = useCart();

  // ========================================
  // STATES
  // ========================================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // SCROLL REF
  // ========================================

  const scrollRef = useRef(null);

  // ========================================
  // FETCH PRODUCTS
  // ========================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // Axios instance use karo
        const res = await api.get("/product/all");

        console.log(
          "Products API Response:",
          res.data
        );

        const productData =
          res.data.products ||
          res.data.data ||
          res.data;

        setProducts(
          Array.isArray(productData)
            ? productData
            : []
        );
      } catch (err) {
        console.error(
          "Error fetching products:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load donuts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ========================================
  // SCROLL PRODUCTS
  // ========================================

  const scrollProducts = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    const scrollAmount =
      container.clientWidth;

    container.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  // ========================================
  // ADD TO CART
  // ========================================

  const handleAddToCart = (product) => {
    addToCart(product);

    setIsCartOpen(true);

    console.log(
      "Added to cart:",
      product
    );
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <p
          className="
            font-['Bebas_Neue']
            text-xl
            text-[#10284B]
          "
        >
          Loading flavors...
        </p>
      </section>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <p
          className="
            rounded-lg
            bg-red-50
            px-5
            py-3
            text-sm
            text-red-500
          "
        >
          {error}
        </p>
      </section>
    );
  }

  // ========================================
  // MAIN UI
  // ========================================

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-8
        sm:py-16
        lg:py-10
      "
    >
      {/* ======================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* ======================================
            HEADING
        ====================================== */}

        <div
          className="
            mb-8
            text-center
            sm:mb-10
          "
        >
          <h2
            className="
              font-['Bebas_Neue']
              text-4xl
              font-bold
              uppercase
              leading-none
              tracking-tighter
              text-[#10284B]
              sm:text-5xl
              md:text-6xl
            "
          >
            CHOOSE{" "}

            <span className="text-[#0878D1]">
              YOUR FLAVOR
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-xs
              font-medium
              leading-relaxed
              text-[#10284B]
              sm:text-sm
            "
          >
            12 amazing flavors made with natural
            ingredients
            <br />
            and premium quality.
          </p>
        </div>

        {/* ======================================
            PRODUCT CAROUSEL
        ====================================== */}

        <div className="relative">

          {/* ====================================
              LEFT ARROW
          ==================================== */}

          <button
            type="button"
            onClick={() =>
              scrollProducts("left")
            }
            aria-label="Previous products"
            className="
              absolute
              left-0
              top-1/2
              z-20
              hidden
              h-10
              w-10
              -translate-x-2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#10284B]
              shadow-md
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#0878D1]
              hover:text-white
              md:flex
            "
          >
            <ChevronLeft size={22} />
          </button>

          {/* ====================================
              SCROLL CONTAINER
          ==================================== */}

          <div
            ref={scrollRef}
            className="
              flex
              snap-mandatory
              gap-5
              overflow-x-auto
              scroll-smooth
              px-1
              pb-5
              sm:gap-6
              scrollbar-hide
            "
          >
            {products.map((product) => (
              <div
                key={
                  product._id ||
                  product.id
                }
                className="
                  group
                  flex
                  min-w-full
                  snap-start
                  flex-col
                  items-center
                  text-center
                  sm:min-w-[calc(50%-12px)]
                  lg:min-w-[calc(25%-18px)]
                "
              >
                {/* =================================
                    PRODUCT IMAGE
                ================================= */}

                <div
                  className="
                    flex
                    h-40
                    w-full
                    items-center
                    justify-center
                    sm:h-44
                    lg:h-48
                  "
                >
                  <img
                    src={
                      product.images?.[0]?.url ||
                      product.imageUrl ||
                      product.image ||
                      ""
                    }
                    alt={
                      product.name ||
                      "Donut"
                    }
                    className="
                      h-36
                      w-36
                      object-contain
                      transition
                      duration-300
                      group-hover:scale-110
                      sm:h-40
                      sm:w-40
                      lg:h-44
                      lg:w-44
                    "
                  />
                </div>

                {/* =================================
                    PRODUCT NAME
                ================================= */}

                <h3
                  className="
                    mt-2
                    font-['Bebas_Neue']
                    text-lg
                    font-bold
                    tracking-wide
                    text-[#10284B]
                    sm:text-xl
                  "
                >
                  {product.name}
                </h3>

                {/* =================================
                    PRICE
                ================================= */}

                <p
                  className="
                    mt-1
                    font-['Bebas_Neue']
                    text-lg
                    font-bold
                    text-[#10284B]
                  "
                >
                  ${product.price}
                </p>

                {/* =================================
                    ADD TO CART
                ================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(
                      product
                    )
                  }
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border-2
                    border-[#B9E2FA]
                    bg-white
                    px-5
                    py-2
                    text-xs
                    font-semibold
                    text-[#10284B]
                    transition-all
                    duration-300
                    hover:border-[#0878D1]
                    hover:bg-[#0878D1]
                    hover:text-white
                  "
                >
                  <ShoppingCart
                    size={16}
                    strokeWidth={2}
                  />

                  Add to cart
                </button>

                {/* =================================
                    VIEW DETAILS
                ================================= */}

                <Link
                  to={`/product/${product._id}`}
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    text-[#10284B]
                    transition
                    hover:text-[#0878D1]
                  "
                >
                  <Eye size={16} />

                  View details
                </Link>
              </div>
            ))}
          </div>

          {/* ====================================
              RIGHT ARROW
          ==================================== */}

          <button
            type="button"
            onClick={() =>
              scrollProducts("right")
            }
            aria-label="Next products"
            className="
              absolute
              right-0
              top-1/2
              z-20
              hidden
              h-10
              w-10
              translate-x-2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#10284B]
              shadow-md
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#0878D1]
              hover:text-white
              md:flex
            "
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default FlavorSection;