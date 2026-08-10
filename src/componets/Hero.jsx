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
  const navigate = useNavigate()
  return (
    <section
      className="
        relative
        min-h-[530px]
        w-full
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
        

        sm:min-h-[500px]
        md:min-h-[550px]
        lg:min-h-[650px]
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
          mx-auto
          flex
          min-h-[470px]
          w-full
          max-w-7xl
          items-center
          px-5
          py-12

          sm:min-h-[500px]
          sm:px-8

          md:min-h-[550px]

          lg:min-h-[600px]
          lg:px-14
        "
      >
        <div className="w-full">

          {/* ================= TEXT CONTENT ================= */}

          <div className="max-w-[550px]">

            {/* ================= MAIN HEADING ================= */}

            <h1
              className="
                head
                font-['Bebas_Neue']
                text-5xl
                leading-[0.85]
                tracking-[1px]
                text-[#10284B]

                sm:text-6xl

                md:text-7xl

                lg:text-9xl
              "
            >
              DONUTS
            </h1>


            {/* ================= SECOND HEADING ================= */}

            <h2
              className="
                head
                font-['Bebas_Neue']
                text-4xl
                leading-[0.85]
                tracking-[1px]
                text-[#0878D1]

                sm:text-5xl

                md:text-6xl

                lg:text-7xl
              "
            >
              WITHOUT FREEZING
            </h2>


            {/* ================= DESCRIPTION ================= */}

            <p
              className="
                head
                mt-4
                text-sm
                font-medium
                tracking-wider
                text-[#10284B]

                sm:text-base

                lg:text-lg
              "
            >
              Fresh, delicious, made for you!
            </p>


            {/* ================= BUTTONS ================= */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-4
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
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#006FBD]

                  sm:px-8
                "

                onClick={() => {
                  navigate("/menu")
                }}
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
                    transition
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
                    text-[13px]
                    font-['Bebas_Neue']
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


            {/* ================================================= */}
            {/* SOCIAL + PRICE */}
            {/* ================================================= */}

            <div
              className="
                mt-7
                flex
                w-full
                flex-col
                gap-5
                
                sm:flex-row
                sm:items-center
                sm:justify-between

                lg:mt-8
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
                    text-[13px]
                    text-[#10284B]

                    sm:text-[14px]
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
                    transition
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
                    transition
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
                    transition
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

                  <p>
                    Starting from
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold

                      sm:text-base
                    "
                  >
                    $2.49
                  </p>

                </div>


                {/* Arrow Button */}

                <button
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
                    transition
                    duration-200
                    hover:scale-110

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