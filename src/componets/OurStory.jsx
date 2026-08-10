import React from "react";
import {
  Truck,
  CircleDot,
  CreditCard,
} from "lucide-react";

const OurStory = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 lg:py-20">
      
      {/* Decorative blue circle */}
      <div
        className="
          absolute
          -bottom-44
          left-[18%]
          w-[360px]
          h-[360px]
          rounded-full
          bg-[#cceeff]
          opacity-90
        "
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* ================= TITLE ================= */}
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17253d]">
          OUR{" "}
          <span className="text-[#0878ce]">
            STORY
          </span>
        </h2>

        {/* ================= CONTENT ================= */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ================= LEFT ================= */}
          <div className="max-w-[470px]">

            <p className="text-[16px] sm:text-[17px] leading-7 font-semibold text-[#34445b]">
              The tradition of handmade donuts dates
              <br className="hidden sm:block" />
              back to the 16th century. Traveling
              <br className="hidden sm:block" />
              bakers brought recipes, and each country
              <br className="hidden sm:block" />
              added its own twist to make them unique.
            </p>

            <p className="mt-5 text-[16px] sm:text-[17px] leading-7 font-semibold text-[#34445b]">
              We use only high-quality natural
              <br className="hidden sm:block" />
              ingredients, and each donut is made
              <br className="hidden sm:block" />
              with love.
            </p>

            <p className="mt-5 text-[16px] sm:text-[17px] leading-7 font-semibold text-[#34445b]">
              Order our donuts and enjoy quality
              <br className="hidden sm:block" />
              and the taste you deserve.
            </p>

          </div>

          {/* ================= RIGHT FEATURES ================= */}
          <div className="space-y-7">

            {/* Fast Delivery */}
            <div className="flex items-start gap-5">

              <div
                className="
                  relative
                  shrink-0
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    absolute
                    w-14
                    h-14
                    rounded-full
                    bg-[#cceeff]
                  "
                />

                <Truck
                  size={39}
                  strokeWidth={2.2}
                  className="relative z-10 text-[#17253d]"
                />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#17253d]">
                  FAST DELIVERY
                </h3>

                <p className="mt-1 text-[15px] sm:text-[16px] leading-6 font-medium text-[#34445b]">
                  We deliver your order within 60 minutes.
                </p>
              </div>

            </div>

            {/* Natural Ingredients */}
            <div className="flex items-start gap-5">

              <div
                className="
                  relative
                  shrink-0
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    absolute
                    w-14
                    h-14
                    rounded-full
                    bg-[#cceeff]
                  "
                />

                <CircleDot
                  size={39}
                  strokeWidth={2}
                  className="relative z-10 text-[#17253d]"
                />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#17253d]">
                  NATURAL INGREDIENTS
                </h3>

                <p className="mt-1 text-[15px] sm:text-[16px] leading-6 font-medium text-[#34445b] max-w-[350px]">
                  We use natural ingredients and no
                  preservatives.
                </p>
              </div>

            </div>

            {/* Secure Payment */}
            <div className="flex items-start gap-5">

              <div
                className="
                  relative
                  shrink-0
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    absolute
                    w-14
                    h-14
                    rounded-full
                    bg-[#cceeff]
                  "
                />

                <CreditCard
                  size={39}
                  strokeWidth={2}
                  className="relative z-10 text-[#17253d]"
                />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#17253d]">
                  SECURE PAYMENT
                </h3>

                <p className="mt-1 text-[15px] sm:text-[16px] leading-6 font-medium text-[#34445b] max-w-[350px]">
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