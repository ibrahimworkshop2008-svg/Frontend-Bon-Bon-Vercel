import React from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../ContextAuth/ProductProvider";
import { useAuth } from "../ContextAuth/AuthProvider";
import { useNavigate } from "react-router-dom";

const SideProductShow = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // Get logged-in user
  const { user } = useAuth();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // ================= CHECKOUT =================

  const handleCheckout = () => {
    // Close cart drawer
    setIsCartOpen(false);

    // Check authentication
    if (!user) {
      // User is not logged in
      navigate("/signup");
      return;
    }

    // User is logged in
    navigate("/checkout");
  };

  return (
    <>
      {/* ================================================= */}
      {/* OVERLAY */}
      {/* ================================================= */}

      <div
        className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
          isCartOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* ================================================= */}
      {/* CART DRAWER */}
      {/* ================================================= */}

      <aside
        className={`fixed right-0 top-0 z-[100] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-[#172B4D]">
              Your Cart
            </h2>

            <p className="text-sm text-gray-500">
              {cartItems.length} item
              {cartItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-blue-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================================================= */}
        {/* CART ITEMS */}
        {/* ================================================= */}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <ShoppingCart
                  size={35}
                  className="text-blue-500"
                />
              </div>

              <h3 className="text-lg font-bold text-[#172B4D]">
                Your cart is empty
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add some delicious products to your cart.
              </p>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-5 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}

                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm font-bold text-[#172B4D]">
                          {item.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="text-gray-400 transition hover:text-red-500"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-semibold text-blue-500">
                        Rs. {item.price}
                      </p>

                      {/* Quantity */}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-gray-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:text-blue-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <p className="text-sm font-bold text-[#172B4D]">
                          Rs.{" "}
                          {Number(item.price || 0) *
                            Number(item.quantity || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 bg-white p-5">
            {/* Subtotal */}

            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Subtotal
              </span>

              <span className="text-lg font-bold text-[#172B4D]">
                Rs. {total}
              </span>
            </div>

            {/* Checkout */}

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-full bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-600"
            >
              Checkout
            </button>

            {/* Clear Cart */}

            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full py-2 text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideProductShow;