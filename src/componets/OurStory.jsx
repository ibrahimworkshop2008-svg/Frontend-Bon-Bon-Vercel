import React from "react";

import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";

const OurStory = () => {
  return (

    <section className="relative w-full overflow-hidden bg-white py-16 lg:py-20">
  <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">

    {/* ================= TITLE ================= */}
    <h2 className="text-center text-4xl font-extrabold tracking-tight text-[#17253d] sm:text-5xl">
      OUR{" "}
      <span className="text-[#0878ce]">
        STORY
      </span>
    </h2>

    {/* ================= CONTENT ================= */}
    <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

      {/* ================= LEFT ================= */}
      <div className="max-w-[470px]">

        <p className="text-[16px] font-semibold leading-7 text-[#34445b] sm:text-[17px]">
          The tradition of handmade donuts dates
          <br className="hidden sm:block" />
          back to the 16th century. Traveling
          <br className="hidden sm:block" />
          bakers brought recipes, and each country
          <br className="hidden sm:block" />
          added its own twist to make them unique.
        </p>

        <p className="mt-5 text-[16px] font-semibold leading-7 text-[#34445b] sm:text-[17px]">
          We use only high-quality natural
          <br className="hidden sm:block" />
          ingredients, and each donut is made
          <br className="hidden sm:block" />
          with love.
        </p>

        <p className="mt-5 text-[16px] font-semibold leading-7 text-[#34445b] sm:text-[17px]">
          Order our donuts and enjoy quality
          <br className="hidden sm:block" />
          and the taste you deserve.
        </p>

      </div>

      {/* ================= RIGHT FEATURES ================= */}
      <div className="space-y-7">

        {/* Fast Delivery */}
        <div className="flex items-start gap-5">
          <img
            src={Image1}
            alt="Fast Delivery"
            className="h-18 w-18 object-contain"
          />

          <div>
            <h3 className="text-xl font-extrabold text-[#17253d]">
              FAST DELIVERY
            </h3>

            <p className="mt-1 text-[15px] font-medium leading-6 text-[#34445b] sm:text-[16px]">
              We deliver your order within 60 minutes.
            </p>
          </div>
        </div>

        {/* Natural Ingredients */}
        <div className="flex items-start gap-5">
          <img
            src={Image2}
            alt="Natural Ingredients"
            className="h-18 w-18 object-contain"
          />

          <div>
            <h3 className="text-xl font-extrabold text-[#17253d]">
              NATURAL INGREDIENTS
            </h3>

            <p className="mt-1 max-w-[350px] text-[15px] font-medium leading-6 text-[#34445b] sm:text-[16px]">
              We use natural ingredients and no preservatives.
            </p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex items-start gap-5">
          <img
            src={Image3}
            alt="Secure Payment"
            className="h-18 w-18 object-contain"
          />

          <div>
            <h3 className="text-xl font-extrabold text-[#17253d]">
              SECURE PAYMENT
            </h3>

            <p className="mt-1 text-[15px] font-medium leading-6 text-[#34445b] sm:text-[16px]">
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