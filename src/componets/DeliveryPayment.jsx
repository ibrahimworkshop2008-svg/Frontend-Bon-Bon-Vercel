import React from "react";
import {
  MapPin,
  Apple,
} from "lucide-react";

const DeliveryPayment = () => {
  return (
    <section className="w-full bg-white py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= TITLE ================= */}
        <h2
          className="
            text-center
            text-3xl
            sm:text-4xl
            font-extrabold
            tracking-tight
            text-[#17253d]
          "
        >
          DELIVERY & PAYMENT
        </h2>

        {/* ================= CONTENT ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* ================= DELIVERY ================= */}
          <div>

            <h3
              className="
                text-[22px]
                sm:text-[24px]
                font-extrabold
                text-[#17253d]
              "
            >
              We deliver our donuts across Saint Petersburg
            </h3>

            <p
              className="
                mt-3
                max-w-[470px]
                text-[15px]
                sm:text-[16px]
                leading-6
                font-medium
                text-[#34445b]
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
                sm:text-[16px]
                leading-6
                font-medium
                text-[#34445b]
              "
            >
              You can also pick up your order from our shop:
            </p>

            {/* Address */}
            <div className="flex items-center gap-3 mt-5">

              <MapPin
                size={22}
                strokeWidth={2}
                className="text-[#17253d] shrink-0"
              />

              <span
                className="
                  text-[14px]
                  sm:text-[15px]
                  font-medium
                  text-[#34445b]
                "
              >
                Saint Petersburg, Leningradskaya St., 18
              </span>

            </div>

          </div>

          {/* ================= PAYMENT ================= */}
          <div>

            <h3
              className="
                text-2xl
                sm:text-[26px]
                font-extrabold
                text-[#087fd3]
              "
            >
              5% OFF ON ONLINE PAYMENT
            </h3>

            <p
              className="
                mt-3
                max-w-[430px]
                text-[15px]
                sm:text-[16px]
                leading-6
                font-medium
                text-[#34445b]
              "
            >
              Pay online and get an instant 5% discount
              <br className="hidden sm:block" />
              on your order. It's fast, safe,
              <br className="hidden sm:block" />
              and convenient!
            </p>

            {/* ================= PAYMENT METHODS ================= */}
            <div className="flex flex-wrap items-center gap-3 mt-5">

              {/* Apple Pay */}
              <div
                className="
                  h-10
                  min-w-[72px]
                  px-3
                  border
                  border-gray-300
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-white
                "
              >
                <Apple size={17} fill="currentColor" />
                <span className="ml-1 text-sm font-semibold">
                  Pay
                </span>
              </div>

              {/* Google Pay */}
              <div
                className="
                  h-10
                  min-w-[72px]
                  px-3
                  border
                  border-gray-300
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-white
                "
              >
                <span className="text-[#4285F4] font-bold mr-1">
                  G
                </span>

                <span className="text-sm font-semibold">
                  Pay
                </span>
              </div>

              {/* Visa */}
              <div
                className="
                  h-10
                  w-[72px]
                  border
                  border-gray-300
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-white
                "
              >
                <span
                  className="
                    text-[#1a4b9b]
                    text-lg
                    italic
                    font-black
                  "
                >
                  VISA
                </span>
              </div>

              {/* Mastercard */}
              <div
                className="
                  h-10
                  w-[72px]
                  border
                  border-gray-300
                  rounded-md
                  flex
                  items-center
                  justify-center
                  bg-white
                "
              >
                <div className="flex -space-x-2">
                  <span className="w-6 h-6 rounded-full bg-red-500/90" />
                  <span className="w-6 h-6 rounded-full bg-yellow-400/90" />
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