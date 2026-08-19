import React, { useEffect, useRef, useState } from "react";
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

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  // ==========================================
  // REFS FOR GSAP
  // ==========================================

  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const contactContentRef = useRef(null);
  const leftContentRef = useRef(null);
  const formRef = useRef(null);
  const quickContactRef = useRef(null);
  const socialRef = useRef(null);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // GSAP ANIMATIONS
  // ==========================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ----------------------------------------
      // HERO ANIMATION
      // ----------------------------------------

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      heroTimeline
        .from(".contact-label", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".contact-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          ".contact-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        );

      // ----------------------------------------
      // HERO DECORATIVE CIRCLES
      // ----------------------------------------

      gsap.from(".hero-circle", {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ----------------------------------------
      // LEFT CONTENT
      // ----------------------------------------

      gsap.from(".contact-left-item", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // ----------------------------------------
      // RIGHT FORM
      // ----------------------------------------

      gsap.from(formRef.current, {
        x: 70,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ----------------------------------------
      // FORM ELEMENTS
      // ----------------------------------------

      gsap.from(".form-field", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",

        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // ----------------------------------------
      // QUICK CONTACT
      // ----------------------------------------

      gsap.from(".quick-contact-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: quickContactRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ----------------------------------------
      // SOCIAL ICONS
      // ----------------------------------------

      gsap.from(".social-icon", {
        y: 25,
        opacity: 0,
        scale: 0.7,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.9)",

        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        toast.success(
          response.data.message ||
            "Your message has been sent successfully!",
          {
            duration: 4000,
          }
        );

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
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white"
    >
      {/* =========================================
          HERO
      ========================================== */}

      <div
  ref={heroRef}
  className="relative overflow-hidden bg-[#f4fbff]"
>
  {/* ================= DECORATIVE CIRCLES ================= */}

  <div
    className="
      hero-circle
      absolute
      -right-16
      -top-16
      h-48
      w-48
      rounded-full
      bg-[#ccecff]
      opacity-70
      sm:h-56
      sm:w-56
      lg:h-64
      lg:w-64
    "
  />

  <div
    className="
      hero-circle
      absolute
      -bottom-20
      -left-14
      h-48
      w-48
      rounded-full
      bg-[#e4f7ff]
      sm:h-56
      sm:w-56
      lg:h-64
      lg:w-64
    "
  />

  {/* ================= HERO CONTENT ================= */}

  <div
    className="
      relative
      mx-auto
      max-w-6xl
      px-5
      py-10
      text-center
      sm:px-6
      sm:py-12
      lg:px-8
      lg:py-14
    "
  >
    {/* Label */}
    <p
      className="
        contact-label
        text-[11px]
        font-bold
        uppercase
        tracking-[3px]
        text-[#087fd3]
        sm:text-xs
        sm:tracking-[4px]
      "
    >
      Get In Touch
    </p>

    {/* Heading */}
    <h1
      className="
        contact-title
        mt-2
        text-3xl
        font-extrabold
        leading-tight
        tracking-tight
        text-[#17253d]
        sm:text-4xl
        lg:text-5xl
      "
    >
      CONTACT{" "}
      <span className="text-[#087fd3]">
        US
      </span>
    </h1>

    {/* Description */}
    <p
      className="
        contact-description
        mx-auto
        mt-3
        max-w-xl
        text-xs
        leading-5
        text-[#34445b]
        sm:text-sm
        sm:leading-6
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
        ref={contactContentRef}
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

          <div ref={leftContentRef}>
            <p
              className="
                contact-left-item
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
                contact-left-item
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
                contact-left-item
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
           <div className="contact-left-item">


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
                .contact-left-item
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
            </div>

            {/* WHATSAPP */}
           <div className="contact-left-item">
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
                .contact-left-item
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
            </div>

            {/* LOCATION */}

          <div className="contact-left-item">
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
            </div>

            {/* OPENING HOURS */}

            <div
              className="
                contact-left-item
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
            ref={formRef}
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

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              {/* NAME */}

              <div className="form-field">
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

              <div className="form-field">
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

              <div className="form-field">
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

              {/* MESSAGE */}

              <div className="form-field">
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

              {/* SUBMIT */}

              <div className="form-field">
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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* =========================================
          QUICK CONTACT
      ========================================== */}

      <div
        ref={quickContactRef}
        className="bg-[#ccecff]"
      >
        <div
          className="
            quick-contact-content
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

      <div
        ref={socialRef}
        className="bg-white py-8"
      >
        <div className="flex items-center justify-center gap-6">
          <a
            href="#instagram"
            aria-label="Instagram"
            className="
              social-icon
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
              social-icon
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
              social-icon
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