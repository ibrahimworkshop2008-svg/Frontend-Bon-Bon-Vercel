import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GiftImage from "../assets/07_donut_box_and_flowers.png";

gsap.registerPlugin(ScrollTrigger);

const GiftsFlowers = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =====================================================
      // INITIAL STATES
      // =====================================================

      gsap.set(imageRef.current, {
        opacity: 0,
        x: -100,
        scale: 0.9,
        rotate: -4,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(paragraphRef.current, {
        opacity: 0,
        y: 35,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      // =====================================================
      // SCROLL ANIMATION
      // =====================================================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          // Animation starts when section enters viewport
          start: "top 75%",

          // Only play once
          toggleActions: "play none none none",
        },

        defaults: {
          ease: "power3.out",
        },
      });

      // IMAGE
      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        duration: 1.2,
      });

      // HEADING
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.75"
      );

      // PARAGRAPH
      tl.to(
        paragraphRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.5"
      );

      // BUTTON
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "-=0.35"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        overflow-hidden
        bg-white
        py-12
        lg:py-16
      "
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-10

            lg:grid-cols-2
            lg:gap-16
          "
        >
          {/* =================================================
              IMAGE
          ================================================== */}

          <div className="flex justify-center">
            <div
              ref={imageRef}
              className="
                relative
                w-full
                max-w-[430px]
                will-change-transform
              "
            >
              <img
                src={GiftImage}
                alt="Donuts and gift"
                className="
                  relative
                  z-10
                  w-full
                  h-auto
                  object-contain

                  transition-transform
                  duration-500
                  hover:scale-[1.03]
                "
              />
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================== */}

          <div
            ref={contentRef}
            className="
              flex
              flex-col
              items-center
              text-center

              lg:items-start
              lg:text-left
            "
          >
            {/* ================= HEADING ================= */}

            <h2
              ref={headingRef}
              className="
                text-3xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-[#17253d]

                sm:text-4xl
                lg:text-[38px]

                will-change-transform
              "
            >
              GIFTS & FLOWERS

              <span className="block text-[#087fd3]">
                FOR YOUR LOVED ONES
              </span>
            </h2>

            {/* ================= DESCRIPTION ================= */}

            <p
              ref={paragraphRef}
              className="
                mt-6
                max-w-[420px]

                text-[15px]
                font-medium
                leading-6
                text-[#34445b]

                sm:text-[16px]

                will-change-transform
              "
            >
              BonBon is a wonderful gift set with donuts
              and a beautiful bouquet. Surprise your loved
              ones with sweetness, warmth, and
              unforgettable emotions.
            </p>

            {/* ================= BUTTON ================= */}

            <button
              ref={buttonRef}
              type="button"
              onClick={() => navigate("/menu")}
              className="
                mt-6
                rounded-full

                bg-[#087fd3]

                px-8
                py-3

                font-bold
                text-white

                shadow-[0_5px_12px_rgba(0,100,180,0.3)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:bg-[#066db8]
                hover:shadow-[0_8px_18px_rgba(0,100,180,0.35)]

                active:scale-95

                will-change-transform
              "
            >
              Send a Gift
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftsFlowers;