import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const navbar = navRef.current;
    const homeSection = document.querySelector("#home");

    if (navbar && homeSection) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navbar.classList.remove("hide-nav");
            } else {
              navbar.classList.add("hide-nav");
            }
          });
        },
        { threshold: 0.35 }
      );

      navObserver.observe(homeSection);

      return () => {
        navObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const navtl = gsap.timeline();

      if (logoRef.current) {
        navtl.fromTo(
          logoRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.5, ease: "power3.out" }
        );
      }

      if (linksRef.current) {
        const anchors = linksRef.current.querySelectorAll("a");
        navtl.fromTo(
          anchors,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1, stagger: 0.1, ease: "power3.out" },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar navbar-transition absolute top-0 left-0 w-full px-5 py-4 md:px-8 lg:px-[6%] lg:py-5 flex justify-between items-center z-10"
    >
      <div ref={logoRef} className="logo opacity-0">
        <img
          src="/image/titlelogo.png"
          alt="Logo"
          className="w-[90px] sm:w-[100px] md:w-[110px] lg:w-[120px] select-none pointer-events-none"
        />
      </div>

      <div
        ref={linksRef}
        className="nav-links hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 font-poppins font-normal text-[15px] lg:text-[16px]"
      >
        <a
          href="#home"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          Home
        </a>
        <a
          href="https://youtube.com/playlist?list=PL4wMmWi7LEFwBvgviQGUsfYFz1l-QHZ2C&si=LR4rANREvcP0BDy9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          Episodes
        </a>
        <a
          href="#about"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          About Us
        </a>
        <a
          href="#channels"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          Our Channels
        </a>
        <a
          href="#team"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          Our Team
        </a>

        
        <a
          href="#upcoming-guest"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          Speak Up
        </a>
        <a
          href="#contact"
          className="text-white transition-all duration-300 whitespace-nowrap hover:text-[#8b8a8a] hover:-translate-y-1 opacity-0"
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
}
