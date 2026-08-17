import React, { useMemo, useState } from "react";
import {
  Lock,
  ChevronDown,
  Truck,
  CreditCard,
  Tag,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../ContextAuth/ProductProvider";
import { useAuth } from "../ContextAuth/AuthProvider";

const PAKISTAN_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];



const formatPKR = (n) =>
  `Rs ${Number(n || 0).toLocaleString("en-PK", {
    maximumFractionDigits: 0,
  })}`;

import api from "../api/axiosInstance";
  
import { useNavigate } from "react-router-dom";
   import { Link } from "react-router-dom";
import logo from "../assets/01_logo_bonbon.png";

export default function CheckoutPage() {
  const { cartItems,  clearCart } = useCart();
  const { user } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [newsOptIn, setNewsOptIn] = useState(true);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const [billingSameAsShipping, setBillingSameAsShipping] =
    useState(true);

  const [discountCode, setDiscountCode] = useState("");
  const [cityError, setCityError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const subtotal = useMemo(
    () =>
      safeCartItems.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [safeCartItems]
  );

  // Free delivery for now
  const shipping = 0;

  const total = subtotal + shipping;

 const handlePayNow = async (e) => {
  e.preventDefault();

  if (!city) {
    setCityError("Please select your city.");
    return;
  }

  if (safeCartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (!user) {
    alert("Please login before placing an order.");
    navigate("/login");
    return;
  }

  setCityError("");
  setSubmitting(true);

  try {
    const orderData = {
       items: safeCartItems.map((item) => ({
        productId: item._id || item.id,
        name: item.name,
        image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),


       shippingAddress: {
        fullName: firstName,
        address,
        city,
        phone,
      },

      shippingMethod: "local-delivery",

       paymentMethod: {
        method: paymentMethod,
        billingSameAsShipping,
      },

     

      subtotal,
      shipping,
      total,
    };

    console.log("Sending order:", orderData);

      const response = await api.post("/order/orderplace", orderData);

    if (response.data.success) {
      console.log("Order created:", response.data.order);

      // Clear cart=
      clearCart();

      // Go to success page
      navigate("/order-success", {
        state: {
          order: response.data.order,
        },
      });
    }
  } catch (error) {
   console.error("ORDER ERROR:", error);

  console.error("Response:", error.response);
  console.error("Status:", error.response?.status);
  console.error("Data:", error.response?.data);

  alert(
    error.response?.data?.message ||
      error.message ||
      "Something went wrong while placing your order."
  );
  } finally {
    setSubmitting(false);
  }
};

  

 

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#172B4D]">

      {/* ================= TOP TRUST BAR ================= */}

      <div className="border-b border-blue-50 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-3 text-xs font-medium text-slate-500">
          <Lock size={14} className="text-[#0879D1]" />

          <span>
            Secure checkout — Your information is protected
          </span>

          <ShieldCheck
            size={14}
            className="text-[#0879D1]"
          />
        </div>
      </div>

      {/* ================= PAGE ================= */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Page heading */}

        <div className="mb-8 text-center lg:text-left">
         <div className="mb-3 flex items-center justify-center lg:justify-start">
  <Link
    to="/"
    className="inline-flex items-center transition-transform duration-300 hover:scale-105"
  >
    <img
      src={logo}
      alt="Bon Bon Donuts"
      className="h-14 w-auto object-contain"
    />
  </Link>
</div>

          <h1 className="font-['Bebas_Neue'] text-4xl font-bold tracking-wide text-[#172B4D] sm:text-5xl">
            CHECKOUT
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Complete your order and get your favorite donuts delivered.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div>
            <form
              onSubmit={handlePayNow}
              className="space-y-6"
            >

              {/* ================= CONTACT ================= */}

              <CheckoutCard
                title="Contact Information"
                number="01"
              >
                <Field
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={setEmail}
                  required
                />

                <Checkbox
                  checked={newsOptIn}
                  onChange={setNewsOptIn}
                  label="Email me with news and offers"
                />
              </CheckoutCard>

              {/* ================= DELIVERY ================= */}

              <CheckoutCard
                title="Delivery Information"
                number="02"
              >

                <SelectField
                  label="Country / Region"
                  value="Pakistan"
                  options={["Pakistan"]}
                  disabled
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    placeholder="First name"
                    value={firstName}
                    onChange={setFirstName}
                    required
                  />

                  <Field
                    placeholder="Last name"
                    value={lastName}
                    onChange={setLastName}
                    required
                  />
                </div>

                <Field
                  placeholder="Street address"
                  value={address}
                  onChange={setAddress}
                  required
                />

                <Field
                  placeholder="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={setApartment}
                />

                <div className="grid gap-3 sm:grid-cols-2">

                  <div>
                    <SelectField
                      label="City"
                      value={city}
                      onChange={(value) => {
                        setCity(value);
                        setCityError("");
                      }}
                      options={PAKISTAN_CITIES}
                      placeholder="Select your city"
                    />

                    {cityError && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {cityError}
                      </p>
                    )}
                  </div>

                  <Field
                    placeholder="Postal code"
                    value={postalCode}
                    onChange={setPostalCode}
                  />

                </div>

                <Field
                  placeholder="Phone number"
                  value={phone}
                  onChange={setPhone}
                  required
                />

                <Checkbox
                  checked={saveInfo}
                  onChange={setSaveInfo}
                  label="Save this information for next time"
                />

              </CheckoutCard>

              {/* ================= SHIPPING ================= */}

              <CheckoutCard
                title="Delivery Method"
                number="03"
              >
                <div className="flex items-center justify-between rounded-2xl border-2 border-[#0879D1] bg-[#EFF8FF] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0879D1] shadow-sm">
                      <Truck size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#172B4D]">
                        Local Delivery
                      </p>

                      <p className="text-xs text-slate-500">
                        Fast delivery to your location
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-[#0879D1] px-3 py-1 text-xs font-bold text-white">
                    FREE
                  </span>

                </div>
              </CheckoutCard>

              {/* ================= PAYMENT ================= */}

              <CheckoutCard
                title="Payment"
                number="04"
              >

                <div className="overflow-hidden rounded-2xl border border-blue-100">

                  {/* COD */}

                  <PaymentOption
                    id="cod"
                    label="Cash on Delivery"
                    description="Pay when your order arrives"
                    selected={paymentMethod === "cod"}
                    onSelect={() => setPaymentMethod("cod")}
                  />

                  {/* CARD */}

                  <div className="border-t border-blue-50">

                    <PaymentOption
                      id="card"
                      label="Credit / Debit Card"
                      description="Secure online payment"
                      selected={paymentMethod === "card"}
                      onSelect={() => setPaymentMethod("card")}
                      rightBadge={
                        <div className="flex gap-1">
                          <span className="rounded bg-[#172B4D] px-2 py-1 text-[8px] font-bold text-white">
                            VISA
                          </span>

                          <span className="rounded bg-gradient-to-r from-red-500 to-orange-400 px-2 py-1 text-[8px] font-bold text-white">
                            MC
                          </span>
                        </div>
                      }
                    />

                    {paymentMethod === "card" && (
                      <div className="space-y-3 bg-[#F8FBFF] p-4">

                        <Field
                          placeholder="Card number"
                          value={cardNumber}
                          onChange={setCardNumber}
                          icon={
                            <CreditCard
                              size={16}
                              className="text-slate-400"
                            />
                          }
                        />

                        <div className="grid grid-cols-2 gap-3">

                          <Field
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={setCardExpiry}
                          />

                          <Field
                            placeholder="Security code"
                            value={cardCvc}
                            onChange={setCardCvc}
                          />

                        </div>

                        <Field
                          placeholder="Name on card"
                          value={cardName}
                          onChange={setCardName}
                        />

                        <Checkbox
                          checked={billingSameAsShipping}
                          onChange={setBillingSameAsShipping}
                          label="Use shipping address as billing address"
                        />

                      </div>
                    )}

                  </div>

                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-medium text-green-700">
                  <ShieldCheck size={16} />
                  Your payment information is secure and encrypted.
                </div>

              </CheckoutCard>

              {/* ================= MOBILE TOTAL ================= */}

              <div className="lg:hidden">
                <OrderSummary
                  cartItems={safeCartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  discountCode={discountCode}
                  setDiscountCode={setDiscountCode}
                />
              </div>

              {/* ================= PAY BUTTON ================= */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-[#0879D1] py-4 text-base font-bold text-white shadow-lg shadow-blue-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066DBD] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Processing Order..."
                  : `Place Order • ${formatPKR(total)}`}
              </button>

              <p className="text-center text-xs text-slate-400">
                By placing your order, you agree to our terms and
                conditions.
              </p>

            </form>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE ORDER SUMMARY */}
          {/* ================================================= */}

          <div className="hidden lg:block">
            <div className="sticky top-6">
              <OrderSummary
                cartItems={safeCartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


/* ========================================================= */
/* CHECKOUT CARD */
/* ========================================================= */

function CheckoutCard({ title, number, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

      <div className="flex items-center gap-3 border-b border-blue-50 px-5 py-4 sm:px-6">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0879D1] font-bold text-white">
          {number}
        </div>

        <h2 className="text-base font-bold text-[#172B4D]">
          {title}
        </h2>

      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {children}
      </div>

    </div>
  );
}


/* ========================================================= */
/* FIELD */
/* ========================================================= */

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
  required,
  error,
  icon,
}) {
  return (
    <div className="relative">

      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </span>
      )}

      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white py-3.5 text-sm text-[#172B4D] placeholder:text-slate-400 outline-none transition focus:border-[#0879D1] focus:ring-2 focus:ring-blue-50 ${
          icon ? "pl-10 pr-4" : "px-4"
        } ${
          error
            ? "border-red-400"
            : "border-blue-100"
        }`}
      />

    </div>
  );
}


/* ========================================================= */
/* SELECT */
/* ========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
  disabled,
  placeholder,
}) {
  return (
    <div className="relative">

      {label && (
        <label className="mb-1.5 block text-xs font-semibold text-slate-500">
          {label}
        </label>
      )}

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange && onChange(e.target.value)
        }
        className="w-full appearance-none rounded-xl border border-blue-100 bg-white px-4 py-3.5 text-sm text-[#172B4D] outline-none focus:border-[#0879D1] focus:ring-2 focus:ring-blue-50 disabled:bg-slate-50 disabled:text-slate-400"
      >

        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}

      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute bottom-4 right-4 text-slate-400"
      />

    </div>
  );
}


/* ========================================================= */
/* CHECKBOX */
/* ========================================================= */

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-500">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="h-4 w-4 rounded border-blue-200 accent-[#0879D1]"
      />

      {label}

    </label>
  );
}


/* ========================================================= */
/* PAYMENT OPTION */
/* ========================================================= */

function PaymentOption({
  label,
  description,
  selected,
  onSelect,
  rightBadge,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between px-4 py-4 text-left transition ${
        selected
          ? "bg-[#EFF8FF]"
          : "bg-white hover:bg-[#F8FBFF]"
      }`}
    >

      <span className="flex items-center gap-3">

        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            selected
              ? "border-[#0879D1]"
              : "border-slate-300"
          }`}
        >
          {selected && (
            <span className="h-2.5 w-2.5 rounded-full bg-[#0879D1]" />
          )}
        </span>

        <span>

          <span className="block text-sm font-bold text-[#172B4D]">
            {label}
          </span>

          <span className="mt-0.5 block text-xs text-slate-400">
            {description}
          </span>

        </span>

      </span>

      {rightBadge}

    </button>
  );
}


/* ========================================================= */
/* ORDER SUMMARY */
/* ========================================================= */

function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
  discountCode,
  setDiscountCode,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-blue-50 bg-[#EFF8FF] px-5 py-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-bold text-[#172B4D]">
              Your Order
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {cartItems.length} item
              {cartItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0879D1] shadow-sm">
            <ShoppingBag size={20} />
          </div>

        </div>

      </div>

      {/* Products */}

      <div className="max-h-[420px] space-y-4 overflow-y-auto p-5">

        {cartItems.length === 0 ? (
          <div className="py-8 text-center">

            <ShoppingBag
              size={35}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              Your cart is empty
            </p>

          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3"
            >

              {/* Image */}

              <div className="relative h-16 w-16 shrink-0">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full rounded-xl border border-blue-50 object-cover"
                />

                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#0879D1] text-[10px] font-bold text-white">
                  {item.quantity}
                </span>

              </div>

              {/* Name */}

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-bold text-[#172B4D]">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {formatPKR(item.price)} × {item.quantity}
                </p>

              </div>

              {/* Price */}

              <p className="text-sm font-bold text-[#172B4D]">
                {formatPKR(
                  item.price * item.quantity
                )}
              </p>

            </div>
          ))
        )}

      </div>

      {/* Discount */}

      <div className="border-t border-blue-50 p-5">

        <div className="flex gap-2">

          <div className="relative flex-1">

            <Tag
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={discountCode}
              onChange={(e) =>
                setDiscountCode(e.target.value)
              }
              placeholder="Discount code"
              className="w-full rounded-xl border border-blue-100 bg-white py-3 pl-9 pr-3 text-sm text-[#172B4D] outline-none placeholder:text-slate-400 focus:border-[#0879D1]"
            />

          </div>

          <button
            type="button"
            className="rounded-xl border border-blue-100 px-4 text-sm font-bold text-[#0879D1] transition hover:bg-[#EFF8FF]"
          >
            Apply
          </button>

        </div>

      </div>

      {/* Totals */}

      <div className="border-t border-blue-50 p-5">

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-slate-500">
              Subtotal
            </span>

            <span className="font-medium text-[#172B4D]">
              {formatPKR(subtotal)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Delivery
            </span>

            <span className="font-bold text-green-600">
              FREE
            </span>
          </div>

        </div>

        <div className="my-4 border-t border-blue-50" />

        <div className="flex items-end justify-between">

          <span className="text-base font-bold text-[#172B4D]">
            Total
          </span>

          <div className="text-right">

            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              PKR
            </p>

            <p className="text-2xl font-extrabold text-[#0879D1]">
              {formatPKR(total)}
            </p>

          </div>

        </div>

        {/* Secure */}

        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 text-xs font-semibold text-green-700">

          <CheckCircle2 size={15} />

          Secure & safe checkout

        </div>

      </div>

    </div>
  );
}