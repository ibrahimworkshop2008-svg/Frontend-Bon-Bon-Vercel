import React from "react";
import GiftImage from "../assets/07_donut_box_and_flowers.png";

const GiftsFlowers = () => {
  return (
    <section className="w-full bg-white overflow-hidden py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">

          {/* ================= IMAGE ================= */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[430px]">

              {/* Blue Circle */}
              

              {/* Image */}
              <img
                src={GiftImage}
                alt="Donuts and gift"
                className="
                  relative
                  z-10
                  w-full
                  h-auto
                  object-contain
                "
              />

            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-[38px]
                leading-[1.05]
                font-extrabold
                tracking-tight
                text-[#17253d]
              "
            >
              GIFTS & FLOWERS
              <span className="block text-[#087fd3]">
                FOR YOUR LOVED ONES
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[420px]
                text-[15px]
                sm:text-[16px]
                leading-6
                font-medium
                text-[#34445b]
              "
            >
              BonBon is a wonderful gift set with donuts
              and a beautiful bouquet. Surprise your loved
              ones with sweetness, warmth, and
              unforgettable emotions.
            </p>

            <button
              className="
                mt-6
                px-8
                py-3
                rounded-full
                bg-[#087fd3]
                text-white
                font-bold
                shadow-[0_5px_12px_rgba(0,100,180,0.3)]
                transition-all
                duration-300
                hover:bg-[#066db8]
                hover:-translate-y-1
                hover:shadow-[0_8px_18px_rgba(0,100,180,0.35)]
              "
            >
              Send a Gift
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default GiftsFlowers;