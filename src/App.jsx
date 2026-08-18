import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./componets/Navbar";
import SideProductShow from "./componets/SideProductShow";
import MorningDelicious from "./componets/MorningDelicious";
import ScrollToTop from "./componets/ScrollTop";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OTPsend from "./pages/OTPsend";
import Profile from "./componets/Profile";
import PaymentPage from "./pages/PaymentPage";
import ProductDetails from "./pages/ProductDetails";
import Menu from "./pages/Menu";
import DeliveryPay from "./pages/DeliveryPay";

import AuthProvider from "./ContextAuth/AuthProvider";
import ProductProvider from "./ContextAuth/ProductProvider";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./AdminDashboard/components/AdminDashboard";
import AdminProducts from "./AdminDashboard/components/AdminProduct";
import AdminOrders from "./AdminDashboard/components/AdminOrder";
import OrderShow from "./AdminDashboard/components/OrderShows";
import AdminProductsShow from "./AdminDashboard/components/AdminProductsShow";

// ========================================
// APP CONTENTs
// ========================================

const AppContent = () => {
  const location = useLocation();

  // ========================================
  // PAGES WHERE NAVBAR + FOOTER ARE HIDDEN
  // ========================================

  const hideLayoutPages = [
    "/login",
    "/signup",
    "/verifyEmail",
    "/checkout",
    "/admin",
    "/admin/orders",
    "/adminproducts",
    "/adminproductsShow"
  ];

  const hideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,

          style: {
            borderRadius: "12px",
            background: "#17253d",
            color: "#fff",
            padding: "14px 18px",
            fontSize: "14px",
          },

          success: {
            duration: 4000,
            iconTheme: {
              primary: "#087fd3",
              secondary: "#fff",
            },
          },

          error: {
            duration: 4000,
          },
        }}
      />

      {/* ====================================
          SCROLL TO TOP
      ==================================== */}

      <ScrollToTop />

      {/* ====================================
          NAVBAR

          Hidden on:
          /login
          /signup
          /verifyEmail
          /checkout
      ==================================== */}

      {!hideLayout && <Navbar />}

      {/* ====================================
          ROUTES
      ==================================== */}

      <Routes>
        {/* ================= HOME ================= */}

        <Route path="/" element={<Home />} />

        {/* ================= ABOUT ================= */}

        <Route path="/about" element={<About />} />

        {/* ================= CONTACT ================= */}

        <Route path="/contact" element={<Contact />} />

        {/* ================= SIGN UP ================= */}

        <Route path="/signup" element={<SignUp />} />

        {/* ================= LOGIN ================= */}

        <Route path="/login" element={<Login />} />

        {/* ================= VERIFY EMAIL ================= */}

        <Route path="/verifyEmail" element={<OTPsend />} />

        {/* ================= PROFILE ================= */}

        <Route path="/profile" element={<Profile />} />

        {/* ================= CHECKOUT ================= */}

        <Route path="/checkout" element={<PaymentPage />} />

        {/* ================= MENU ================= */}

        <Route path="/menu" element={<Menu />} />

        {/* ================= DELIVERY & PAYMENT ================= */}

        <Route path="/payment" element={<DeliveryPay />} />

        {/* ================= PRODUCT DETAILS ================= */}

        <Route path="/product/:id" element={<ProductDetails />} />

        {/* ================= ADMIN DASHBOARD ================= */}

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<OrderShow />} />
          <Route path="productsShow" element={<AdminProductsShow />} />
        </Route>

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/MyOrders" element={<MyOrders />} />
      </Routes>

      {/* ====================================
          FOOTER + CART

          Hidden on:
          /login
          /signup
          /verifyEmail
          /checkout
      ==================================== */}

      {!hideLayout && (
        <>
          <SideProductShow />

          <MorningDelicious />
        </>
      )}
    </>
  );
};

// ========================================
// MAIN APP
// ========================================

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
