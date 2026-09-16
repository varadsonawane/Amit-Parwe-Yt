import React from "react";

export default function ScrollText() {
  return (
    <div className="scroll-text absolute bottom-10 sm:bottom-12 md:bottom-10 w-full overflow-hidden whitespace-nowrap z-0 font-clash pointer-events-none" id="homescrollv15">
      <div className="scroll-wrapper flex w-max animate-scroll-right -mb-2.5">
        <h2 className="font-black tracking-[0.08em]  text-[2.6rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] stroke-hero mr-8 sm:mr-12 select-none">
          FOUNDER | CREATOR | AUTHOR | HOST | PODCASTER | MUSIC COMPOSER |{" "}
        </h2>
        <h2 className="font-black tracking-[0.08em]  text-[2.6rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] stroke-hero mr-8 sm:mr-12 select-none">
          FOUNDER | CREATOR | AUTHOR | HOST | PODCASTER | MUSIC COMPOSER |
        </h2>
      </div>
    </div>
  );
}
