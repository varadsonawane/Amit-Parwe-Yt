import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MobileMenu() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(
        ".bart1",
        {
          opacity: 0,
          duration: 0.2,
          pointerEvents: "none",
        },
        0
      );

      tl.to(".bart2", {
        top: 0,
        duration: 0.5,
      });

      tl.from(".bart2 a", {
        opacity: 0,
        top: 150,
        duration: 0.5,
        stagger: 0.2,
      });

      tl.from(".bart2 i", {
        opacity: 0,
      });

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    timelineRef.current?.play();
  };

  const handleClose = () => {
    timelineRef.current?.reverse();
  };

  return (
    <div id="menut1" ref={containerRef} className="md:hidden fixed top-0 left-0 w-full h-0 z-[99999]">
      <div
        className="bart1 fixed top-5 right-5 text-white z-[100000] cursor-pointer pointer-events-auto"
        onClick={handleOpen}
      >
        <i className="ri-menu-3-line text-[28px]"></i>
      </div>

      <div className="bart2 fixed -top-full left-0 w-full h-[60%] bg-black/75 backdrop-blur-md flex flex-col justify-center items-center gap-5 sm:gap-6 z-[99998]">
        <a
          href="#home"
          onClick={handleClose}
          className="text-white flex justify-center items-center gap-2 font-funnel font-light text-2xl sm:text-3xl leading-none transition-colors hover:text-brand-yellow"
        >
          Home
        </a>
        <a
          href="https://youtube.com/playlist?list=PL4wMmWi7LEFwBvgviQGUsfYFz1l-QHZ2C&si=LR4rANREvcP0BDy9"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          className="text-white flex justify-center items-center gap-2 font-funnel font-light text-2xl sm:text-3xl leading-none transition-colors hover:text-brand-yellow"
        >
          Episodes
        </a>
        <a
          href="#about"
          onClick={handleClose}
          className="text-white flex justify-center items-center gap-2 font-funnel font-light text-2xl sm:text-3xl leading-none transition-colors hover:text-brand-yellow"
        >
          About Us
        </a>
        <a
          href="#channels"
          onClick={handleClose}
          className="text-white flex justify-center items-center gap-2 font-funnel font-light text-2xl sm:text-3xl leading-none transition-colors hover:text-brand-yellow"
        >
          Our Channels
        </a>
        <a
          href="#team"
          onClick={handleClose}
          className="text-white flex justify-center items-center gap-2 font-funnel font-light text-2xl sm:text-3xl leading-none transition-colors hover:text-brand-yellow"
        >
          Our Team
        </a>
        <a
          href="#contact"
          onClick={handleClose}
          className="text-white flex justify-center items-center gap-2 font-funnel font-light text-2xl sm:text-3xl leading-none transition-colors hover:text-brand-yellow"
        >
          Contact Us
        </a>

        <i
          className="ri-close-large-fill absolute p-1.5 text-base top-[5%] right-[5%] cursor-pointer rounded-full bg-white/70 text-black z-[99999] hover:bg-white"
          onClick={handleClose}
        ></i>
      </div>
    </div>
  );
}
