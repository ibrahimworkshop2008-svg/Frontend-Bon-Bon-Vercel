import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  MapPin,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Phone,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../ContextAuth/AuthProvider";
import { useCart } from "../ContextAuth/ProductProvider";

import logo from "../assets/01_logo_bonbon.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { cartItems,  setCartItems,  setIsCartOpen } = useCart();

  // =========================================================
  // NAVIGATION LINKS
  // =========================================================

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Delivery & Payment", path: "/payment" },
    { name: "Contact", path: "/contact" },
  ];

  // =========================================================
  // USER INITIALS
  // =========================================================

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
    : "U";

  // =========================================================
  // CLOSE MOBILE MENU
  // =========================================================

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // =========================================================
  // OPEN CART
  // =========================================================

  const openCart = () => {
    setIsMenuOpen(false);
    setProfileOpen(false);
    setIsCartOpen(true);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    try {
      await logout();

      setProfileOpen(false);
      setIsMenuOpen(false);

      

    localStorage.clear()
    
        setCartItems([])



      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =========================================================
  // CLOSE MENU ON SCROLL
  // =========================================================

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =========================================================
  // BODY SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header
        className="
          sticky
          top-0
          z-[100]
          w-full
          border-b
          border-blue-50
          bg-white/90
          shadow-[0_4px_25px_rgba(16,40,75,0.06)]
          backdrop-blur-xl
        "
      >
        <nav className="relative w-full">

          {/* =================================================
              MAIN NAVBAR
          ================================================= */}

          <div
            className="
              mx-auto
              flex
              min-h-[72px]
              w-full
              items-center
              justify-between
              gap-3
              px-4
              py-2.5

              sm:min-h-[78px]
              sm:px-6
              lg:px-8
              xl:px-10
            "
          >

            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              to="/"
              onClick={() => {
                closeMenu();
                setProfileOpen(false);
              }}
              className="
                group
                flex
                shrink-0
                items-center
              "
            >
              <img
                src={logo}
                alt="Bon Bon Donut Shop"
                className="
                  h-11
                  w-auto
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-105

                  sm:h-13
                  lg:h-14
                "
              />
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <ul
              className="
                hidden
                items-center
                gap-4
                lg:flex
                xl:gap-6
                2xl:gap-8
              "
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      group
                      relative
                      whitespace-nowrap

                      font-['Bebas_Neue']
                      text-[13px]
                      font-medium
                      tracking-wide

                      transition-colors
                      duration-300

                      xl:text-sm

                      ${
                        isActive
                          ? "text-[#0879D1]"
                          : "text-[#172B4D] hover:text-[#0879D1]"
                      }

                      after:absolute
                      after:-bottom-2
                      after:left-1/2
                      after:h-[2px]
                      after:-translate-x-1/2
                      after:rounded-full
                      after:bg-[#0879D1]

                      after:transition-all
                      after:duration-300

                      ${
                        isActive
                          ? "after:w-full"
                          : "after:w-0 group-hover:after:w-full"
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* =================================================
                DESKTOP RIGHT SIDE
            ================================================= */}

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                lg:flex
                xl:gap-3
                2xl:gap-4
              "
            >

              {/* LOCATION */}

              <div className="hidden items-center gap-2 xl:flex">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                  "
                >
                  <MapPin
                    size={18}
                    className="text-[#0879D1]"
                  />
                </div>

                <div
                  className="
                    whitespace-nowrap
                    font-['Bebas_Neue']
                    text-[12px]
                    leading-tight
                    text-[#172B4D]
                    xl:text-[13px]
                  "
                >
                  <p className="font-semibold">
                    Lahore, Pakistan
                  </p>

                  <p className="text-slate-400">
                    Main Boulevard
                  </p>
                </div>

              </div>

              {/* PHONE */}

              <div
                className="
                  hidden
                  whitespace-nowrap
                  text-right
                  font-['Bebas_Neue']
                  text-[12px]
                  leading-tight
                  xl:block
                  xl:text-[13px]
                "
              >
                <p className="font-bold text-[#172B4D]">
                  +92 300 555-46-47
                </p>

                <p className="text-slate-400">
                  Mon-Sun: 8am - 10pm
                </p>
              </div>

              {/* CART */}

              <button
                type="button"
                onClick={openCart}
                aria-label="Open cart"
                className="
                  group
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-blue-200
                  bg-white

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-[#0879D1]
                  hover:bg-[#0879D1]
                  hover:shadow-lg
                  hover:shadow-blue-100

                  active:scale-95
                "
              >
                <ShoppingCart
                  size={18}
                  className="
                    text-[#0879D1]
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0879D1]
                    px-1
                    text-[9px]
                    font-bold
                    text-white
                    ring-2
                    ring-white
                  "
                >
                  {cartItems?.length || 0}
                </span>
              </button>

              {/* PROFILE */}

              {user ? (
                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setProfileOpen((prev) => !prev)
                    }
                    aria-expanded={profileOpen}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-blue-200
                      bg-white
                      py-1
                      pl-1
                      pr-2

                      transition-all
                      duration-300

                      hover:border-blue-300
                      hover:bg-blue-50

                      xl:pr-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#0879D1]
                        text-xs
                        font-bold
                        text-white
                        shadow-sm
                      "
                    >
                      {initials}
                    </div>

                    <div className="hidden text-left 2xl:block">

                      <p className="max-w-[100px] truncate text-xs font-bold text-[#172B4D]">
                        {user.name || "User"}
                      </p>

                      <p className="max-w-[120px] truncate text-[10px] text-slate-500">
                        {user.email}
                      </p>

                    </div>

                    <ChevronDown
                      size={14}
                      className={`
                        hidden
                        text-[#172B4D]
                        transition-transform
                        duration-300
                        xl:block

                        ${
                          profileOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }
                      `}
                    />

                  </button>

                  {/* PROFILE DROPDOWN */}

                  {profileOpen && (
                    <div
                      className="
                        absolute
                        right-0
                        top-full
                        mt-3
                        w-64
                        overflow-hidden
                        rounded-2xl
                        border
                        border-blue-100
                        bg-white/95
                        shadow-[0_20px_50px_rgba(16,40,75,0.15)]
                        backdrop-blur-xl
                      "
                    >

                      <div className="border-b border-gray-100 px-4 py-4">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#0879D1]
                              text-white
                            "
                          >
                            <User size={21} />
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-bold text-[#172B4D]">
                              {user.name || "User"}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </div>

                      <div className="p-2">

                        <Link
                          to="/profile"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-sm
                            font-medium
                            text-[#172B4D]
                            transition-all
                            duration-200
                            hover:bg-blue-50
                            hover:text-[#0879D1]
                          "
                        >
                          <User size={18} />
                          My Profile
                        </Link>

                        
                        <Link
                          to="/MyOrders"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-sm
                            font-medium
                            text-[#172B4D]
                            transition-all
                            duration-200
                            hover:bg-blue-50
                            hover:text-[#0879D1]
                          "
                        >
                         My Orders
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            text-sm
                            font-medium
                            text-red-500
                            transition-all
                            duration-200
                            hover:bg-red-50
                          "
                        >
                          <LogOut size={18} />
                          Logout
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              ) : (

                <Link
                  to="/login"
                  className="
                    whitespace-nowrap
                    rounded-full
                    bg-[#0879D1]
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    shadow-md
                    shadow-blue-100

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#066DB8]
                    hover:shadow-lg

                    xl:px-5
                    xl:py-2.5
                    xl:text-sm
                  "
                >
                  Login
                </Link>

              )}

            </div>

            {/* =================================================
                MOBILE RIGHT SIDE
            ================================================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                lg:hidden
              "
            >

              {/* MOBILE CART */}

              <button
                type="button"
                onClick={openCart}
                aria-label="Open cart"
                className="
                  group
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50

                  transition-all
                  duration-300

                  hover:bg-blue-100
                  active:scale-95
                "
              >
                <ShoppingCart
                  size={19}
                  className="
                    text-[#0879D1]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0879D1]
                    px-1
                    text-[9px]
                    font-bold
                    text-white
                    ring-2
                    ring-white
                  "
                >
                  {cartItems?.length || 0}
                </span>
              </button>

              {/* MOBILE MENU BUTTON */}

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                aria-label={
                  isMenuOpen
                    ? "Close menu"
                    : "Open menu"
                }
                aria-expanded={isMenuOpen}
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  shadow-md
                  shadow-blue-100
                  transition-all
                  duration-300
                  active:scale-95

                  ${
                    isMenuOpen
                      ? "bg-[#172B4D]"
                      : "bg-[#0879D1] hover:bg-[#066DB8]"
                  }
                `}
              >
                {isMenuOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>

            </div>

          </div>
        </nav>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
          IMPORTANT: OUTSIDE HEADER
      ====================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[150]
          lg:hidden

          bg-[#10284B]/35
          backdrop-blur-[5px]

          transition-all
          duration-500

          ${
            isMenuOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE SIDE DRAWER
          IMPORTANT: OUTSIDE HEADER
      ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[200]

          flex
          h-[100dvh]
          w-[88%]
          max-w-[390px]
          flex-col

          overflow-hidden

          rounded-r-[34px]

          border-r
          border-white/80

          bg-white/95

          shadow-[20px_0_70px_rgba(16,40,75,0.25)]

          backdrop-blur-2xl
          backdrop-saturate-150

          lg:hidden

          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
        aria-hidden={!isMenuOpen}
      >

        {/* =================================================
            DRAWER HEADER
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between

            border-b
            border-blue-50

            bg-[#EFF8FF]/95

            px-4
            py-4

            shadow-sm

            backdrop-blur-xl
          "
        >

          <div className="flex min-w-0 items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-full

                border
                border-white

                bg-white

                shadow-[0_5px_15px_rgba(16,40,75,0.08)]
              "
            >
              <img
                src={logo}
                alt="Bon Bon Donuts"
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-extrabold text-[#172B4D]">
                Bon Bon Donuts
              </p>

              <p className="truncate text-[11px] text-slate-500">
                Fresh & delicious every day
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-blue-100

              bg-white

              text-slate-500

              shadow-sm

              transition-all
              duration-300

              hover:rotate-90
              hover:bg-blue-50
              hover:text-[#0879D1]

              active:scale-90
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* =================================================
            SCROLLABLE CONTENT
        ================================================= */}

        <div
          className="
            flex-1
            overflow-y-auto
            overscroll-contain

            px-3
            py-4

            sm:px-4
          "
        >

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <nav>

            <p
              className="
                mb-2
                px-2

                font-['Bebas_Neue']
                text-[11px]
                font-bold
                uppercase
                tracking-[2px]

                text-[#0879D1]
              "
            >
              Navigation
            </p>

            <ul className="space-y-1.5">

              {navLinks.map((link) => (

                <li key={link.path}>

                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) => `
                      group
                      relative

                      flex
                      items-center
                      justify-between

                      overflow-hidden

                      rounded-2xl

                      px-4
                      py-3.5

                      font-['Bebas_Neue']
                      text-base
                      font-bold
                      tracking-wide

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            translate-x-0
                            bg-[#0879D1]
                            text-white
                            shadow-[0_8px_25px_rgba(8,121,209,0.22)]
                          `
                          : `
                            text-[#172B4D]
                            hover:translate-x-1
                            hover:bg-[#EFF8FF]
                            hover:text-[#0879D1]
                          `
                      }
                    `}
                  >

                    <span>
                      {link.name}
                    </span>

                    <ArrowRight
                      size={17}
                      className="
                        transition-all
                        duration-300

                        group-hover:translate-x-1

                        group-hover:text-[#0879D1]
                      "
                    />

                  </NavLink>

                </li>

              ))}

            </ul>

          </nav>

          {/* =================================================
              CART
          ================================================= */}

          <button
            type="button"
            onClick={openCart}
            className="
              mt-5
              flex
              w-full
              items-center
              justify-between

              rounded-2xl

              bg-gradient-to-r
              from-[#0879D1]
              to-[#066DB8]

              px-4
              py-3.5

              text-white

              shadow-[0_10px_30px_rgba(8,121,209,0.25)]

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-[0_15px_35px_rgba(8,121,209,0.30)]

              active:scale-[0.98]
            "
          >

            <span className="flex items-center gap-3">

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                "
              >
                <ShoppingCart size={18} />
              </span>

              <span className="text-left">

                <span className="block text-sm font-bold">
                  Your Cart
                </span>

                <span className="block text-[11px] text-blue-100">
                  {cartItems?.length || 0} item
                  {cartItems?.length === 1 ? "" : "s"} added
                </span>

              </span>

            </span>

            <ArrowRight size={18} />

          </button>

          {/* =================================================
              USER
          ================================================= */}

          {user ? (

            <div

            onClick={(e) => e.stopPropagation()}

              className="
                mt-4

                rounded-2xl

                border
                border-blue-100

                bg-white/80

                p-3

                shadow-sm

                backdrop-blur-md
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    bg-[#0879D1]

                    text-sm
                    font-bold
                    text-white

                    shadow-md
                  "
                >
                  {initials}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-bold text-[#172B4D]">
                    {user.name || "User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user.email}
                  </p>

                </div>

              </div>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="
                  mt-3

                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-blue-50

                  py-3

                  text-sm
                  font-semibold
                  text-[#0879D1]

                  transition-all
                  duration-300

                  hover:bg-blue-100

                  active:scale-[0.98]
                "
              >
                <User size={17} />
                My Profile
              </Link>

              
                        <Link
                to="/MyOrders"
                onClick={closeMenu}
                className="
                  mt-3

                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-blue-50

                  py-3

                  text-sm
                  font-semibold
                  text-[#0879D1]

                  transition-all
                  duration-300

                  hover:bg-blue-100

                  active:scale-[0.98]
                "
              >
                My Orders
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  mt-2

                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-red-50

                  py-3

                  text-sm
                  font-semibold
                  text-red-500

                  transition-all
                  duration-300

                  hover:bg-red-100

                  active:scale-[0.98]
                "
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              onClick={closeMenu}
              className="
                mt-4

                flex
                w-full
                items-center
                justify-center
                gap-2

                rounded-2xl

                bg-[#172B4D]

                py-3.5

                text-sm
                font-bold
                text-white

                shadow-md

                transition-all
                duration-300

                hover:bg-[#0879D1]

                active:scale-[0.98]
              "
            >
              <User size={18} />
              Login / Create Account
            </Link>

          )}

          {/* =================================================
              LOCATION + HOURS
          ================================================= */}

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
            "
          >

            {/* LOCATION */}

            <div
              className="
                flex
                items-center
                gap-3

                rounded-2xl

                border
                border-white

                bg-slate-50/90

                p-3

                shadow-sm
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  bg-white

                  text-[#0879D1]

                  shadow-sm
                "
              >
                <MapPin size={17} />
              </div>

              <div className="min-w-0">

                <p className="text-[11px] text-slate-400">
                  Location
                </p>

                <p className="truncate text-xs font-bold text-[#172B4D]">
                  Lahore, Pakistan
                </p>

              </div>

            </div>

            {/* HOURS */}

            <div
              className="
                flex
                items-center
                gap-3

                rounded-2xl

                border
                border-white

                bg-slate-50/90

                p-3

                shadow-sm
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  bg-white

                  text-[#0879D1]

                  shadow-sm
                "
              >
                <Clock3 size={17} />
              </div>

              <div>

                <p className="text-[11px] text-slate-400">
                  Opening Hours
                </p>

                <p className="text-xs font-bold text-[#172B4D]">
                  8am - 10pm
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              PHONE
          ================================================= */}

          <a
            href="tel:+923005554647"
            className="
              mt-3

              flex
              items-center
              justify-center
              gap-2

              rounded-2xl

              border
              border-blue-100

              bg-white

              py-3

              text-xs
              font-bold
              text-[#172B4D]

              shadow-sm

              transition-all
              duration-300

              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#0879D1]
            "
          >
            <Phone
              size={16}
              className="text-[#0879D1]"
            />

            +92 300 555-46-47
          </a>

          <div className="h-6" />

        </div>

      </aside>
    </>
  );
};

export default Navbar;