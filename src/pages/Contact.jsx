import React, { useState } from "react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";

import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // ==========================================
  // LOADING STATE
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT CONTACT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.post("/user/message", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      console.log("Message response:", response.data);

      if (response.data.success) {
        // SUCCESS TOAST
        toast.success(
          response.data.message ||
            "Your message has been sent successfully!",
          {
            duration: 4000,
          }
        );

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(
          response.data.message ||
            "Unable to send your message."
        );
      }
    } catch (err) {
      console.error("Contact form error:", err);

      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
        {
          duration: 4000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CONTACT DETAILS
  // ==========================================

  const phoneNumber = "+923233278821";

  const whatsappUrl = "https://wa.me/923233278821";

  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Lahore+Pakistan";

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section className="w-full overflow-hidden bg-white">

      {/* =========================================
          HERO
      ========================================== */}

      <div className="relative overflow-hidden bg-[#f4fbff]">

        {/* Decorative circles */}

        <div
          className="
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#ccecff]
            opacity-70
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-20
            h-72
            w-72
            rounded-full
            bg-[#e4f7ff]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            py-16
            text-center
            sm:px-6
            lg:px-8
            lg:py-20
          "
        >

          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-[4px]
              text-[#087fd3]
            "
          >
            Get In Touch
          </p>

          <h1
            className="
              mt-3
              text-4xl
              font-extrabold
              leading-tight
              tracking-tight
              text-[#17253d]
              sm:text-5xl
              lg:text-6xl
            "
          >
            CONTACT{" "}
            <span className="text-[#087fd3]">
              US
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-6
              text-[#34445b]
              sm:text-base
            "
          >
            Have a question, want to place an order, or
            just want to say hello? We'd love to hear from
            you.
          </p>

        </div>
      </div>

      {/* =========================================
          CONTACT CONTENT
      ========================================== */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-14
          sm:px-6
          lg:px-8
          lg:py-20
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-2
            lg:gap-16
          "
        >

          {/* =======================================
              LEFT SIDE
          ======================================== */}

          <div>

            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-[3px]
                text-[#087fd3]
              "
            >
              Let's Talk
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-extrabold
                leading-tight
                text-[#17253d]
                sm:text-4xl
              "
            >
              WE'RE HERE TO
              <span className="block text-[#087fd3]">
                HELP YOU
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-7
                text-[#667085]
                sm:text-base
              "
            >
              Whether you have a question about our donuts,
              delivery, orders, or anything else, feel free
              to contact us. Our team will be happy to help.
            </p>

            {/* PHONE */}

            <a
              href={`tel:${phoneNumber}`}
              className="
                group
                mt-8
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-blue-50
                bg-white
                p-4
                shadow-[0_6px_25px_rgba(23,37,61,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(23,37,61,0.10)]
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e8f7ff]
                  text-[#087fd3]
                  transition
                  group-hover:bg-[#087fd3]
                  group-hover:text-white
                "
              >
                <Phone size={21} />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Call Us
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    font-bold
                    text-[#17253d]
                  "
                >
                  +92 323 3278821
                </p>

              </div>

            </a>

            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-4
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-blue-50
                bg-white
                p-4
                shadow-[0_6px_25px_rgba(23,37,61,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(23,37,61,0.10)]
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e8f7ff]
                  text-[#087fd3]
                  transition
                  group-hover:bg-[#087fd3]
                  group-hover:text-white
                "
              >
                <MessageCircle size={21} />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  WhatsApp
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    font-bold
                    text-[#17253d]
                  "
                >
                  Chat With Us
                </p>

              </div>

            </a>

            {/* LOCATION */}

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-4
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-blue-50
                bg-white
                p-4
                shadow-[0_6px_25px_rgba(23,37,61,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_30px_rgba(23,37,61,0.10)]
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e8f7ff]
                  text-[#087fd3]
                  transition
                  group-hover:bg-[#087fd3]
                  group-hover:text-white
                "
              >
                <MapPin size={21} />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Visit Us
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    font-bold
                    text-[#17253d]
                  "
                >
                  Lahore, Pakistan
                </p>

              </div>

            </a>

            {/* OPENING HOURS */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-blue-50
                bg-white
                p-4
                shadow-[0_6px_25px_rgba(23,37,61,0.05)]
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e8f7ff]
                  text-[#087fd3]
                "
              >
                <Clock size={21} />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Opening Hours
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    font-bold
                    text-[#17253d]
                  "
                >
                  Mon - Sun: 8:00 AM - 10:00 PM
                </p>

              </div>

            </div>

          </div>

          {/* =======================================
              RIGHT SIDE - FORM
          ======================================== */}

          <div
            className="
              rounded-[28px]
              bg-[#f4fbff]
              p-6
              sm:p-8
              lg:p-10
            "
          >

            <h3
              className="
                text-2xl
                font-extrabold
                text-[#17253d]
                sm:text-3xl
              "
            >
              Send Us A Message
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-[#667085]
              "
            >
              Fill out the form and we'll get back to you
              as soon as possible.
            </p>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#17253d]
                  "
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-blue-100
                    bg-white
                    px-4
                    text-sm
                    text-[#17253d]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#087fd3]
                    focus:ring-2
                    focus:ring-[#087fd3]/10
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#17253d]
                  "
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-blue-100
                    bg-white
                    px-4
                    text-sm
                    text-[#17253d]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#087fd3]
                    focus:ring-2
                    focus:ring-[#087fd3]/10
                  "
                />

              </div>

              {/* PHONE */}

              <div>

                <label
                  htmlFor="phone"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#17253d]
                  "
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 323 3278821"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-blue-100
                    bg-white
                    px-4
                    text-sm
                    text-[#17253d]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#087fd3]
                    focus:ring-2
                    focus:ring-[#087fd3]/10
                  "
                />

              </div>

              {/* MESSAGE / REVIEW */}

              <div>

                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#17253d]
                  "
                >
                  Your Message / Review
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message or review..."
                  rows={5}
                  required
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-blue-100
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#17253d]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#087fd3]
                    focus:ring-2
                    focus:ring-[#087fd3]/10
                  "
                />

              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#087fd3]
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_6px_18px_rgba(0,100,180,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#066db8]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={17} />
                  </>
                )}

              </button>

            </form>

          </div>

        </div>

      </div>

      {/* =========================================
          QUICK CONTACT
      ========================================== */}

      <div className="bg-[#ccecff]">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-5
            px-5
            py-8
            text-center
            sm:px-6
            md:flex-row
            md:text-left
            lg:px-8
          "
        >

          <div>

            <p
              className="
                text-xl
                font-extrabold
                text-[#17253d]
              "
            >
              Need help with your order?
            </p>

            <p
              className="
                mt-1
                text-sm
                text-[#34445b]
              "
            >
              Give us a call and we'll be happy to help.
            </p>

          </div>

          <a
            href={`tel:${phoneNumber}`}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#087fd3]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              shadow-md
              transition-all
              hover:-translate-y-1
              hover:bg-[#066db8]
            "
          >
            <Phone size={17} />

            +92 323 3278821
          </a>

        </div>

      </div>

      {/* =========================================
          SOCIAL ICONS
      ========================================== */}

      <div className="bg-white py-8">

        <div className="flex items-center justify-center gap-6">

          <a
            href="#instagram"
            aria-label="Instagram"
            className="
              text-[#17253d]
              transition-all
              duration-300
              hover:scale-110
              hover:text-[#087fd3]
            "
          >
            <FaInstagram size={21} />
          </a>

          <a
            href="#twitter"
            aria-label="X / Twitter"
            className="
              text-[#17253d]
              transition-all
              duration-300
              hover:scale-110
              hover:text-[#087fd3]
            "
          >
            <FaXTwitter size={20} />
          </a>

          <a
            href="#facebook"
            aria-label="Facebook"
            className="
              text-[#17253d]
              transition-all
              duration-300
              hover:scale-110
              hover:text-[#087fd3]
            "
          >
            <FaFacebookF size={20} />
          </a>

        </div>

      </div>

    </section>
  );
};

export default Contact;