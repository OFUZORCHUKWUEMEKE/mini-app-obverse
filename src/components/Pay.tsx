"use client";

import React from "react";
import Image from "next/image";
import { bitcoinImg } from "@/assets/images";
import { Button } from "./ui/Button";

const Pay = () => {
  return (
    <section className="flex items-center justify-center w-full max-container mt-15">
      <div className="relative">

        <div className="absolute bottom-2 left-2 w-full h-full z-1 rounded-[24px] bg-[#FFD1BE] border border-[#FFC7AF]"></div>
        <div className="absolute bottom-4 left-4 w-full h-full rounded-[24px] bg-[#FFDED0] border border-[#FFC7AF]"></div>

        <div className="flex relative z-2 items-center justify-center gap-10 p-10 flex-col sm:min-w-[534px] max-w-[330px] rounded-[16px] bg-[#FFF9F8] border border-[#E5E5E5]">
          <div className="flex items-center flex-col gap-2">
            <Image
              className="w-15 h-15 rounded"
              src={bitcoinImg}
              alt="bitcon"
            />
            <h3 className="font-onest text-[14px] font-light text-[#131313]">
              Coffee Shop
            </h3>
            <h3 className="flex items-center font-onest text-[12px] font-light text-[#131313]">
              <span className="text-primary font-onest font-bold text-[24px]">
                $10.50
              </span>
              (USDC)
            </h3>
            <p className="font-onest text-[16px] text-center font-light max-w-[285px]">
              Almost there! Just a couple of details to complete your payment.
            </p>
          </div>

          <form className="space-y-6 w-full">
            <div>
              <label
                htmlFor="name"
                className="block font-light text-[14px] font-onest text-[#131313] mb-2"
              >
                What is your name?
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full p-3 border font-onest border-[#E5E5E5] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:font-onest "
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-light text-[14px] font-onest text-[#131313] mb-2"
              >
                What is your email?
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border font-onest border-[#E5E5E5] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:font-onest "
              />
            </div>

            <div className="flex items-center justify-center">
              <Button variant="normal" size="normal" type="submit">
                Proceed to Payments
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Pay;
