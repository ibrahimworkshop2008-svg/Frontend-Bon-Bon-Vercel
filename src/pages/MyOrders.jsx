import React, { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  Phone,
  CalendarDays,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";

// Change this import to your actual axios instance path
import api from "../api/axiosInstance";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET MY ORDERS =================
  const getMyOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/order/getOrders");

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while fetching your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH ON COMPONENT LOAD =================
  useEffect(() => {
    getMyOrders();
  }, []);

  // ================= STATUS ICON =================
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle size={18} />;

      case "shipped":
        return <Truck size={18} />;

      case "cancelled":
        return <XCircle size={18} />;

      default:
        return <Clock size={18} />;
    }
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track and manage your orders
            </p>
          </div>

          <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

              <p className="text-sm text-gray-500">
                Loading your orders...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track and manage your orders
            </p>
          </div>

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <XCircle
              size={48}
              className="mx-auto mb-4 text-red-500"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              Unable to load orders
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={getMyOrders}
              className="mt-5 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track and manage your orders
          </p>
        </div>

        {/* ================= NO ORDERS ================= */}
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <Package
              size={48}
              className="mx-auto mb-4 text-gray-400"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              No orders found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {/* ================= ORDERS ================= */}
            {orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >

                {/* ================= ORDER HEADER ================= */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <div className="flex items-center gap-2">
                      <Package
                        size={20}
                        className="text-gray-700"
                      />

                      <h2 className="font-semibold text-gray-900">
                        Order #
                        {order._id?.slice(-8).toUpperCase()}
                      </h2>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays size={16} />

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* ORDER STATUS */}
                  <div
                    className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${getStatusStyle(
                      order.orderStatus
                    )}`}
                  >
                    {getStatusIcon(order.orderStatus)}

                    <span className="capitalize">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* ================= PRODUCTS ================= */}
                <div className="p-5">

                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Ordered Items
                  </h3>

                  <div className="space-y-4">
                    {order.items?.map((item) => (
                      <div
                        key={item._id}
                        className="flex gap-4 rounded-xl bg-gray-50 p-4"
                      >

                        {/* PRODUCT IMAGE */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="flex flex-1 flex-col justify-between">

                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {item.name}
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Rs. {item.price} × {item.quantity}
                            </span>

                            <span className="font-semibold text-gray-900">
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

                {/* ================= ORDER INFORMATION ================= */}
                <div className="grid gap-6 border-t border-gray-100 p-5 md:grid-cols-2">

                  {/* SHIPPING ADDRESS */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <MapPin size={19} />

                      <h3 className="font-semibold text-gray-900">
                        Shipping Address
                      </h3>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">

                      <p className="font-medium text-gray-900">
                        {order.shippingAddress?.fullName}
                      </p>

                      <p>
                        {order.shippingAddress?.address}
                      </p>

                      <p>
                        {order.shippingAddress?.city}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Phone size={15} />

                        {order.shippingAddress?.phone}
                      </div>

                    </div>
                  </div>

                  {/* PAYMENT */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <CreditCard size={19} />

                      <h3 className="font-semibold text-gray-900">
                        Payment
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm">

                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Method
                        </span>

                        <span className="font-medium text-gray-900">
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Status
                        </span>

                        <span className="font-medium capitalize text-yellow-600">
                          {order.paymentStatus}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* ================= PRICE SUMMARY ================= */}
                <div className="border-t border-gray-100 bg-gray-50 p-5">

                  <div className="ml-auto max-w-sm space-y-3">

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Subtotal
                      </span>

                      <span className="font-medium text-gray-900">
                        Rs.{" "}
                        {order.subtotal?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Delivery Fee
                      </span>

                      <span className="font-medium text-gray-900">
                        Rs.{" "}
                        {order.deliveryFee?.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">

                        <span className="text-lg font-semibold text-gray-900">
                          Total
                        </span>

                        <span className="text-lg font-bold text-gray-900">
                          Rs.{" "}
                          {order.totalAmount?.toLocaleString()}
                        </span>

                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;