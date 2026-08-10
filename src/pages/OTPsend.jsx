import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { MailCheck, ArrowLeft } from "lucide-react";

import logo from "../assets/01_logo_bonbon.png";

const OTPsend = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const inputsRef = useRef([]);

  // =========================
  // Handle OTP Change
  // =========================

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // =========================
  // Handle Backspace
  // =========================

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // =========================
  // Handle Paste
  // =========================

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();

    if (!/^[0-9]{6}$/.test(pasted)) {
      return;
    }

    e.preventDefault();

    const digits = pasted.split("");

    setOtp(digits);

    inputsRef.current[5]?.focus();
  };

  // =========================
  // Verify OTP
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResendMessage("");

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    if (!email) {
      setError("Email address is missing. Please sign up again.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
  "/auth/verify-otp",
  {
    email,
    otp: code,
  }
);

      if (!res.data.success) {
        throw new Error(
          res.data.message || "Email verification failed"
        );


      }



      // After successful verification

    } catch (err) {
      console.log(err);
      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid or expired verification code."
      );
    } finally {
      setLoading(false);
      navigate("/login");

    }
  };

  // =========================
  // Resend OTP
  // =========================

  const handleResend = async () => {
    if (!email) {
      setError("Email address is missing.");
      return;
    }

    setError("");
    setResendMessage("");
    setResending(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resendOtp`,
        {
          email,
        }
      );

      setResendMessage(
        res.data?.message ||
          "A new verification code has been sent to your email."
      );

    } catch (err) {
      console.log(err);
      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
          "Could not resend the verification code."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#F7FBFF] px-4 py-10">

      {/* Main Card */}
      <div
        className="
          relative
          w-full
          max-w-md
          rounded-[28px]
          border
          border-blue-100
          bg-white
          p-6
          shadow-xl
          shadow-blue-100/60
          sm:p-8
          md:p-10
        "
      >

        {/* ================= LOGO ================= */}

        <div className="mb-7 flex justify-center">
          <Link to="/">
            <img
              src={logo}
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

        {/* ================= ICON ================= */}

        <div className="mb-5 flex justify-center">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-blue-50
              text-[#0878D1]
              sm:h-16
              sm:w-16
            "
          >
            <MailCheck
              size={28}
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* ================= HEADING ================= */}

        <div className="mb-7 text-center">

          <h1
            className="
              font-['Bebas_Neue']
              text-3xl
              tracking-wide
              text-[#10284B]
              sm:text-4xl
            "
          >
            VERIFY YOUR EMAIL
          </h1>

          <p
            className="
              mx-auto
              mt-2
              max-w-sm
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {email ? (
              <>
                We sent a 6-digit verification code to{" "}
                <span className="font-semibold text-[#10284B]">
                  {email}
                </span>
              </>
            ) : (
              "Enter the 6-digit verification code sent to your email."
            )}
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
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* ================= SUCCESS ================= */}

        {resendMessage && (
          <div
            className="
              mb-5
              rounded-xl
              border
              border-blue-100
              bg-blue-50
              px-4
              py-3
              text-center
              text-sm
              text-[#0878D1]
            "
          >
            {resendMessage}
          </div>
        )}

        {/* ================= OTP FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div
            className="
              flex
              justify-center
              gap-2
              sm:gap-3
            "
            onPaste={handlePaste}
          >

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputsRef.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                autoComplete="one-time-code"
                value={digit}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e) =>
                  handleKeyDown(index, e)
                }
                className="
                  h-12
                  w-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-center
                  text-lg
                  font-bold
                  text-[#10284B]
                  outline-none
                  transition-all

                  focus:border-[#0878D1]
                  focus:ring-4
                  focus:ring-blue-100

                  sm:h-14
                  sm:w-12
                "
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}

          </div>

          {/* ================= VERIFY BUTTON ================= */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-full
              bg-[#0878D1]
              py-3.5
              text-sm
              font-bold
              tracking-wide
              text-white
              shadow-lg
              shadow-blue-200
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-[#006FBD]
              hover:shadow-xl

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "VERIFYING..." : "VERIFY EMAIL"}
          </button>

        </form>

        {/* ================= RESEND ================= */}

        <div className="mt-6 text-center">

          <p className="text-sm text-slate-500">

            Didn't receive the code?{" "}

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="
                font-semibold
                text-[#0878D1]
                transition
                hover:text-[#006FBD]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>

          </p>

        </div>

        {/* ================= BACK TO LOGIN ================= */}

        <div className="mt-5 flex justify-center">

          <Link
            to="/login"
            className="
              flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-slate-400
              transition
              hover:text-[#0878D1]
            "
          >
            <ArrowLeft size={15} />

            Back to Login
          </Link>

        </div>

      </div>

    </section>
  );
};

export default OTPsend;