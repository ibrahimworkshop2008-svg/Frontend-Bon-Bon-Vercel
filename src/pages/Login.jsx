import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import api from "../api/axiosInstance";
import logoImg from "../assets/01_logo_bonbon.png";
import { useAuth } from "../ContextAuth/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
     const res = await api.post(
  "/auth/login",
  {
    email: formData.email,
    password: formData.password,
  }
);

      if (!res.data.success) {
        throw new Error(
          res.data.message || "Login failed"
        );
      }

      // Save user + token into AuthContext
      login(
        res.data.user,
        res.data.accessToken
      );

      // Admin redirect
      if (res.data.user?.role === "admin") {
        navigate("/admin");
      } else {
        // Normal user
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      console.log(err.response?.data);

      // Account exists but email is not verified
      if (err.response?.data?.notVerified) {
        navigate("/verify-email", {
          state: {
            email: formData.email,
          },
        });

        return;
      }

      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        min-h-[calc(100vh-80px)]
        w-full
        bg-[#F8FBFF]
        px-4
        py-10

        sm:px-6
        sm:py-14

        lg:px-8
      "
    >

      <div
        className="
          mx-auto
          flex
          min-h-[70vh]
          w-full
          max-w-7xl
          items-center
          justify-center
        "
      >

        {/* ================= SIGN IN CARD ================= */}

        <div
          className="
            w-full
            max-w-[460px]
            rounded-[30px]
            border
            border-blue-50
            bg-white
            p-6
            shadow-[0_20px_60px_rgba(16,40,75,0.10)]

            sm:p-8
            md:p-10
          "
        >

          {/* ================= LOGO ================= */}

          <div className="mb-7 flex justify-center">

            <Link to="/">
              <img
                src={logoImg}
                alt="Bon Bon Donut Shop"
                className="
                  h-16
                  w-auto
                  object-contain

                  sm:h-20
                "
              />
            </Link>

          </div>


          {/* ================= TITLE ================= */}

          <div className="mb-7 text-center">

            <h1
              className="
                font-['Bebas_Neue']
                text-4xl
                leading-none
                tracking-wide
                text-[#10284B]

                sm:text-5xl
              "
            >
              WELCOME BACK
            </h1>

            <p
              className="
                mt-3
                text-sm
                leading-relaxed
                text-slate-500

                sm:text-base
              "
            >
              Sign in to continue to Bon Bon Donut Shop.
            </p>

          </div>


          {/* ================= ERROR ================= */}

          {error && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-4
                py-3
                text-center
                text-sm
                font-medium
                text-red-500
              "
            >
              {error}
            </div>
          )}


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* ================= EMAIL ================= */}

            <div className="relative">

              <Mail
                size={19}
                strokeWidth={2}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                autoComplete="email"
                className="
                  w-full
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  py-3.5
                  pl-11
                  pr-4
                  text-sm
                  text-[#10284B]
                  outline-none
                  placeholder:text-slate-400
                  transition-all
                  duration-200

                  focus:border-[#0878D1]
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

            </div>


            {/* ================= PASSWORD ================= */}

            <div className="relative">

              <Lock
                size={19}
                strokeWidth={2}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                autoComplete="current-password"
                className="
                  w-full
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  py-3.5
                  pl-11
                  pr-12
                  text-sm
                  text-[#10284B]
                  outline-none
                  placeholder:text-slate-400
                  transition-all
                  duration-200

                  focus:border-[#0878D1]
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

              {/* Show / Hide Password */}

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  transition
                  hover:text-[#0878D1]
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}

              </button>

            </div>


            {/* ================= FORGOT PASSWORD ================= */}

            <div className="flex justify-end">

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  font-semibold
                  text-[#0878D1]
                  transition
                  hover:text-[#006FBD]
                "
              >
                Forgot password?
              </Link>

            </div>


            {/* ================= SIGN IN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                group
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#0878D1]
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-blue-200
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#006FBD]
                hover:shadow-xl
                hover:shadow-blue-200

                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading
                ? "Signing in..."
                : "Sign In"
              }

              {!loading && (
                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              )}

            </button>

          </form>


          {/* ================= SIGN UP ================= */}

          <p
            className="
              mt-7
              text-center
              text-sm
              text-slate-500
            "
          >
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="
                font-semibold
                text-[#0878D1]
                transition
                hover:text-[#006FBD]
              "
            >
              Sign up
            </Link>

          </p>


          {/* ================= BACK HOME ================= */}

          <div className="mt-5 text-center">

            <Link
              to="/"
              className="
                font-['Bebas_Neue']
                text-sm
                tracking-wide
                text-[#10284B]
                transition
                hover:text-[#0878D1]
              "
            >
              ← BACK TO HOME
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Login;