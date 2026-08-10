import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BreakfastDonut from "../assets/Bg_remoe_plate.png";

const MorningDelicious = () => {
    const navigate = useNavigate()
  // Google Maps location
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Saint+Petersburg+Leningradskaya+St+18";

  return (
    <section className="w-full overflow-hidden bg-white">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <div className="relative min-h-[390px] lg:min-h-[430px]">

        {/* Light Blue Curved Background */}
        <div
          className="
            absolute
            bottom-[-110px]
            left-0
            right-0
            z-0
            h-[260px]
            bg-[#ccecff]
            rounded-[50%_50%_0_0/35%_35%_0_0]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-6xl
            grid-cols-1
            items-center
            px-6
            pt-12
            lg:grid-cols-2
            lg:px-12
            lg:pt-8
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

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

            <h1
              className="
                text-3xl
                font-extrabold
                leading-[1.08]
                tracking-tight
                text-[#17253d]
                sm:text-4xl
                lg:text-[39px]
              "
            >
              MORNINGS SHOULD BE

              <span className="block text-[#087fd3]">
                DELICIOUS
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-[350px]
                text-[15px]
                font-medium
                leading-6
                text-[#34445b]
                sm:text-[16px]
              "
            >
              A perfect day starts with a delicious
              <br className="hidden sm:block" />

              breakfast. Order your favorite donuts
              <br className="hidden sm:block" />

              and start your morning the right way.
            </p>

            {/* Order Now -> React Route */}

            <Link
            to="/menu"
              className="
                mt-5
                rounded-full
                bg-[#087fd3]
                px-7
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-[0_5px_12px_rgba(0,100,180,0.3)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#066db8]
                hover:shadow-[0_8px_18px_rgba(0,100,180,0.35)]
              "
               
            >
              Order Now
            </Link>

          </div>


          {/* =================================================
              RIGHT DONUT IMAGE
          ================================================== */}

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

            <img
              src={BreakfastDonut}
              alt="Delicious chocolate donut"
              className="
                relative
                z-10
                h-auto
                w-[280px]
                object-contain
                drop-shadow-[0_12px_15px_rgba(0,0,0,0.12)]
                sm:w-[310px]
                lg:w-[380px]
              "
            />

          </div>

        </div>
      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-20 bg-[#ccecff]">

        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-12">

          <div
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
              lg:gap-16
            "
          >

            {/* =================================================
                NAVIGATION
            ================================================== */}

            <div className="text-center sm:text-left">

              <ul
                className="
                  space-y-1.5
                  text-[14px]
                  font-medium
                  text-[#17253d]
                "
              >

                {/* Home */}

                <li>
                  <Link
                    to="/"
                    className="
                      transition-colors
                      hover:text-[#087fd3]
                    "
                  >
                    Home
                  </Link>
                </li>


                {/* About */}

                <li>
                  <Link
                    to="/about"
                    className="
                      transition-colors
                      hover:text-[#087fd3]
                    "
                  >
                    About Us
                  </Link>
                </li>


                {/* Menu */}

                <li>
                  <Link
                    to="/services"
                    className="
                      transition-colors
                      hover:text-[#087fd3]
                    "
                  >
                    Menu
                  </Link>
                </li>


                {/* Delivery & Payment */}

                <li>
                  <Link
                    to="/payment"
                    className="
                      transition-colors
                      hover:text-[#087fd3]
                    "
                  >
                    Delivery & Payment
                  </Link>
                </li>


                {/* Contact */}

                <li>
                  <Link
                    to="/contact"
                    className="
                      transition-colors
                      hover:text-[#087fd3]
                    "
                  >
                    Contact
                  </Link>
                </li>

              </ul>

            </div>


            {/* =================================================
                NEWSLETTER
            ================================================== */}

            <div className="text-center">

              <p
                className="
                  text-[14px]
                  font-medium
                  text-[#34445b]
                "
              >
                Subscribe to get news and special offers!
              </p>


              <div
                className="
                  mx-auto
                  mt-3
                  flex
                  h-11
                  max-w-[360px]
                  items-center
                  overflow-hidden
                  rounded-full
                  bg-white
                  shadow-sm
                "
              >

                <input
                  type="email"
                  placeholder="Your email"
                  className="
                    h-full
                    min-w-0
                    flex-1
                    bg-transparent
                    px-5
                    text-sm
                    text-[#17253d]
                    outline-none
                    placeholder:text-gray-400
                  "
                />


                <button
                  type="button"
                  className="
                    h-full
                    rounded-full
                    bg-[#087fd3]
                    px-7
                    text-sm
                    font-bold
                    text-white
                    transition-colors
                    hover:bg-[#066db8]
                  "
                >
                  Subscribe
                </button>

              </div>


              <p
                className="
                  mt-3
                  text-[12px]
                  text-[#34445b]
                "
              >
                By subscribing, you agree to our Privacy Policy.
              </p>

            </div>


            {/* =================================================
                CONTACT
            ================================================== */}

            <div className="text-center lg:text-left">

              {/* Phone */}

              <a
                href="tel:+923005554647"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[15px]
                  font-extrabold
                  text-[#17253d]
                  transition-colors
                  hover:text-[#087fd3]
                  lg:justify-start
                "
              >
                <Phone size={16} />

                <span>
                  +92 300 555-46-47
                </span>
              </a>


              {/* Address / Google Maps */}

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-2
                  flex
                  items-start
                  justify-center
                  gap-2
                  text-[14px]
                  font-medium
                  leading-5
                  text-[#34445b]
                  transition-colors
                  hover:text-[#087fd3]
                  lg:justify-start
                "
              >

                <MapPin
                  size={17}
                  className="
                    mt-0.5
                    shrink-0
                    text-[#087fd3]
                  "
                />

                <span>
                  Saint Petersburg,
                  <br />
                  Leningradskaya St., 18
                </span>

              </a>


              {/* =================================================
                  SOCIAL MEDIA
              ================================================== */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-5
                  lg:justify-start
                "
              >

                {/* Instagram */}

                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="
                    text-[#17253d]
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-[#087fd3]
                  "
                >
                  <FaInstagram size={19} />
                </a>


                {/* X / Twitter */}

                <a
                  href="#twitter"
                  aria-label="X / Twitter"
                  className="
                    text-[#17253d]
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-[#087fd3]
                  "
                >
                  <FaXTwitter size={18} />
                </a>


                {/* Facebook */}

                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="
                    text-[#17253d]
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-[#087fd3]
                  "
                >
                  <FaFacebookF size={18} />
                </a>

              </div>

            </div>

          </div>

        </div>

      </footer>

    </section>
  );
};

export default MorningDelicious;