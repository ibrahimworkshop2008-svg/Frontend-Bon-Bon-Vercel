import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef(null);

  const titleRef = useRef(null);
  const storyRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =====================================================
      // INITIAL STATES
      // =====================================================

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 45,
      });

      gsap.set(storyRef.current.children, {
        opacity: 0,
        y: 35,
      });

      gsap.set(featuresRef.current.children, {
        opacity: 0,
        x: 70,
      });

      // =====================================================
      // SCROLL TIMELINE
      // =====================================================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          // Animation starts when section enters viewport
          start: "top 75%",

          // Play only once
          toggleActions: "play none none none",
        },

        defaults: {
          ease: "power3.out",
        },
      });

      // =====================================================
      // TITLE
      // =====================================================

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
      });

      // =====================================================
      // LEFT STORY PARAGRAPHS
      // =====================================================

      tl.to(
        storyRef.current.children,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.18,
        },
        "-=0.35"
      );

      // =====================================================
      // RIGHT FEATURES
      // =====================================================

      tl.to(
        featuresRef.current.children,
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.55"
      );

      // =====================================================
      // FEATURE ICONS LITTLE POP
      // =====================================================

      const icons = featuresRef.current.querySelectorAll(
        ".story-feature-icon"
      );

      gsap.fromTo(
        icons,
        {
          scale: 0.7,
          rotate: -8,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-16
        lg:py-20
      "
    >
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-6
          lg:px-10
        "
      >
        {/* =================================================
            TITLE
        ================================================== */}

        <h2
          ref={titleRef}
          className="
            text-center
            text-4xl
            font-extrabold
            tracking-tight
            text-[#17253d]

            sm:text-5xl

            will-change-transform
          "
        >
          OUR{" "}
          <span className="text-[#0878ce]">
            STORY
          </span>
        </h2>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-12

            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT STORY
          ================================================== */}

          <div
            ref={storyRef}
            className="
              max-w-[470px]
              lg:pt-1
            "
          >
            {/* Paragraph 1 */}

            <p
              className="
                text-[16px]
                font-semibold
                leading-7
                text-[#34445b]

                sm:text-[17px]

                will-change-transform
              "
            >
              The tradition of handmade donuts dates
              <br className="hidden sm:block" />
              back to the 16th century. Traveling
              <br className="hidden sm:block" />
              bakers brought recipes, and each country
              <br className="hidden sm:block" />
              added its own twist to make them unique.
            </p>

            {/* Paragraph 2 */}

            <p
              className="
                mt-5
                text-[16px]
                font-semibold
                leading-7
                text-[#34445b]

                sm:text-[17px]

                will-change-transform
              "
            >
              We use only high-quality natural
              <br className="hidden sm:block" />
              ingredients, and each donut is made
              <br className="hidden sm:block" />
              with love.
            </p>

            {/* Paragraph 3 */}

            <p
              className="
                mt-5
                text-[16px]
                font-semibold
                leading-7
                text-[#34445b]

                sm:text-[17px]

                will-change-transform
              "
            >
              Order our donuts and enjoy quality
              <br className="hidden sm:block" />
              and the taste you deserve.
            </p>
          </div>

          {/* =================================================
              RIGHT FEATURES
          ================================================== */}

          <div
            ref={featuresRef}
            className="space-y-7"
          >
            {/* =================================================
                FAST DELIVERY
            ================================================== */}

            <div
              className="
                group
                flex
                items-start
                gap-5
                rounded-2xl
                p-2

                transition-all
                duration-300

                hover:bg-[#f5faff]

                will-change-transform
              "
            >
              <div
                className="
                  story-feature-icon
                  flex
                  h-[72px]
                  w-[72px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl
                  bg-[#f3f9ff]

                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:bg-[#e8f5ff]
                "
              >
                <img
                  src={Image1}
                  alt="Fast Delivery"
                  className="
                    h-18
                    w-18
                    object-contain
                  "
                />
              </div>

              <div>
                <h3
                  className="
                    text-xl
                    font-extrabold
                    text-[#17253d]
                  "
                >
                  FAST DELIVERY
                </h3>

                <p
                  className="
                    mt-1
                    text-[15px]
                    font-medium
                    leading-6
                    text-[#34445b]

                    sm:text-[16px]
                  "
                >
                  We deliver your order within 60 minutes.
                </p>
              </div>
            </div>

            {/* =================================================
                NATURAL INGREDIENTS
            ================================================== */}

            <div
              className="
                group
                flex
                items-start
                gap-5
                rounded-2xl
                p-2

                transition-all
                duration-300

                hover:bg-[#f5faff]

                will-change-transform
              "
            >
              <div
                className="
                  story-feature-icon
                  flex
                  h-[72px]
                  w-[72px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl
                  bg-[#f3f9ff]

                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:bg-[#e8f5ff]
                "
              >
                <img
                  src={Image2}
                  alt="Natural Ingredients"
                  className="
                    h-18
                    w-18
                    object-contain
                  "
                />
              </div>

              <div>
                <h3
                  className="
                    text-xl
                    font-extrabold
                    text-[#17253d]
                  "
                >
                  NATURAL INGREDIENTS
                </h3>

                <p
                  className="
                    mt-1
                    max-w-[350px]
                    text-[15px]
                    font-medium
                    leading-6
                    text-[#34445b]

                    sm:text-[16px]
                  "
                >
                  We use natural ingredients and no
                  preservatives.
                </p>
              </div>
            </div>

            {/* =================================================
                SECURE PAYMENT
            ================================================== */}

            <div
              className="
                group
                flex
                items-start
                gap-5
                rounded-2xl
                p-2

                transition-all
                duration-300

                hover:bg-[#f5faff]

                will-change-transform
              "
            >
              <div
                className="
                  story-feature-icon
                  flex
                  h-[72px]
                  w-[72px]
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl
                  bg-[#f3f9ff]

                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:bg-[#e8f5ff]
                "
              >
                <img
                  src={Image3}
                  alt="Secure Payment"
                  className="
                    h-18
                    w-18
                    object-contain
                  "
                />
              </div>

              <div>
                <h3
                  className="
                    text-xl
                    font-extrabold
                    text-[#17253d]
                  "
                >
                  SECURE PAYMENT
                </h3>

                <p
                  className="
                    mt-1
                    text-[15px]
                    font-medium
                    leading-6
                    text-[#34445b]

                    sm:text-[16px]
                  "
                >
                  Pay online safely and easily
                  <br />
                  any way you like.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;