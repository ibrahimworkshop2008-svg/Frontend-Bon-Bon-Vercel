import React from "react";
import DonutWithFlowers from "../assets/07_donut_box_and_flowers.png";

const DonutBox = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="min-h-[520px] flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left">

            <h2 className="text-4xl sm:text-5xl lg:text-[48px] leading-[1.05] font-extrabold tracking-tight text-[#17253d]">
              BUILD YOUR
              <span className="block text-[#0878ce]">
                OWN DONUT BOX
              </span>
            </h2>

            <p className="mt-7 max-w-[390px] text-[17px] leading-7 font-medium text-[#34445b]">
              Choose 4, 6 or 9 of your favorite donuts
              <br className="hidden sm:block" />
              and create the perfect box
              <br className="hidden sm:block" />
              for any occasion.
            </p>

            <p className="mt-5 max-w-[390px] text-[17px] leading-7 font-medium text-[#34445b]">
              You can also add a card
              <br className="hidden sm:block" />
              with a personal message.
            </p>

            <button
              className="
                mt-7
                px-9
                py-3
                rounded-full
                bg-[#087fd3]
                text-white
                font-bold
                text-lg
                shadow-[0_5px_12px_rgba(0,100,180,0.3)]
                transition-all
                duration-300
                hover:bg-[#066db8]
                hover:-translate-y-1
                hover:shadow-[0_8px_18px_rgba(0,100,180,0.35)]
              "
            >
              Build a Box
            </button>

            <button
              className="
                mt-4
                text-[#34445b]
                font-semibold
                hover:text-[#087fd3]
                transition-colors
              "
            >
              Learn more
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[650px]">

              {/* Blue Circle */}
              <div
                className="
                  absolute
                  w-[280px]
                  h-[280px]
                  sm:w-[360px]
                  sm:h-[360px]
                  lg:w-[430px]
                  lg:h-[430px]
                  rounded-full
                  bg-[#cceeff]
                  right-[8%]
                  top-[5%]
                "
              />

              {/* Donut Image */}
              <img
                src={DonutWithFlowers}
                alt="Build your own donut box"
                className="
                  relative
                  z-10
                  w-full
                  object-contain
                "
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DonutBox;