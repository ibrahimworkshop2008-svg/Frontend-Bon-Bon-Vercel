import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  Truck,
  ShieldCheck,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import api from "../api/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCart } from "../ContextAuth/ProductProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // =====================================================
  // GET PRODUCT
  // =====================================================

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      console.log(id)
      const response = await api.get(
  `/product/find/${id}`
);

    

      console.log("Hello", response.data.product)
      setProduct(response.data.product || response.data);
    } catch (error) {
      console.error("Product details error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchProduct();
  }
}, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F8FBFF]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-[#0879D1]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F8FBFF] px-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#172B4D]">
            Product Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Sorry, we couldn't find this product.
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0879D1] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#066DBD]"
          >
            <ArrowLeft size={17} />
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // =====================================================
  // IMAGES
  // =====================================================

  const images =
    product.images?.length > 0
      ? product.images.map((image) =>
          typeof image === "string"
            ? image
            : image.url
        )
      : [
          product.imageUrl ||
            product.image ||
            "https://via.placeholder.com/600",
        ];

  // =====================================================
  // PRICE
  // =====================================================

  const price = Number(product.price || 0);

  const totalPrice = price * quantity;

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  // =====================================================
  // QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF]">

      {/* ================================================= */}
      {/* BREADCRUMB */}
      {/* ================================================= */}

    

      {/* ================================================= */}
      {/* PRODUCT SECTION */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-14">

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ================================================= */}
          {/* LEFT - PRODUCT IMAGES */}
          {/* ================================================= */}

          <div>

            {/* Main Image */}

            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

              <div className="aspect-square w-full">

                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

              </div>

              {/* Favorite */}

              <button
                type="button"
                onClick={() =>
                  setIsFavorite(!isFavorite)
                }
                className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition ${
                  isFavorite
                    ? "text-red-500"
                    : "text-slate-500 hover:text-red-500"
                }`}
              >
                <Heart
                  size={20}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            {/* Thumbnail Images */}

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">

                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === index
                        ? "border-[#0879D1]"
                        : "border-blue-50 hover:border-blue-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* ================================================= */}
          {/* RIGHT - PRODUCT INFORMATION */}
          {/* ================================================= */}

          <div className="flex flex-col justify-center">

            {/* Category */}

            {product.category && (
              <p className="text-sm font-bold uppercase tracking-widest text-[#0879D1]">
                {product.category}
              </p>
            )}

            {/* Name */}

            <h1 className="mt-2 font-['Bebas_Neue'] text-4xl font-bold tracking-wide text-[#172B4D] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="mt-4 flex items-center gap-3">

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <span
                      key={star}
                      className="text-lg text-yellow-400"
                    >
                      ★
                    </span>
                  )
                )}

              </div>

              <span className="text-sm text-slate-500">
                5.0
              </span>

              <span className="text-slate-300">
                |
              </span>

              <span className="text-sm text-slate-500">
                Freshly made
              </span>

            </div>

            {/* Price */}

            <div className="mt-6">

              <span className="text-3xl font-extrabold text-[#0879D1]">
                Rs. {price.toLocaleString("en-PK")}
              </span>

              {product.oldPrice && (
                <span className="ml-3 text-lg text-slate-400 line-through">
                  Rs.{" "}
                  {Number(
                    product.oldPrice
                  ).toLocaleString("en-PK")}
                </span>
              )}

            </div>

            {/* Description */}

            <p className="mt-6 text-base leading-7 text-slate-500">
              {product.description ||
                "A delicious freshly prepared treat made with quality ingredients. Perfect for enjoying yourself or sharing with family and friends."}
            </p>

            {/* Divider */}

            <div className="my-7 border-t border-blue-100" />

            {/* Availability */}

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-green-500"
              />

              <span className="text-sm font-semibold text-green-600">
                In Stock
              </span>

            </div>

            {/* Quantity */}

            <div className="mt-6">

              <p className="mb-2 text-sm font-bold text-[#172B4D]">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-full border border-blue-100 bg-white">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:text-[#0879D1] disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span className="w-12 text-center text-sm font-bold text-[#172B4D]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:text-[#0879D1]"
                >
                  <Plus size={17} />
                </button>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-[#0879D1] py-3.5 text-sm font-bold text-[#0879D1] transition-all hover:bg-[#EFF8FF]"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="rounded-full bg-[#0879D1] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5 hover:bg-[#066DBD] hover:shadow-xl"
              >
                Buy Now • Rs.{" "}
                {totalPrice.toLocaleString("en-PK")}
              </button>

            </div>

            {/* Delivery Information */}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">

              <InfoBox
                icon={<Truck size={19} />}
                title="Fast Delivery"
                text="Local delivery"
              />

              <InfoBox
                icon={<Clock size={19} />}
                title="Fresh"
                text="Made to order"
              />

              <InfoBox
                icon={<ShieldCheck size={19} />}
                title="Quality"
                text="Fresh ingredients"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* PRODUCT INFORMATION */}
      {/* ================================================= */}

      <section className="border-t border-blue-50 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-widest text-[#0879D1]">
              Product Information
            </p>

            <h2 className="mt-2 font-['Bebas_Neue'] text-3xl font-bold text-[#172B4D] sm:text-4xl">
              MADE FRESH FOR YOU
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Every Bon Bon Donut is prepared with care
              using quality ingredients. Whether you're
              ordering breakfast, a snack, or something
              sweet for the whole family, we make sure
              your order is fresh and delicious.
            </p>

          </div>

          {/* Feature Cards */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Feature
              title="Fresh Ingredients"
              description="We use carefully selected ingredients for every product."
            />

            <Feature
              title="Made With Care"
              description="Every order is prepared fresh with attention to quality."
            />

            <Feature
              title="Local Delivery"
              description="Enjoy your favorite products delivered directly to you."
            />

          </div>

        </div>

      </section>

    </div>
  );
};

/* ========================================================= */
/* INFO BOX */
/* ========================================================= */

function InfoBox({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-blue-50 bg-white p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF8FF] text-[#0879D1]">
          {icon}
        </div>

        <div>
          <p className="text-xs font-bold text-[#172B4D]">
            {title}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-400">
            {text}
          </p>
        </div>

      </div>

    </div>
  );
}

/* ========================================================= */
/* FEATURE */
/* ========================================================= */

function Feature({ title, description }) {
  return (
    <div className="rounded-2xl border border-blue-50 bg-[#F8FBFF] p-5">

      <div className="flex items-start gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0879D1] text-white">
          <CheckCircle2 size={16} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#172B4D]">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ProductDetails;