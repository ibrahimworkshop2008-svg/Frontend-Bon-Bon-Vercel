import React, { useEffect, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import heroBg from "../assets/bg_image.png";

const Hero = () => {
  const navigate = useNavigate();

  // =========================================================
  // GSAP REFS
  // =========================================================

  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const priceRef = useRef(null);
  const overlayRef = useRef(null);

  // =========================================================
  // GSAP ANIMATION
  // =========================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bgRef.current, {
        scale: 1.08,
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      gsap.set(
        [
          headingRef.current,
          subHeadingRef.current,
          descriptionRef.current,
          buttonsRef.current,
          socialRef.current,
          priceRef.current,
        ],
        {
          opacity: 0,
          y: 40,
        }
      );

      // =====================================================
      // MAIN TIMELINE
      // =====================================================

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Background reveal
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.8,
        },
        0
      );

      // Background zoom out
      tl.to(
        bgRef.current,
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        0
      );

      // Main heading
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
        },
        0.25
      );

      // Second heading
      tl.to(
        subHeadingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.55"
      );

      // Description
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.45"
      );

      // Buttons
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.4"
      );

      // Social
      tl.to(
        socialRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.35"
      );

      // Price
      tl.to(
        priceRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // =========================================================
  // MOUSE PARALLAX
  // =========================================================

  useEffect(() => {
    const hero = heroRef.current;
    const background = bgRef.current;

    if (!hero || !background) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width - 0.5;

      const y =
        (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(background, {
        x: x * 18,
        y: y * 12,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(background, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      hero.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        bg-cover
        bg-center
        bg-no-repeat

        min-h-[560px]
        sm:min-h-[620px]
        md:min-h-[650px]
        lg:min-h-[680px]
        xl:min-h-[720px]
      "
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* =====================================================
          ANIMATED BACKGROUND LAYER
      ====================================================== */}

      <div
        ref={bgRef}
        className="
          pointer-events-none
          absolute
          -inset-8
          bg-inherit
          bg-cover
          bg-center
          bg-no-repeat
          will-change-transform
        "
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        ref={overlayRef}
        className="
          pointer-events-none
          absolute
          inset-0

          bg-gradient-to-r
          from-white
          via-white/70
          to-transparent

          sm:via-white/50

          lg:from-white/90
          lg:via-white/20
        "
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-[560px]
          w-full
          items-center

          px-5
          py-14

          sm:min-h-[620px]
          sm:px-8
          sm:py-14

          md:min-h-[650px]
          md:px-10

          lg:min-h-[680px]
          lg:px-14

          xl:min-h-[720px]
          xl:px-20
        "
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="
              w-full
              max-w-[520px]

              sm:max-w-[560px]

              lg:max-w-[620px]

              xl:max-w-[650px]
            "
          >
            {/* =================================================
                MAIN HEADING
            ================================================== */}

            <h1
              ref={headingRef}
              className="
                font-['Bebas_Neue']
                font-[500]
                leading-[0.85]
                tracking-[1px]
                text-[#10284B]

                will-change-transform
              "
              style={{
                fontSize:
                  "clamp(2.75rem, 8vw + 1rem, 7.8125rem)",
              }}
            >
              DONUTS
            </h1>

            {/* =================================================
                SECOND HEADING
            ================================================== */}

            <h2
              ref={subHeadingRef}
              className="
                mt-1
                font-['Bebas_Neue']
                font-[500]
                leading-[0.85]
                tracking-[1px]
                text-[#0878D1]

                will-change-transform
              "
              style={{
                fontSize:
                  "clamp(1.75rem, 4.2vw + 0.75rem, 4.75rem)",
              }}
            >
              WITHOUT FREEZING
            </h2>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              ref={descriptionRef}
              className="
                mt-5
                max-w-[420px]

                text-sm
                font-medium
                leading-relaxed
                tracking-wide
                text-[#10284B]

                sm:mt-6
                sm:max-w-[480px]
                sm:text-base

                lg:mt-7
                lg:max-w-[520px]
                lg:text-lg

                will-change-transform
              "
            >
              Fresh, delicious, made for you!
            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div
              ref={buttonsRef}
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-4

                sm:mt-6

                will-change-transform
              "
            >
              {/* ORDER NOW */}

              <button
                type="button"
                className="
                  group
                  relative
                  shrink-0
                  overflow-hidden
                  rounded-full
                  bg-[#0878D1]

                  px-6
                  py-3

                  text-sm
                  font-bold
                  text-white

                  shadow-lg

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-[#006FBD]
                  hover:shadow-xl

                  active:scale-95

                  sm:px-8
                  sm:py-3.5
                "
                onClick={() => navigate("/menu")}
              >
                <span className="relative z-10">
                  Order Now
                </span>

                {/* Shine */}
                <span
                  className="
                    absolute
                    inset-y-0
                    -left-10
                    w-8
                    rotate-12
                    bg-white/30
                    blur-sm

                    transition-all
                    duration-700

                    group-hover:left-[120%]
                  "
                />
              </button>

              {/* WATCH VIDEO */}

              <button
                type="button"
                className="
                  group
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    relative
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-md

                    transition-all
                    duration-300

                    group-hover:scale-110

                    sm:h-11
                    sm:w-11
                  "
                >
                  {/* Pulse ring */}

                  <span
                    className="
                      absolute
                      inset-0
                      rounded-full
                      border
                      border-[#0878D1]/30

                      opacity-0

                      transition-all
                      duration-300

                      group-hover:scale-125
                      group-hover:opacity-100
                    "
                  />

                  <Play
                    size={16}
                    fill="currentColor"
                    className="
                      relative
                      z-10
                      ml-0.5
                      text-[#0878D1]
                    "
                  />
                </span>

                <span
                  className="
                    truncate
                    text-left
                    font-['Bebas_Neue']
                    text-[13px]
                    leading-tight
                    tracking-wide
                    text-[#10284B]

                    sm:text-[14px]
                  "
                >
                  Watch how we
                  <br />
                  make our donuts
                </span>
              </button>
            </div>

            {/* =================================================
                SOCIAL + PRICE
            ================================================== */}

            <div
              className="
                mt-8
                flex
                w-full
                flex-col
                gap-5

                xs:flex-row
                xs:items-center
                xs:justify-between

                sm:mt-9
                sm:gap-4

                lg:mt-10

                will-change-transform
              "
            >
              {/* =================================================
                  SOCIAL
              ================================================== */}

              <div
                ref={socialRef}
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2

                  sm:gap-3
                "
              >
                <span
                  className="
                    mr-1
                    hidden
                    whitespace-nowrap
                    text-[12px]
                    font-medium
                    text-[#10284B]

                    min-[400px]:inline

                    sm:text-[13px]

                    md:text-[14px]
                  "
                >
                  Follow us on social media
                </span>

                {/* Instagram */}

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#10284B]
                    shadow-sm

                    transition-all
                    duration-200

                    hover:-translate-y-1
                    hover:scale-110
                    hover:text-[#0878D1]
                  "
                >
                  <FaInstagram size={15} />
                </a>

                {/* Twitter */}

                <a
                  href="#"
                  aria-label="Twitter"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#10284B]
                    shadow-sm

                    transition-all
                    duration-200

                    hover:-translate-y-1
                    hover:scale-110
                    hover:text-[#0878D1]
                  "
                >
                  <FaTwitter size={15} />
                </a>

                {/* Facebook */}

                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#10284B]
                    shadow-sm

                    transition-all
                    duration-200

                    hover:-translate-y-1
                    hover:scale-110
                    hover:text-[#0878D1]
                  "
                >
                  <FaFacebookF size={15} />
                </a>
              </div>

              {/* =================================================
                  PRICE
              ================================================== */}

              <div
                ref={priceRef}
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                "
              >
                {/* Price */}

                <div
                  className="
                    whitespace-nowrap
                    text-[12px]
                    leading-none
                    text-[#10284B]

                    sm:text-[13px]
                  "
                >
                  <p>Starting from</p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold

                      sm:text-base
                    "
                  >
                    RS.270
                  </p>
                </div>

                {/* Arrow */}

                <button
                  onClick={() => {
                    navigate("/menu");
                  }}
                  type="button"
                  aria-label="View product"
                  className="
                    group
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0878D1]
                    text-white
                    shadow-lg

                    transition-all
                    duration-300

                    hover:scale-110
                    hover:shadow-xl

                    active:scale-95

                    sm:h-10
                    sm:w-10
                  "
                >
                  <ArrowRight
                    size={20}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;