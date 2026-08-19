import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  CreditCard,
  CalendarDays,
  User,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";

const OrderShow = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // GET ORDER
  // =========================

  const getOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/order/${orderId}`);

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || "Unable to load order.");
      }
    } catch (err) {
      console.error("Get order error:", err);
      setError(
        err.response?.data?.message || "Unable to load order."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderId]);

  // =========================
  // STATUS HELPERS
  // =========================

  const statusIcon = {
    pending: <Clock size={17} />,
    confirmed: <CheckCircle size={17} />,
    shipped: <Truck size={17} />,
    delivered: <CheckCircle size={17} />,
    cancelled: <XCircle size={17} />,
  };

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusChange = async (status) => {
    if (!order || status === order.orderStatus) return;

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const { data } = await api.patch(
        `/order/${order._id}/status`,
        { orderStatus: status }
      );

      if (!data.success) {
        setError(data.message || "Failed to update status.");
        return;
      }

      setOrder((prev) => ({
        ...prev,
        orderStatus: status,
        updatedAt: data.order?.updatedAt || new Date(),
      }));

      setSuccess(`Order status changed to ${status}.`);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update order status."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFBF5]">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin text-[#1C6FEB]"
          />
          <p className="text-sm text-gray-500">
            Loading order...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] p-6">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => navigate("/admin/orders")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
            <Package
              size={45}
              className="mx-auto mb-4 text-gray-300"
            />

            <h2 className="text-xl font-semibold text-gray-900">
              Order not found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {error || "This order does not exist."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const status = order.orderStatus?.toLowerCase();

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/orders")}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Order #{order._id?.slice(-8).toUpperCase()}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={16} />

                {new Date(order.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>
            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                statusStyle[status] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {statusIcon[status] || <Clock size={17} />}

              <span className="capitalize">
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            ALERTS
        ========================= */}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =========================
            STATUS UPDATE
        ========================= */}

        <div className="mb-6 rounded-2xl border border-[#EEE7DA] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Update Order Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Change the current status of this order.
              </p>
            </div>

            <div className="w-full lg:w-64">
              <select
                value={status}
                disabled={updating}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium capitalize outline-none transition focus:border-[#1C6FEB] focus:ring-2 focus:ring-[#1C6FEB]/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {[
                  "pending",
                  "confirmed",
                  "shipped",
                  "delivered",
                  "cancelled",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {updating && (
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                  Updating status...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* =========================
              LEFT
          ========================= */}

          <div className="space-y-6 lg:col-span-2">

            {/* ORDER ITEMS */}

            <div className="overflow-hidden rounded-2xl border border-[#EEE7DA] bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-2">
                  <Package size={20} />
                  <h2 className="text-lg font-semibold">
                    Order Items
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items?.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex gap-4 p-5"
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <div className="mt-3 flex justify-between gap-4">
                        <span className="text-sm text-gray-500">
                          Rs.{" "}
                          {item.price?.toLocaleString()} ×{" "}
                          {item.quantity}
                        </span>

                        <span className="font-semibold">
                          Rs.{" "}
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SHIPPING */}

            <div className="rounded-2xl border border-[#EEE7DA] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <MapPin size={20} />

                <h2 className="text-lg font-semibold">
                  Shipping Address
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} />

                  <span className="font-semibold text-gray-900">
                    {order.shippingAddress?.fullName}
                  </span>
                </div>

                <p>{order.shippingAddress?.address}</p>

                <p>{order.shippingAddress?.city}</p>

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {order.shippingAddress?.phone}
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT
          ========================= */}

          <div className="space-y-6">

            {/* PAYMENT */}

            <div className="rounded-2xl border border-[#EEE7DA] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <CreditCard size={20} />

                <h2 className="text-lg font-semibold">
                  Payment
                </h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Method
                  </span>

                  <span className="font-semibold">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Status
                  </span>

                  <span className="font-semibold capitalize text-yellow-600">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* SUMMARY */}

            <div className="rounded-2xl border border-[#EEE7DA] bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    Rs.{" "}
                    {order.subtotal?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Delivery Fee
                  </span>

                  <span>
                    Rs.{" "}
                    {order.deliveryFee?.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-bold">
                      Rs.{" "}
                      {order.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER INFO */}

            <div className="rounded-2xl border border-[#EEE7DA] bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold">
                Order Information
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Order ID
                  </span>

                  <span className="max-w-[170px] truncate font-medium">
                    {order._id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Created
                  </span>

                  <span>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Updated
                  </span>

                  <span>
                    {new Date(
                      order.updatedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderShow;