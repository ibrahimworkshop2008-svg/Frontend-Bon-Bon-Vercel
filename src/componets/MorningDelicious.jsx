import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

import BreakfastDonut from "../assets/Bg_remoe_plate.png";

const MorningDelicious = () => {
  // Google Maps location
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Saint+Petersburg+Leningradskaya+St+18";

  return (
    <section className="w-full overflow-hidden bg-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <div className="relative min-h-[430px] overflow-hidden lg:min-h-[470px]">

        {/* Light Blue Curved Background */}

        <div
          className="
            absolute
            bottom-[-120px]
            left-[-5%]
            right-[-5%]
            z-0
            h-[290px]
            rounded-[50%_50%_0_0/35%_35%_0_0]
            bg-[#ccecff]
          "
        />

        {/* Decorative Circle */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            top-10
            h-48
            w-48
            rounded-full
            border-[28px]
            border-[#087fd3]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            bottom-10
            h-40
            w-40
            rounded-full
            border-[24px]
            border-white/40
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            items-center
            px-5
            pt-14
            sm:px-8
            lg:grid-cols-2
            lg:px-10
            lg:pt-10
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              flex
              flex-col
              items-center
              text-center
              lg:items-start
              lg:text-left
            "
          >

            {/* Small label */}

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-8 bg-[#087fd3]" />

              <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#087fd3]">
                Fresh every morning
              </span>

            </div>


            {/* Heading */}

            <h1
              className="
                text-4xl
                font-extrabold
                leading-[1.02]
                tracking-tight
                text-[#17253d]
                sm:text-5xl
                lg:text-[56px]
              "
            >
              MORNINGS SHOULD BE

              <span className="mt-1 block font-serif font-normal italic text-[#087fd3]">
                Delicious.
              </span>
            </h1>


            {/* Description */}

            <p
              className="
                mt-6
                max-w-[430px]
                text-[15px]
                font-medium
                leading-7
                text-[#34445b]
                sm:text-base
              "
            >
              A perfect day starts with something
              delicious. Pick your favorite donut,
              made fresh and ready to brighten
              your morning.
            </p>


            {/* CTA */}

            <Link
              to="/menu"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#087fd3]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(0,100,180,0.22)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#066db8]
                hover:shadow-[0_12px_25px_rgba(0,100,180,0.28)]
              "
            >
              Order Now

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

          </div>


          {/* =================================================
              RIGHT DONUT IMAGE
          ================================================= */}

          <div
            className="
              relative
              mt-10
              flex
              justify-center
              lg:mt-0
              lg:justify-end
            "
          >

            {/* Image background */}

            <div
              className="
                absolute
                bottom-4
                h-40
                w-64
                rounded-full
                bg-white/40
                blur-2xl
                sm:h-48
                sm:w-80
              "
            />

            <img
              src={BreakfastDonut}
              alt="Delicious chocolate donut"
              className="
                relative
                z-10
                h-auto
                w-[280px]
                object-contain
                drop-shadow-[0_18px_20px_rgba(0,0,0,0.14)]
                transition-transform
                duration-700
                hover:scale-105
                sm:w-[330px]
                lg:w-[420px]
              "
            />

          </div>

        </div>
      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="relative overflow-hidden bg-[#ccecff]">

        {/* Decorative background shapes */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            top-10
            h-56
            w-56
            rounded-full
            border-[35px]
            border-white/30
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-64
            w-64
            rounded-full
            border-[45px]
            border-white/20
          "
        />


        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-5
            py-14
            sm:px-8
            lg:px-10
          "
        >

          {/* =================================================
              TOP FOOTER
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-12
              lg:grid-cols-[1.1fr_0.8fr_1fr_1.2fr]
              lg:gap-16
            "
          >

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="text-center lg:text-left">

              <Link
                to="/"
                className="inline-block"
              >
                <h2
                  className="
                    font-serif
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#17253d]
                  "
                >
                  Donut
                  <span className="text-[#087fd3]">
                    .
                  </span>
                </h2>
              </Link>


              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[270px]
                  text-sm
                  leading-6
                  text-[#34445b]
                  lg:mx-0
                "
              >
                Freshly made treats, warm mornings,
                and little moments worth enjoying.
              </p>


              {/* Brand detail */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-3
                  lg:justify-start
                "
              >

                <span className="h-px w-8 bg-[#087fd3]" />

                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#087fd3]">
                  Made fresh daily
                </span>

              </div>

            </div>


            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <div className="text-center sm:text-left">

              <h3 className="text-xs font-bold uppercase tracking-[2px] text-[#087fd3]">
                Explore
              </h3>


              <ul className="mt-5 space-y-3">

                <li>
                  <Link
                    to="/"
                    className="
                      group
                      inline-flex
                      items-center
                      text-sm
                      font-medium
                      text-[#17253d]
                      transition-all
                      duration-300
                      hover:text-[#087fd3]
                    "
                  >
                    <span
                      className="
                        mr-2
                        h-px
                        w-0
                        bg-[#087fd3]
                        transition-all
                        duration-300
                        group-hover:w-4
                      "
                    />
                    Home
                  </Link>
                </li>


                <li>
                  <Link
                    to="/about"
                    className="
                      group
                      inline-flex
                      items-center
                      text-sm
                      font-medium
                      text-[#17253d]
                      transition-all
                      duration-300
                      hover:text-[#087fd3]
                    "
                  >
                    <span
                      className="
                        mr-2
                        h-px
                        w-0
                        bg-[#087fd3]
                        transition-all
                        duration-300
                        group-hover:w-4
                      "
                    />
                    About Us
                  </Link>
                </li>


                <li>
                  <Link
                    to="/services"
                    className="
                      group
                      inline-flex
                      items-center
                      text-sm
                      font-medium
                      text-[#17253d]
                      transition-all
                      duration-300
                      hover:text-[#087fd3]
                    "
                  >
                    <span
                      className="
                        mr-2
                        h-px
                        w-0
                        bg-[#087fd3]
                        transition-all
                        duration-300
                        group-hover:w-4
                      "
                    />
                    Our Menu
                  </Link>
                </li>


                <li>
                  <Link
                    to="/payment"
                    className="
                      group
                      inline-flex
                      items-center
                      text-sm
                      font-medium
                      text-[#17253d]
                      transition-all
                      duration-300
                      hover:text-[#087fd3]
                    "
                  >
                    <span
                      className="
                        mr-2
                        h-px
                        w-0
                        bg-[#087fd3]
                        transition-all
                        duration-300
                        group-hover:w-4
                      "
                    />
                    Delivery & Payment
                  </Link>
                </li>


                <li>
                  <Link
                    to="/contact"
                    className="
                      group
                      inline-flex
                      items-center
                      text-sm
                      font-medium
                      text-[#17253d]
                      transition-all
                      duration-300
                      hover:text-[#087fd3]
                    "
                  >
                    <span
                      className="
                        mr-2
                        h-px
                        w-0
                        bg-[#087fd3]
                        transition-all
                        duration-300
                        group-hover:w-4
                      "
                    />
                    Contact
                  </Link>
                </li>

              </ul>

            </div>


            {/* =================================================
                CONTACT
            ================================================= */}

            <div className="text-center lg:text-left">

              <h3 className="text-xs font-bold uppercase tracking-[2px] text-[#087fd3]">
                Come say hello
              </h3>


              {/* Phone */}

              <a
                href="tel:+923005554647"
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-[#17253d]
                  transition-colors
                  duration-300
                  hover:text-[#087fd3]
                  lg:justify-start
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/70
                  "
                >
                  <Phone size={15} />
                </span>

                <span className="text-sm font-bold">
                  +92 300 555-46-47
                </span>

              </a>


              {/* Location */}

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4
                  flex
                  items-start
                  justify-center
                  gap-3
                  text-[#34445b]
                  transition-colors
                  duration-300
                  hover:text-[#087fd3]
                  lg:justify-start
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/70
                  "
                >
                  <MapPin
                    size={16}
                    className="text-[#087fd3]"
                  />
                </span>

                <span className="pt-1 text-left text-sm leading-5">
                  Saint Petersburg,
                  <br />
                  Leningradskaya St., 18
                </span>

              </a>


              {/* Social Media */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-2
                  lg:justify-start
                "
              >

                {/* Instagram */}

                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/70
                    text-[#17253d]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#087fd3]
                    hover:text-white
                  "
                >
                  <FaInstagram size={16} />
                </a>


                {/* X */}

                <a
                  href="#twitter"
                  aria-label="X / Twitter"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/70
                    text-[#17253d]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#087fd3]
                    hover:text-white
                  "
                >
                  <FaXTwitter size={16} />
                </a>


                {/* Facebook */}

                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/70
                    text-[#17253d]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#087fd3]
                    hover:text-white
                  "
                >
                  <FaFacebookF size={15} />
                </a>

              </div>

            </div>


            {/* =================================================
                NEWSLETTER
            ================================================= */}

            <div>

              <div
                className="
                  rounded-[26px]
                  bg-white/70
                  p-6
                  shadow-[0_15px_40px_rgba(23,37,61,0.06)]
                  backdrop-blur-sm
                "
              >

                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#087fd3]">
                  Stay in the loop
                </span>


                <h3
                  className="
                    mt-2
                    font-serif
                    text-2xl
                    font-semibold
                    leading-tight
                    text-[#17253d]
                  "
                >
                  Sweet news,

                  <span className="block italic font-normal">
                    straight to you.
                  </span>
                </h3>


                <p className="mt-3 text-sm leading-6 text-[#667085]">
                  Get new menu updates, special offers,
                  and fresh donut news.
                </p>


                {/* Email Input */}

                <div
                  className="
                    mt-5
                    flex
                    overflow-hidden
                    rounded-full
                    border
                    border-[#dce5eb]
                    bg-white
                    p-1
                  "
                >

                  <input
                    type="email"
                    placeholder="Your email"
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      px-4
                      text-sm
                      text-[#17253d]
                      outline-none
                      placeholder:text-[#98a2b3]
                    "
                  />

                  <button
                    type="button"
                    className="
                      shrink-0
                      rounded-full
                      bg-[#17253d]
                      px-5
                      py-2.5
                      text-xs
                      font-bold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-[#087fd3]
                    "
                  >
                    Join
                  </button>

                </div>


                <p className="mt-3 text-[10px] leading-4 text-[#98a2b3]">
                  No spam. Just good things.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="my-10 h-px bg-[#17253d]/10" />


          {/* =================================================
              BOTTOM FOOTER
          ================================================= */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-4
              text-center
              sm:flex-row
              sm:text-left
            "
          >

            <p className="text-xs text-[#667085]">
              © {new Date().getFullYear()} Donut.
              Made with care.
            </p>


            <div className="flex items-center gap-5">

              <Link
                to="/privacy"
                className="
                  text-xs
                  text-[#667085]
                  transition-colors
                  hover:text-[#087fd3]
                "
              >
                Privacy Policy
              </Link>

              <span className="h-1 w-1 rounded-full bg-[#98a2b3]" />

              <Link
                to="/terms"
                className="
                  text-xs
                  text-[#667085]
                  transition-colors
                  hover:text-[#087fd3]
                "
              >
                Terms
              </Link>

            </div>


            <p className="text-xs font-medium text-[#17253d]">
              Freshly baked. Always.
            </p>

          </div>

        </div>

      </footer>

    </section>
  );
};

export default MorningDelicious;
