import React from "react";
import { statsData } from "../../data/statsData";

export default function StatsTicker() {
  return (
    <div className="stats-ticker absolute bottom-[90px] w-full overflow-hidden py-6 sm:py-10 md:py-14 lg:py-16 z-0">
      <div className="stats-track flex w-max animate-scroll-left gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        {statsData.map((item, index) => (
          <h2
            key={index}
            className="font-extrabold whitespace-nowrap font-sans text-white text-center text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem] lg:text-[1.60rem] leading-snug select-none mr-6 sm:mr-10 md:mr-14"
          >
            {item.value} <br /> {item.label}
          </h2>
        ))}
      </div>
    </div>
  );
}
