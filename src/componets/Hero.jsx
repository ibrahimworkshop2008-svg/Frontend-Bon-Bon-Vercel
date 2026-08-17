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
        min-h-[720px]
        w-full
        overflow-hidden
        bg-white
        bg-right
        bg-fill
        bg-no-repeat

        sm:min-h-[700px]
        sm:bg-[length:auto_100%]

        md:min-h-[650px]
        md:bg-right

        lg:min-h-[650px]
        lg:bg-cover
        xl:min-h-[700px]
      "
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* ================= CONTENT ================= */}
      <div
        className="
          relative
          z-10
          flex
          min-h-[600px]
          w-full
          items-center

          px-5
          py-16

          sm:min-h-[550px]
          sm:px-8
          sm:py-14

          md:min-h-[590px]
          md:px-10

          lg:min-h-[650px]
          lg:px-14

          xl:px-20
        "
      >
        <div className="w-full max-w-7xl mx-auto">
          <div
            className="
              w-full
              max-w-[600px]

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
                tracking-[1px]
                leading-[0.85]
                text-[#10284B]

                text-[64px]

                sm:text-[76px]

                md:text-[88px]

                lg:text-[110px]

                xl:text-[125px]
              "
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
                tracking-[1px]
                leading-[0.85]
                text-[#0878D1]

                text-[38px]

                sm:text-[46px]

                md:text-[56px]

                lg:text-[68px]

                xl:text-[76px]
              "
            >
              WITHOUT FREEZING
            </h2>

            {/* ================= DESCRIPTION ================= */}
            <p
              className="
                head
                mt-6
                max-w-[420px]
                text-sm
                font-medium
                leading-relaxed
                tracking-wide
                text-[#10284B]

                sm:text-base
                sm:max-w-[480px]

                lg:mt-7
                lg:text-lg
                lg:max-w-[520px]
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
                gap-6

                sm:mt-9
                sm:flex-row
                sm:items-center
                sm:justify-between
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
                    whitespace-nowrap
                    text-[12px]
                    font-medium
                    text-[#10284B]

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

                  sm:ml-auto
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
                  navigate("/menu")
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