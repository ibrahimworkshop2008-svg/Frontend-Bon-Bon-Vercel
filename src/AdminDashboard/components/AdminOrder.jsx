import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  RefreshCw,
} from "lucide-react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminOrders = ({ onViewOrder }) => {
  const navigate =  useNavigate()
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");




  // ================= FETCH ALL ORDERS =================
  const getAllOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/order/getOrdersAdmin");
      
      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError(
          response.data.message || "Failed to fetch orders"
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while fetching orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH ON LOAD =================
  useEffect(() => {
    getAllOrders();
  }, []);

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ================= STATUS ICON =================
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircle size={15} />;

      case "shipped":
        return <Truck size={15} />;

      case "delivered":
        return <CheckCircle size={15} />;

      case "cancelled":
        return <XCircle size={15} />;

      default:
        return <Clock size={15} />;
    }
  };

  // ================= ORDER COUNTS =================
  const orderStats = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter(
        (order) => order.orderStatus === "pending"
      ).length,

      confirmed: orders.filter(
        (order) => order.orderStatus === "confirmed"
      ).length,

      shipped: orders.filter(
        (order) => order.orderStatus === "shipped"
      ).length,

      delivered: orders.filter(
        (order) => order.orderStatus === "delivered"
      ).length,

      cancelled: orders.filter(
        (order) => order.orderStatus === "cancelled"
      ).length,
    };
  }, [orders]);

  // ================= FILTER ORDERS =================
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase().trim();

      const orderId = order._id?.toLowerCase() || "";

      const customerName =
        order.shippingAddress?.fullName?.toLowerCase() || "";

      const customerPhone =
        order.shippingAddress?.phone?.toLowerCase() || "";

      const matchesSearch =
        orderId.includes(searchValue) ||
        customerName.includes(searchValue) ||
        customerPhone.includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus?.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);



function GotoOrderStatus(id) {
  onViewOrder?.(order);
  navigate(`/admin/orders/${id}`);
}

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[500px] bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-14 animate-pulse rounded-lg bg-gray-100"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track all customer orders.
            </p>
          </div>

          <button
            onClick={getAllOrders}
            className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              onClick={getAllOrders}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* ================= STATS ================= */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

          {/* TOTAL */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Package size={20} className="text-gray-700" />
            </div>

            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {orderStats.total}
            </p>
          </div>

          {/* PENDING */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
              <Clock size={20} className="text-yellow-700" />
            </div>

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {orderStats.pending}
            </p>
          </div>

          {/* CONFIRMED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <CheckCircle size={20} className="text-blue-700" />
            </div>

            <p className="text-sm text-gray-500">
              Confirmed
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {orderStats.confirmed}
            </p>
          </div>

          {/* SHIPPED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <Truck size={20} className="text-indigo-700" />
            </div>

            <p className="text-sm text-gray-500">
              Shipped
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {orderStats.shipped}
            </p>
          </div>

          {/* DELIVERED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle size={20} className="text-green-700" />
            </div>

            <p className="text-sm text-gray-500">
              Delivered
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {orderStats.delivered}
            </p>
          </div>

          {/* CANCELLED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <XCircle size={20} className="text-red-700" />
            </div>

            <p className="text-sm text-gray-500">
              Cancelled
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {orderStats.cancelled}
            </p>
          </div>

        </div>

        {/* ================= ORDERS CARD ================= */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* ================= TOOLBAR ================= */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search order ID, customer or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
              />
            </div>

            {/* FILTER */}
            <div className="flex flex-wrap gap-2">

              {[
                "all",
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${
                    statusFilter === status
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}

            </div>
          </div>

          {/* ================= MOBILE ORDERS ================= */}
          <div className="block md:hidden">

            {filteredOrders.length === 0 ? (
              <div className="p-10 text-center">
                <Package
                  size={40}
                  className="mx-auto mb-3 text-gray-300"
                />

                <p className="font-medium text-gray-700">
                  No orders found
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Try changing your search or filter.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">

                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="font-semibold text-gray-900">
                          #
                          {order._id
                            ?.slice(-8)
                            .toUpperCase()}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {order.shippingAddress?.fullName}
                        </p>
                      </div>

                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${getStatusStyle(
                          order.orderStatus
                        )}`}
                      >
                        {getStatusIcon(order.orderStatus)}

                        {order.orderStatus}
                      </span>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                      <div>
                        <p className="text-gray-400">
                          Items
                        </p>

                        <p className="mt-1 font-medium text-gray-800">
                          {order.items?.length || 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          Total
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          Rs.{" "}
                          {order.totalAmount?.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          Payment
                        </p>

                        <p className="mt-1 font-medium text-gray-800">
                          {order.paymentMethod}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          Date
                        </p>

                        <p className="mt-1 font-medium text-gray-800">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    <button
                    
                      onClick={() => {
                        GotoOrderStatus()
                      }}
                      
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      <Eye size={17} />
                      View Order
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full text-left">

              <thead className="bg-gray-50">
                <tr className="border-b border-gray-100">

                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Order
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Items
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Total
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payment
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-12 text-center"
                    >
                      <Package
                        size={42}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-medium text-gray-700">
                        No orders found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* ORDER */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <p className="font-semibold text-gray-900">
                          #
                          {order._id
                            ?.slice(-8)
                            .toUpperCase()}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-5 py-5">
                        <p className="whitespace-nowrap font-medium text-gray-900">
                          {order.shippingAddress?.fullName ||
                            "Unknown"}
                        </p>

                        <p className="mt-1 whitespace-nowrap text-xs text-gray-500">
                          {order.shippingAddress?.phone ||
                            "No phone"}
                        </p>
                      </td>

                      {/* ITEMS */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <span className="text-sm text-gray-700">
                          {order.items?.length || 0}{" "}
                          {order.items?.length === 1
                            ? "item"
                            : "items"}
                        </span>
                      </td>

                      {/* TOTAL */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <span className="font-semibold text-gray-900">
                          Rs.{" "}
                          {order.totalAmount?.toLocaleString()}
                        </span>
                      </td>

                      {/* PAYMENT */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <p className="text-sm font-medium text-gray-800">
                          {order.paymentMethod}
                        </p>

                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {order.paymentStatus}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="whitespace-nowrap px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${getStatusStyle(
                            order.orderStatus
                          )}`}
                        >
                          {getStatusIcon(
                            order.orderStatus
                          )}

                          {order.orderStatus}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="whitespace-nowrap px-5 py-5 text-right">

                        <button
                            onClick={() => GotoOrderStatus(order._id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <Eye size={16} />
                          View
                        </button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="border-t border-gray-100 px-5 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">
                {orders.length}
              </span>{" "}
              orders
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOrders;