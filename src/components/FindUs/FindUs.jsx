import React from "react";

export default function FindUs() {
  return (
    <section id="find-us" className="find-us bg-black text-white text-center px-5 py-14 sm:py-16 md:px-[6%] md:py-20 lg:py-24">
      <h2 className="find-title font-clash font-semibold text-white mb-3 text-[2.1rem] sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3.1rem] find-title-wrap inline-block">
        Find <span className="text-brand-yellow italic relative font-clash find-title-underline">TAP Podcast</span> On
      </h2>

      <p className="find-sub text-gray-400 font-clash font-medium text-sm sm:text-base md:text-[1.05rem] max-w-xl mx-auto mb-8 sm:mb-10 px-4 leading-relaxed">
        आमच्याशी सोशल मीडियावर जोडा आणि प्रत्येक नवीन भागाची अपडेट मिळवा
      </p>

      <div className="social-buttons flex justify-center items-center gap-3 sm:gap-4 md:gap-5 flex-wrap max-w-2xl mx-auto">
        <a
          href="https://www.instagram.com/tap_podccast"
          target="_blank"
          className="social-btn group flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 border-[1.5px] border-white text-white rounded-lg bg-transparent relative overflow-hidden transition-all duration-300 font-clash font-medium text-sm sm:text-[15px] md:text-base w-full sm:w-auto hover:text-black"
          rel="noopener noreferrer"
        >
          <span className="relative z-[1]">Instagram</span>
          <img
            src="/image/instagram.png"
            alt="Instagram"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 invert relative z-[1] transition-all duration-300 group-hover:invert-0"
          />
        </a>

        <a
          href="https://www.youtube.com/@PodcastTAP"
          target="_blank"
          className="social-btn group flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 border-[1.5px] border-white text-white rounded-lg bg-transparent relative overflow-hidden transition-all duration-300 font-clash font-medium text-sm sm:text-[15px] md:text-base w-full sm:w-auto hover:text-black"
          rel="noopener noreferrer"
        >
          <span className="relative z-[1]">YouTube</span>
          <img
            src="/image/youtube.png"
            alt="YouTube"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 invert relative z-[1] transition-all duration-300 group-hover:invert-0"
          />
        </a>

        <a
          href="https://www.linkedin.com/in/tap-podcast-the-amit-parwe-podcast-7a4089303"
          target="_blank"
          className="social-btn group flex items-center justify-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 border-[1.5px] border-white text-white rounded-lg bg-transparent relative overflow-hidden transition-all duration-300 font-clash font-medium text-sm sm:text-[15px] md:text-base w-full sm:w-auto hover:text-black"
          rel="noopener noreferrer"
        >
          <span className="relative z-[1]">LinkedIn</span>
          <img
            src="/image/linkedin (1).png"
            alt="LinkedIn"
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 invert relative z-[1] transition-all duration-300 group-hover:invert-0"
          />
        </a>
      </div>
    </section>
  );
}
