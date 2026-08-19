import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DonutWithFlowers from "../assets/07_donut_box_and_flowers.png";

gsap.registerPlugin(ScrollTrigger);

const DonutBox = () => {
  const sectionRef = useRef(null);

  const headingRef = useRef(null);
  const paragraphsRef = useRef(null);
  const buttonsRef = useRef(null);

  const imageRef = useRef(null);
  const circleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 70,
      });

      gsap.set(paragraphsRef.current?.children, {
        opacity: 0,
        y: 35,
      });

      gsap.set(buttonsRef.current?.children, {
        opacity: 0,
        y: 25,
        scale: 0.9,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 120,
        scale: 0.85,
        rotation: 3,
      });

      gsap.set(circleRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -20,
      });

      /* =====================================================
         MAIN SCROLL ANIMATION
      ===================================================== */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      /* Heading */

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      })

        /* Paragraphs */

        .to(
          paragraphsRef.current?.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.18,
            ease: "power3.out",
          },
          "-=0.45"
        )

        /* Buttons */

        .to(
          buttonsRef.current?.children,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )

        /* Blue Circle */

        .to(
          circleRef.current,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.4)",
          },
          "-=0.7"
        )

        /* Donut Image */

        .to(
          imageRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.8"
        );

      /* =====================================================
         DONUT FLOATING ANIMATION
      ===================================================== */

      gsap.to(imageRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });

      /* =====================================================
         BLUE CIRCLE FLOATING ANIMATION
      ===================================================== */

      gsap.to(circleRef.current, {
        y: 12,
        x: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className="
            flex
            min-h-[520px]
            flex-col
            items-center
            justify-between
            gap-10
            lg:flex-row
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              flex
              w-full
              flex-col
              items-center
              text-center
              lg:w-[40%]
              lg:items-start
              lg:text-left
            "
          >
            {/* HEADING */}

            <h2
              ref={headingRef}
              className="
                text-4xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-[#17253d]

                sm:text-5xl
                lg:text-[48px]
              "
            >
              BUILD YOUR

              <span className="block text-[#0878ce]">
                OWN DONUT BOX
              </span>
            </h2>

            {/* PARAGRAPHS */}

            <div ref={paragraphsRef}>
              <p
                className="
                  mt-7
                  max-w-[390px]
                  text-[17px]
                  font-medium
                  leading-7
                  text-[#34445b]
                "
              >
                Choose 4, 6 or 9 of your favorite donuts
                <br className="hidden sm:block" />
                and create the perfect box
                <br className="hidden sm:block" />
                for any occasion.
              </p>

              <p
                className="
                  mt-5
                  max-w-[390px]
                  text-[17px]
                  font-medium
                  leading-7
                  text-[#34445b]
                "
              >
                You can also add a card
                <br className="hidden sm:block" />
                with a personal message.
              </p>
            </div>

            {/* BUTTONS */}

            <div
              ref={buttonsRef}
              className="flex flex-col items-center lg:items-start"
            >
              <button
                type="button"
                className="
                  mt-7
                  rounded-full
                  bg-[#087fd3]
                  px-9
                  py-3
                  text-lg
                  font-bold
                  text-white
                  shadow-[0_5px_12px_rgba(0,100,180,0.3)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-[#066db8]
                  hover:shadow-[0_8px_18px_rgba(0,100,180,0.35)]

                  active:scale-95
                "
              >
                Build a Box
              </button>

              <button
                type="button"
                className="
                  mt-5
                  ml-2
                  font-semibold
                  text-[#34445b]
                  transition-colors
                  duration-300
                  hover:text-[#087fd3]
                "
              >
                Learn more
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================= */}

          <div
            className="
              flex
              w-full
              justify-center
              lg:w-[60%]
              lg:justify-end
            "
          >
            <div className="relative w-full max-w-[650px]">
              {/* BLUE CIRCLE */}

              <div
                ref={circleRef}
                className="
                  absolute
                  right-[8%]
                  top-[5%]

                  h-[280px]
                  w-[280px]

                  rounded-full
                  bg-[#cceeff]

                  sm:h-[360px]
                  sm:w-[360px]

                  lg:h-[430px]
                  lg:w-[430px]
                "
              />

              {/* DONUT IMAGE */}

              <img
                ref={imageRef}
                src={DonutWithFlowers}
                alt="Build your own donut box"
                className="
                  relative
                  z-10
                  w-full
                  object-contain
                  drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonutBox;