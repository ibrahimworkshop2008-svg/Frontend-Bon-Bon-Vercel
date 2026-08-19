import React, { useLayoutEffect, useRef } from "react";
import { MapPin, Apple } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DeliveryPayment = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ================================
      // INITIAL STATES
      // ================================

      gsap.set(".delivery-title", {
        opacity: 0,
        y: 50,
      });

      gsap.set(".delivery-content", {
        opacity: 0,
        x: -70,
      });

      gsap.set(".payment-content", {
        opacity: 0,
        x: 70,
      });

      gsap.set(".payment-heading", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".payment-method", {
        opacity: 0,
        y: 35,
        scale: 0.9,
      });

      gsap.set(".address-box", {
        opacity: 0,
        y: 25,
      });

      // ================================
      // MAIN TIMELINE
      // ================================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // ================================
      // TITLE
      // ================================

      tl.to(".delivery-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })

        // ================================
        // LEFT CONTENT
        // ================================

        .to(
          ".delivery-content",
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // ================================
        // RIGHT CONTENT
        // ================================

        .to(
          ".payment-content",
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7"
        )

        // ================================
        // PAYMENT HEADING
        // ================================

        .to(
          ".payment-heading",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        )

        // ================================
        // ADDRESS
        // ================================

        .to(
          ".address-box",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // ================================
        // PAYMENT METHODS
        // ================================

        .to(
          ".payment-method",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        );

      // ================================
      // MAP ICON FLOAT
      // ================================

      gsap.to(".map-icon", {
        y: -4,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ================================
      // REFRESH SCROLLTRIGGER
      // ================================

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white py-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* ================= TITLE ================= */}

        <h2
          className="
            delivery-title
            text-center
            text-3xl
            font-extrabold
            tracking-tight
            text-[#17253d]
            sm:text-4xl
          "
        >
          DELIVERY{" "}
          <span className="text-[#087fd3]">&</span>{" "}
          PAYMENT
        </h2>

        {/* ================= CONTENT ================= */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-2
            lg:gap-20
          "
        >

          {/* ================= DELIVERY ================= */}

          <div className="delivery-content">

            <h3
              className="
                text-[22px]
                font-extrabold
                text-[#17253d]
                sm:text-[24px]
              "
            >
              We deliver our donuts across Saint Petersburg
            </h3>

            <p
              className="
                mt-3
                max-w-[470px]
                text-[15px]
                font-medium
                leading-6
                text-[#34445b]
                sm:text-[16px]
              "
            >
              with special refrigerated transport to keep
              <br className="hidden sm:block" />
              them fresh and delicious.
            </p>

            <p
              className="
                mt-2
                text-[15px]
                font-medium
                leading-6
                text-[#34445b]
                sm:text-[16px]
              "
            >
              You can also pick up your order from our shop:
            </p>

            {/* ================= ADDRESS ================= */}

            <div
              className="
                address-box
                mt-5
                flex
                items-center
                gap-3
              "
            >
              <MapPin
                size={22}
                strokeWidth={2}
                className="
                  map-icon
                  shrink-0
                  text-[#17253d]
                "
              />

              <span
                className="
                  text-[14px]
                  font-medium
                  text-[#34445b]
                  sm:text-[15px]
                "
              >
                Saint Petersburg, Leningradskaya St., 18
              </span>
            </div>
          </div>

          {/* ================= PAYMENT ================= */}

          <div className="payment-content">

            <h3
              className="
                payment-heading
                text-2xl
                font-extrabold
                text-[#087fd3]
                sm:text-[26px]
              "
            >
              5% OFF ON ONLINE PAYMENT
            </h3>

            <p
              className="
                mt-3
                max-w-[430px]
                text-[15px]
                font-medium
                leading-6
                text-[#34445b]
                sm:text-[16px]
              "
            >
              Pay online and get an instant 5% discount
              <br className="hidden sm:block" />
              on your order. It's fast, safe,
              <br className="hidden sm:block" />
              and convenient!
            </p>

            {/* ================= PAYMENT METHODS ================= */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              {/* Apple Pay */}

              <div
                className="
                  payment-method
                  flex
                  h-10
                  min-w-[72px]
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-gray-300
                  bg-white
                  px-3
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#087fd3]
                  hover:shadow-md
                "
              >
                <Apple
                  size={17}
                  fill="currentColor"
                />

                <span className="ml-1 text-sm font-semibold">
                  Pay
                </span>
              </div>

              {/* Google Pay */}

              <div
                className="
                  payment-method
                  flex
                  h-10
                  min-w-[72px]
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-gray-300
                  bg-white
                  px-3
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#087fd3]
                  hover:shadow-md
                "
              >
                <span className="mr-1 font-bold text-[#4285F4]">
                  G
                </span>

                <span className="text-sm font-semibold">
                  Pay
                </span>
              </div>

              {/* Visa */}

              <div
                className="
                  payment-method
                  flex
                  h-10
                  w-[72px]
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-gray-300
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#087fd3]
                  hover:shadow-md
                "
              >
                <span
                  className="
                    text-lg
                    font-black
                    italic
                    text-[#1a4b9b]
                  "
                >
                  VISA
                </span>
              </div>

              {/* Mastercard */}

              <div
                className="
                  payment-method
                  flex
                  h-10
                  w-[72px]
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-gray-300
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#087fd3]
                  hover:shadow-md
                "
              >
                <div className="flex -space-x-2">
                  <span className="h-6 w-6 rounded-full bg-red-500/90" />

                  <span className="h-6 w-6 rounded-full bg-yellow-400/90" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeliveryPayment;