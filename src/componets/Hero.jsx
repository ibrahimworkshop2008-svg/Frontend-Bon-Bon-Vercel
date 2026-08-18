import React from "react";
import { Play, ArrowRight } from "lucide-react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import heroBg from "../assets/bg_image.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
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
      {/*
        Legibility overlay: the bg image is now always `bg-cover`, so on
        narrow screens it can crop closer to the text. A soft left-to-right
        fade keeps the heading readable at every width without hiding the
        art on larger screens where there's room to breathe.
      */}
      <div
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

      {/* ================= CONTENT ================= */}
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
            {/* ================= MAIN HEADING ================= */}
            <h1
              className="
                head
                font-['Bebas_Neue']
                font-[500]
                leading-[0.85]
                tracking-[1px]
                text-[#10284B]
              "
              style={{
                fontSize: "clamp(2.75rem, 8vw + 1rem, 7.8125rem)",
              }}
            >
              DONUTS
            </h1>

            {/* ================= SECOND HEADING ================= */}
            <h2
              className="
                head
                mt-1
                font-['Bebas_Neue']
                font-[500]
                leading-[0.85]
                tracking-[1px]
                text-[#0878D1]
              "
              style={{
                fontSize: "clamp(1.75rem, 4.2vw + 0.75rem, 4.75rem)",
              }}
            >
              WITHOUT FREEZING
            </h2>

            {/* ================= DESCRIPTION ================= */}
            <p
              className="
                head
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
              "
            >
              Fresh, delicious, made for you!
            </p>

            {/* ================= BUTTONS ================= */}
            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-4

                sm:mt-6
              "
            >
              {/* ORDER NOW */}
              <button
                type="button"
                className="
                  shrink-0
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
                  active:scale-95

                  sm:px-8
                  sm:py-3.5
                "
                onClick={() => navigate("/menu")}
              >
                Order Now
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
                  <Play
                    size={16}
                    fill="currentColor"
                    className="
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

            {/* ================= SOCIAL + PRICE ================= */}
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
              "
            >
              {/* ================= SOCIAL ================= */}
              <div
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
                    hover:text-[#0878D1]
                  "
                >
                  <FaFacebookF size={15} />
                </a>
              </div>

              {/* ================= PRICE ================= */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                "
              >
                {/* Price Text */}
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

                {/* Arrow Button */}
                <button
                  onClick={() => {
                    navigate("/menu");
                  }}
                  type="button"
                  aria-label="View product"
                  className="
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
                    duration-200
                    hover:scale-110
                    active:scale-95

                    sm:h-10
                    sm:w-10
                  "
                >
                  <ArrowRight size={20} />
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