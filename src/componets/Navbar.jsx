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

  const { cartItems, setIsCartOpen } = useCart();

  // =========================================================
  // NAVIGATION LINKS
  // =========================================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Menu",
      path: "/menu",
    },
    {
      name: "Delivery & Payment",
      path: "/payment",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

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
    // Close mobile menu first
    setIsMenuOpen(false);

    // Close profile dropdown
    setProfileOpen(false);

    // Open cart
    setIsCartOpen(true);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    await logout();

    setProfileOpen(false);
    setIsMenuOpen(false);

    navigate("/");
  };

  // =========================================================
  // CLOSE MENU WHEN SCROLLING
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // =========================================================
  // CLOSE MENU WITH ESCAPE KEY
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
  // LOCK BODY SCROLL WHEN MOBILE MENU OPEN
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
          MOBILE BACKDROP
      ====================================================== */}

      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="
            fixed
            inset-0
            z-[90]
            bg-[#10284B]/30
            backdrop-blur-[3px]
            lg:hidden
          "
          aria-hidden="true"
        />
      )}

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
          bg-white/95
          shadow-[0_2px_15px_rgba(16,40,75,0.04)]
          backdrop-blur-md
        "
      >
        <nav className="relative w-full">

          {/* =====================================================
              MAIN NAVBAR
          ====================================================== */}

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
              lg:px-5
              xl:px-7
            "
          >

            {/* =================================================
                LOGO
            ================================================== */}

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
                  group-hover:scale-[1.03]
                  sm:h-14
                "
              />
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <ul
              className="
                hidden
                shrink
                items-center
                gap-4
                lg:flex
                xl:gap-6
                2xl:gap-8
              "
            >
              {navLinks.map((link) => (
                <li
                  key={link.path}
                  className="shrink-0"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `
                      relative
                      whitespace-nowrap
                      font-['Bebas_Neue']
                      text-[13px]
                      font-bold
                      transition-colors
                      duration-200
                      xl:text-sm

                      ${
                        isActive
                          ? "text-blue-500"
                          : "text-[#172B4D] hover:text-blue-500"
                      }

                      after:absolute
                      after:-bottom-2
                      after:left-1/2
                      after:h-[2px]
                      after:-translate-x-1/2
                      after:rounded-full
                      after:bg-blue-500
                      after:transition-all
                      after:duration-300

                      ${
                        isActive
                          ? "after:w-full"
                          : "after:w-0 hover:after:w-full"
                      }
                      `
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* =================================================
                DESKTOP RIGHT SIDE
            ================================================== */}

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
                    className="text-blue-500"
                  />
                </div>

                <div
                  className="
                    whitespace-nowrap
                    text-[11px]
                    leading-tight
                    text-slate-700
                    xl:text-[12px]
                  "
                >
                  <p className="font-semibold">
                    Lahore, Pakistan
                  </p>

                  <p className="text-slate-500">
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
                  text-[11px]
                  leading-tight
                  xl:block
                  xl:text-[12px]
                "
              >
                <p className="font-bold text-slate-800">
                  +92 300 555-46-47
                </p>

                <p className="text-slate-500">
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
                  border-blue-100
                  bg-blue-50
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-blue-500
                  hover:shadow-md
                  hover:shadow-blue-100
                "
              >
                <ShoppingCart
                  size={19}
                  className="
                    text-blue-500
                    transition-colors
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
                    bg-blue-500
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
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-blue-100
                      bg-blue-50
                      px-2
                      py-2
                      transition
                      hover:bg-blue-100
                      xl:px-3
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
                        bg-blue-500
                        text-white
                      "
                    >
                      <User size={16} />
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
                        xl:block
                        ${
                          profileOpen
                            ? "rotate-180"
                            : ""
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
                        bg-white
                        shadow-2xl
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
                              bg-blue-500
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
                            transition
                            hover:bg-blue-50
                            hover:text-blue-500
                          "
                        >
                          <User size={18} />
                          <span>My Profile</span>
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
                            transition
                            hover:bg-red-50
                          "
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
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
                    bg-blue-500
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    shadow-md
                    shadow-blue-200
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-blue-600
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
            ================================================== */}

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
                  duration-200
                  active:scale-95
                "
              >
                <ShoppingCart
                  size={20}
                  className="
                    text-blue-500
                    transition-transform
                    group-hover:scale-105
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
                    bg-blue-500
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
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-500
                  text-white
                  shadow-md
                  shadow-blue-100
                  transition-all
                  duration-300
                  active:scale-95
                  ${
                    isMenuOpen
                      ? "rotate-0 bg-[#172B4D]"
                      : ""
                  }
                `}
                aria-label={
                  isMenuOpen
                    ? "Close menu"
                    : "Open menu"
                }
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X
                    size={23}
                    className="animate-in"
                  />
                ) : (
                  <Menu size={23} />
                )}
              </button>

            </div>

          </div>

          {/* =====================================================
              MOBILE MENU DRAWER
          ====================================================== */}

          <div
            className={`
              fixed
              left-0
              right-0
              top-[73px]
              z-[110]
              px-3
              transition-all
              duration-300
              sm:top-[78px]
              lg:hidden

              ${
                isMenuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-3 opacity-0"
              }
            `}
          >

            <div
              className="
                mx-auto
                max-h-[calc(100vh-90px)]
                max-w-lg
                overflow-y-auto
                rounded-3xl
                border
                border-blue-100
                bg-white
                p-3
                shadow-[0_20px_60px_rgba(16,40,75,0.18)]
              "
            >

              {/* =================================================
                  MENU HEADER
              ================================================== */}

              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-[#EFF8FF]
                  px-4
                  py-3
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      shadow-sm
                    "
                  >
                    <img
                      src={logo}
                      alt="Bon Bon"
                      className="h-7 w-auto object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-[#172B4D]">
                      Bon Bon Donuts
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Fresh & delicious every day
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-slate-500
                    shadow-sm
                    transition
                    hover:text-blue-500
                  "
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>

              </div>

              {/* =================================================
                  NAVIGATION
              ================================================== */}

              <ul className="space-y-1">

                {navLinks.map((link, index) => (
                  <li key={link.path}>

                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `
                        group
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3.5
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "bg-blue-50 text-blue-500"
                            : "text-[#172B4D] hover:bg-slate-50"
                        }
                        `
                      }
                    >
                      <span className="flex items-center gap-3">

                        <span
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-50
                            text-[11px]
                            font-bold
                            text-slate-400
                            group-hover:bg-blue-100
                            group-hover:text-blue-500
                          "
                        >
                          0{index + 1}
                        </span>

                        <span
                          className="
                            font-['Bebas_Neue']
                            text-base
                            font-bold
                            tracking-wide
                          "
                        >
                          {link.name}
                        </span>

                      </span>

                      <ArrowRight
                        size={17}
                        className="
                          text-slate-300
                          transition-transform
                          duration-200
                          group-hover:translate-x-1
                          group-hover:text-blue-500
                        "
                      />

                    </NavLink>

                  </li>
                ))}

              </ul>

              {/* =================================================
                  MOBILE CART QUICK ACTION
              ================================================== */}

              <button
                type="button"
                onClick={openCart}
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  bg-[#0879D1]
                  px-4
                  py-3.5
                  text-white
                  shadow-lg
                  shadow-blue-100
                  transition
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
                      {cartItems?.length === 1
                        ? ""
                        : "s"}{" "}
                      added
                    </span>

                  </span>

                </span>

                <ArrowRight size={18} />

              </button>

              {/* =================================================
                  MOBILE USER
              ================================================== */}

              {user ? (
                <div
                  className="
                    mt-3
                    rounded-2xl
                    border
                    border-blue-100
                    bg-white
                    p-3
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
                        bg-blue-500
                        text-white
                      "
                    >
                      <User size={20} />
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
                      text-blue-500
                      transition
                      hover:bg-blue-100
                    "
                  >
                    <User size={17} />
                    My Profile
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
                      transition
                      hover:bg-red-100
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
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-blue-500
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    shadow-blue-100
                    transition
                    hover:bg-blue-600
                    active:scale-[0.98]
                  "
                >
                  <User size={18} />
                  Login / Create Account
                </Link>
              )}

              {/* =================================================
                  LOCATION / CONTACT
              ================================================== */}

              <div
                className="
                  mt-3
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-2
                "
              >

                {/* Location */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-3
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
                      text-blue-500
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

                {/* Opening hours */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-3
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
                      text-blue-500
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

              {/* Phone */}

              <a
                href="tel:+923005554647"
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-blue-100
                  py-3
                  text-xs
                  font-bold
                  text-[#172B4D]
                  transition
                  hover:bg-blue-50
                  hover:text-blue-500
                "
              >
                <Phone
                  size={16}
                  className="text-blue-500"
                />

                +92 300 555-46-47

              </a>

              {/* Bottom spacing */}

              <div className="h-1" />

            </div>

          </div>

        </nav>
      </header>
    </>
  );
};

export default Navbar;