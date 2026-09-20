import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollText from "./ScrollText";
import StatsTicker from "./StatsTicker";
import TextType from "./TextType";


export default function Hero() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroContentRef.current) {
        gsap.from(heroContentRef.current, {
          y: 20,
          scale: 0,
          opacity: 0,
          duration: 2,
          delay: 0.5,
          ease: "power3.out",
        });
      }

      gsap.from("#homescrollv15", {
        y: 100,
        opacity: 0,
        ease: "none",
        duration: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
className="hero relative isolate h-screen w-full overflow-hidden flex justify-center items-center text-center text-white"    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="bg-video absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-full h-full object-cover -z-20"
        poster="/image/hero-poster.webp"
      >
        <source src="/video/Hostbg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="overlay absolute inset-0 w-full h-full bg-black/80 -z-10"></div>

      {/* Hero Content */}
      <div
        ref={heroContentRef}
        className="hero-content z-10 max-w-[92%] sm:max-w-[580px] md:max-w-[660px] lg:max-w-[700px] flex flex-col items-center font-semibold px-4 pt-8 md:pt-0"
      >
       <h1 className=" font-Plus Jakarta Sans font-black tracking-tight leading-[1.1] mb-2.5 text-[34px] sm:text-[42px] md:text-[52px] md:whitespace-nowrap lg:text-[58px] lg:whitespace-nowrap xl:text-[62px]">
  <TextType
    text={[
      "LevelUp with",
     
    ]}
    typingSpeed={80}
    deletingSpeed={50}
    pauseDuration={1200}
    showCursor={false}
    className="inline text-3xl"
  />

  {" "}

  <span className="text-brand-yellow-hero font-playfair">
    <br/>Amit Parwe
  </span>
</h1>
        <p className="font-hind font-medium text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] lg:text-[1rem] text-gray-200 mb-6 sm:mb-7 px-2">
          “विचार आणि आयुष्य उंचावणारं एकमेव लोकप्रिय मराठी पॉडकास्ट चॅनेल”
        </p>

        <div className="btn flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
          <a
            href="https://www.youtube.com/@AmitParweOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="btn1 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3 bg-brand-yellow text-black font-clash font-semibold text-[14px] sm:text-[15px] md:text-[16px] rounded transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff740] shadow-md"
            id="btn-1"
          >
            <span className="btn-text">LISTEN TO PODCAST</span>
            <img src="/image/mic.png" alt="Mic" className="mic-icon w-4 h-4 object-contain -mb-0.5" />
          </a>
          <a
            href="#contact"
            className="btn2 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3 bg-white text-black font-clash font-semibold text-[14px] sm:text-[15px] md:text-[16px] rounded transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 shadow-md"
            id="btn-2"
          >
            <span className="btn-text2">BECOME A GUEST</span>
            <img
              src="/image/traveller_10930467.png"
              alt="guest"
              className="guest-icon w-5 h-5 object-contain -mb-1"
            />
          </a>
        </div>
      </div>

      <ScrollText />
      <StatsTicker />
    </section>
  );
}
