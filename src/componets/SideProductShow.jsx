import React from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  PackageCheck,
} from "lucide-react";
import { useCart } from "../ContextAuth/ProductProvider";
import { useAuth } from "../ContextAuth/AuthProvider";
import { useNavigate } from "react-router-dom";

const SideProductShow = () => {
  const navigate = useNavigate();

  const {
    cartItems = [],
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    const numericPrice = Number(
      String(price || 0).replace(/,/g, "")
    );

    return numericPrice.toLocaleString("en-PK");
  };

  // =====================================================
  // CART TOTAL
  // =====================================================

  const total = cartItems.reduce((sum, item) => {
    const price = Number(
      String(item?.price || 0).replace(/,/g, "")
    );

    const quantity = Number(item?.quantity || 0);

    return sum + price * quantity;
  }, 0);

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems = cartItems.reduce(
    (sum, item) =>
      sum + Number(item?.quantity || 0),
    0
  );

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const getProductImage = (item) => {
    return (
      item?.image ||
      item?.imageUrl ||
      item?.images?.[0]?.url ||
      "/placeholder.png"
    );
  };

  // =====================================================
  // GET PRODUCT ID
  // =====================================================

  const getProductId = (item) => {
    return item?.id || item?._id || item?.productId;
  };

  // =====================================================
  // CHECKOUT
  // =====================================================

  const handleCheckout = () => {
    setIsCartOpen(false);

    if (!user) {
      navigate("/signup");
      return;
    }

    navigate("/checkout");
  };

  // =====================================================
  // CLOSE CART
  // =====================================================

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`
          fixed
          inset-0
          z-[90]
          bg-[#17253d]/45
          backdrop-blur-[2px]
          transition-opacity
          duration-500
          ${
            isCartOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      <aside
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
        className={`
          fixed
          right-0
          top-0
          z-[100]
          flex
          h-[100dvh]
          w-full
          flex-col
          bg-[#fbfaf7]
          shadow-[-15px_0_50px_rgba(23,37,61,0.14)]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          sm:max-w-[460px]
          ${
            isCartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="shrink-0 border-b border-[#e5e8eb] bg-[#fbfaf7]">
          <div className="flex items-center justify-between px-5 py-5 sm:px-7">

            <div>
              <div className="flex items-center gap-3">

                <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#17253d]">
                  Your Bag
                </h2>

                {totalItems > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#087fd3] px-2 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}

              </div>

              <p className="mt-1 text-xs text-[#7b8490]">
                Your favorites, ready to go.
              </p>
            </div>

            {/* Close */}

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close shopping cart"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#dfe4e8]
                bg-white
                text-[#17253d]
                transition-all
                duration-300
                hover:border-[#087fd3]
                hover:bg-[#087fd3]
                hover:text-white
              "
            >
              <X size={18} />
            </button>

          </div>

          {/* Delivery message */}

          {cartItems.length > 0 && (
            <div className="border-t border-[#e5e8eb] bg-white px-5 py-3 sm:px-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#34445b]">

                <Truck
                  size={15}
                  className="shrink-0 text-[#087fd3]"
                />

                <span>
                  Freshly packed and ready for delivery.
                </span>

              </div>
            </div>
          )}
        </header>

        {/* =====================================================
            CART CONTENT
        ===================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto">

          {/* ===================================================
              EMPTY CART
          =================================================== */}

          {cartItems.length === 0 ? (
            <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">

              <div className="relative">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eaf6fc]">
                  <ShoppingCart
                    size={34}
                    strokeWidth={1.5}
                    className="text-[#087fd3]"
                  />
                </div>

                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                  <Plus
                    size={13}
                    className="text-[#087fd3]"
                  />
                </span>

              </div>

              <h3 className="mt-7 font-serif text-2xl font-semibold text-[#17253d]">
                Your bag is waiting.
              </h3>

              <p className="mt-2 max-w-[280px] text-sm leading-6 text-[#7b8490]">
                Looks like you haven't added anything
                yet. Let's find something delicious.
              </p>

              <button
                type="button"
                onClick={closeCart}
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#17253d]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#087fd3]
                "
              >
                Continue Shopping

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </div>
          ) : (

            /* =================================================
               CART ITEMS
            ================================================= */

            <div className="px-5 py-5 sm:px-7">

              <div className="mb-5 flex items-center justify-between">

                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#087fd3]">
                  Your Selection
                </p>

                <button
                  type="button"
                  onClick={clearCart}
                  className="
                    text-[11px]
                    font-medium
                    text-[#8b929b]
                    transition-colors
                    hover:text-red-500
                  "
                >
                  Clear all
                </button>

              </div>

              <div className="space-y-5">

                {cartItems.map((item, index) => {

                  const itemId = getProductId(item);

                  const price = Number(
                    String(item?.price || 0).replace(/,/g, "")
                  );

                  const quantity = Number(
                    item?.quantity || 1
                  );

                  const itemTotal =
                    price * quantity;

                  return (
                    <article
                      key={itemId || index}
                      className="
                        group
                        border-b
                        border-[#e5e8eb]
                        pb-5
                      "
                    >

                      <div className="flex gap-4">

                        {/* =====================================
                            PRODUCT IMAGE
                        ===================================== */}

                        <div className="
                          relative
                          h-[92px]
                          w-[92px]
                          shrink-0
                          overflow-hidden
                          bg-[#eef5f8]
                          sm:h-[100px]
                          sm:w-[100px]
                        ">
                          <img
                            src={getProductImage(item)}
                            alt={item?.name || "Product"}
                            loading="lazy"
                            className="
                              h-full
                              w-full
                              object-contain
                              p-2
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />
                        </div>

                        {/* =====================================
                            PRODUCT DETAILS
                        ===================================== */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                              <p className="mb-1 text-[9px] font-bold uppercase tracking-[1.5px] text-[#087fd3]">
                                Fresh Pick
                              </p>

                              <h3 className="truncate text-[15px] font-bold text-[#17253d]">
                                {item?.name || "Product"}
                              </h3>

                            </div>

                            {/* Remove */}

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(itemId)
                              }
                              aria-label={`Remove ${
                                item?.name || "product"
                              }`}
                              className="
                                shrink-0
                                text-[#a0a7af]
                                transition-colors
                                hover:text-red-500
                              "
                            >
                              <Trash2 size={15} />
                            </button>

                          </div>

                          {/* Unit price */}

                          <p className="mt-1 text-sm font-semibold text-[#17253d]">
                            Rs. {formatPrice(price)}
                          </p>

                          {/* Quantity + Item total */}

                          <div className="mt-4 flex items-center justify-between">

                            {/* Quantity */}

                            <div className="
                              flex
                              h-8
                              items-center
                              border
                              border-[#dce1e5]
                              bg-white
                            ">

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    itemId,
                                    Math.max(
                                      1,
                                      quantity - 1
                                    )
                                  )
                                }
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                                className="
                                  flex
                                  h-full
                                  w-8
                                  items-center
                                  justify-center
                                  text-[#667085]
                                  transition-colors
                                  hover:text-[#087fd3]
                                  disabled:cursor-not-allowed
                                  disabled:opacity-30
                                "
                              >
                                <Minus size={12} />
                              </button>

                              <span className="
                                flex
                                h-full
                                w-8
                                items-center
                                justify-center
                                border-x
                                border-[#dce1e5]
                                text-xs
                                font-bold
                                text-[#17253d]
                              ">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    itemId,
                                    quantity + 1
                                  )
                                }
                                aria-label="Increase quantity"
                                className="
                                  flex
                                  h-full
                                  w-8
                                  items-center
                                  justify-center
                                  text-[#667085]
                                  transition-colors
                                  hover:text-[#087fd3]
                                "
                              >
                                <Plus size={12} />
                              </button>

                            </div>

                            {/* Item total */}

                            <p className="text-sm font-bold text-[#17253d]">
                              Rs. {formatPrice(itemTotal)}
                            </p>

                          </div>

                        </div>
                      </div>
                    </article>
                  );
                })}

              </div>

              {/* =================================================
                  BENEFITS
              ================================================= */}

              <div className="mt-7 grid grid-cols-2 gap-2">

                <div className="flex items-center gap-2 bg-white px-3 py-3">

                  <PackageCheck
                    size={15}
                    className="shrink-0 text-[#087fd3]"
                  />

                  <span className="text-[10px] font-medium leading-4 text-[#667085]">
                    Carefully packed
                  </span>

                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-3">

                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-[#087fd3]"
                  />

                  <span className="text-[10px] font-medium leading-4 text-[#667085]">
                    Secure checkout
                  </span>

                </div>

              </div>

            </div>
          )}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        {cartItems.length > 0 && (
          <footer className="
            shrink-0
            border-t
            border-[#e1e5e8]
            bg-white
            px-5
            pb-5
            pt-5
            sm:px-7
          ">

            {/* Subtotal */}

            <div className="space-y-2">

              <div className="flex items-center justify-between text-sm">

                <span className="text-[#7b8490]">
                  Subtotal
                </span>

                <span className="font-semibold text-[#17253d]">
                  Rs. {formatPrice(total)}
                </span>

              </div>

              <div className="flex items-center justify-between text-sm">

                <span className="text-[#7b8490]">
                  Delivery
                </span>

                <span className="font-medium text-[#087fd3]">
                  Calculated at checkout
                </span>

              </div>

            </div>

            {/* Total */}

            <div className="
              my-4
              flex
              items-end
              justify-between
              border-t
              border-[#e5e8eb]
              pt-4
            ">

              <div>

                <p className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[1.5px]
                  text-[#98a2b3]
                ">
                  Total
                </p>

                <p className="
                  mt-1
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-[#17253d]
                ">
                  Rs. {formatPrice(total)}
                </p>

              </div>

            </div>

            {/* Checkout */}

            <button
              type="button"
              onClick={handleCheckout}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-3
                bg-[#087fd3]
                py-4
                text-sm
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(8,127,211,0.18)]
                transition-all
                duration-300
                hover:bg-[#066db8]
                hover:shadow-[0_10px_25px_rgba(8,127,211,0.25)]
                active:scale-[0.99]
              "
            >

              <span>
                {user
                  ? "Proceed to Checkout"
                  : "Continue to Checkout"}
              </span>

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>

            {/* Continue Shopping */}

            <button
              type="button"
              onClick={closeCart}
              className="
                mt-3
                w-full
                py-2
                text-xs
                font-semibold
                text-[#667085]
                transition-colors
                hover:text-[#087fd3]
              "
            >
              Continue Shopping
            </button>

          </footer>
        )}
      </aside>
    </>
  );
};

export default SideProductShow;