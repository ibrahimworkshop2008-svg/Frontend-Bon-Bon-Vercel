import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShoppingBag,
  Truck,
} from "lucide-react";

import logo from "../assets/01_logo_bonbon.png";

const formatPKR = (n) =>
  `Rs ${Number(n || 0).toLocaleString("en-PK", {
    maximumFractionDigits: 0,
  })}`;

export default function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  // If user directly opens /order-success
  // without placing an order first
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const orderItems = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#172B4D]">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="border-b border-blue-50 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-3 text-xs font-medium text-slate-500">
          <CheckCircle2
            size={15}
            className="text-green-500"
          />

          <span>
            Your order has been placed successfully
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

        {/* =================================================
            SUCCESS HEADER
        ================================================= */}

        <div className="text-center">

          {/* Logo */}

          <Link
            to="/"
            className="mb-6 inline-flex transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Bon Bon Donuts"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Success Icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                size={34}
                strokeWidth={2.5}
                className="text-green-500"
              />
            </div>
          </div>

          <h1 className="mt-6 font-['Bebas_Neue'] text-4xl font-bold tracking-wide text-[#172B4D] sm:text-5xl">
            ORDER CONFIRMED!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Thank you for your order. We're preparing your
            delicious donuts and will have them delivered to
            you soon.
          </p>

          {/* Order ID */}

          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2.5 shadow-sm">
            <Package
              size={16}
              className="text-[#0879D1]"
            />

            <span className="text-xs text-slate-400">
              Order ID
            </span>

            <span className="text-sm font-bold text-[#172B4D]">
              #{order._id?.slice(-8).toUpperCase()}
            </span>
          </div>

        </div>

        {/* =================================================
            ORDER CONTENT
        ================================================= */}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* DELIVERY STATUS */}

            <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

              <div className="border-b border-blue-50 bg-[#EFF8FF] px-5 py-5 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0879D1] shadow-sm">
                    <Truck size={21} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-[#172B4D]">
                      Delivery Information
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Your order will be delivered soon
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                {/* ADDRESS */}

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0879D1]">
                    <MapPin size={18} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Delivery Address
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#172B4D]">
                      {order.delivery?.firstName}{" "}
                      {order.delivery?.lastName}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {order.delivery?.address}
                      {order.delivery?.apartment &&
                        `, ${order.delivery.apartment}`}
                      <br />
                      {order.delivery?.city}
                      {order.delivery?.postalCode &&
                        `, ${order.delivery.postalCode}`}
                    </p>

                  </div>

                </div>

                {/* PHONE */}

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0879D1]">
                    <Phone size={18} />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#172B4D]">
                      {order.delivery?.phone}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      We'll contact you about delivery.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ORDER ITEMS */}

            <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-blue-50 px-5 py-5 sm:px-6">

                <div>
                  <h2 className="text-base font-bold text-[#172B4D]">
                    Your Items
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {orderItems.length} product
                    {orderItems.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#0879D1]">
                  <ShoppingBag size={19} />
                </div>

              </div>

              <div className="divide-y divide-blue-50">

                {orderItems.map((item, index) => (

                  <div
                    key={item.productId || index}
                    className="flex items-center gap-4 p-5"
                  >

                    {/* IMAGE */}

                    <div className="relative h-16 w-16 shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full rounded-xl border border-blue-50 object-cover"
                      />

                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0879D1] px-1 text-[10px] font-bold text-white ring-2 ring-white">
                        {item.quantity}
                      </span>

                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-bold text-[#172B4D]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatPKR(item.price)} ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                    {/* PRICE */}

                    <p className="shrink-0 text-sm font-bold text-[#172B4D]">
                      {formatPKR(
                        Number(item.price) *
                          Number(item.quantity)
                      )}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* CONTACT */}

            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#0879D1]">
                  <Mail size={18} />
                </div>

                <div>

                  <p className="text-sm font-bold text-[#172B4D]">
                    Order confirmation
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Confirmation details have been prepared
                    for:
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#0879D1]">
                    {order.contact?.email}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT — SUMMARY
          ================================================= */}

          <div>

            <div className="sticky top-6 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

              {/* HEADER */}

              <div className="bg-[#EFF8FF] px-5 py-5">

                <h2 className="text-lg font-bold text-[#172B4D]">
                  Order Summary
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Thank you for shopping with Bon Bon Donuts
                </p>

              </div>

              {/* TOTALS */}

              <div className="space-y-4 p-5">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#172B4D]">
                    {formatPKR(order.totalAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="font-bold text-green-600">
                    {order.shipping === 0
                      ? "FREE"
                      : formatPKR(order.shipping)}
                  </span>
                </div>

                <div className="border-t border-blue-50" />

                <div className="flex items-end justify-between">

                  <span className="text-base font-bold text-[#172B4D]">
                    Total
                  </span>

                  <div className="text-right">

                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                      PKR
                    </p>

                    <p className="text-2xl font-extrabold text-[#0879D1]">
                      {formatPKR(order.total)}
                    </p>

                  </div>

                </div>

                {/* PAYMENT */}

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#172B4D]">
                    {order.payment?.method === "cod"
                      ? "Cash on Delivery"
                      : "Credit / Debit Card"}
                  </p>

                </div>

                {/* STATUS */}

                <div className="rounded-2xl bg-green-50 p-4">

                  <div className="flex items-center gap-2">

                    <CheckCircle2
                      size={17}
                      className="text-green-600"
                    />

                    <span className="text-sm font-bold text-green-700">
                      Order Confirmed
                    </span>

                  </div>

                  <p className="mt-1 text-xs leading-5 text-green-600">
                    Your order is being prepared and will be
                    delivered to you soon.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            to="/menu"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0879D1] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066DB8] hover:shadow-xl sm:w-auto"
          >
            <ShoppingBag size={18} />

            Continue Shopping

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/"
            className="flex w-full items-center justify-center rounded-2xl border border-blue-100 bg-white px-6 py-3.5 text-sm font-bold text-[#172B4D] transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 sm:w-auto"
          >
            Back to Home
          </Link>

        </div>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-blue-50 bg-white py-6">

        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Bon Bon Donuts. All
            rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Fresh & delicious, every day 🍩
          </p>

        </div>

      </footer>

    </div>
  );
}