import React from "react";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="footer bg-[#0a0a0a] text-gray-300 px-5 pt-12 pb-7 sm:pt-16 sm:pb-8 md:px-[6%] lg:px-[7%] xl:px-[8%] font-manrope">
      <div className="footer-top flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16 flex-wrap text-center md:text-left">
        {/* BRAND */}
        <div className="footer-brand flex-1 min-w-[240px]">
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-4xl lg:text-[44px] mb-2.5 leading-tight">
            TAP Podcast
          </h2>
          <p className="text-gray-400 font-semibold text-sm sm:text-base leading-relaxed mb-4 max-w-xs mx-auto md:mx-0">
            ज्ञान, अनुभव आणि विचारांना दिशा देणारा संवाद.
          </p>
          <a
            href="mailto:tapthepodcast@gmail.com"
            className="footer-mail inline-block text-brand-yellow font-bold text-base sm:text-lg md:text-xl border-b border-transparent hover:border-brand-yellow transition-all duration-200"
          >
            tapthepodcast@gmail.com
          </a>
          <h1 className="topgo mt-4 sm:mt-6 text-gray-500 hover:text-white font-manrope text-base sm:text-lg md:text-xl cursor-pointer transition-colors justify-center md:justify-start flex">
            <a href="#home" onClick={scrollToTop}>
              Back to Top ↑
            </a>
          </h1>
          <a href="#home" onClick={scrollToTop}>
            <img
              src="/image/logomic.png"
              className="gotop fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full cursor-pointer flex justify-center items-center z-[1000] transition-transform duration-300 hover:-translate-y-1 drop-shadow-xl select-none"
              alt="Go to top"
            />
          </a>
        </div>

        {/* NAV LINKS */}
        <div className="footer-links flex flex-col gap-2 font-bold text-sm sm:text-[15px] md:text-base items-center md:items-start">
          <h4 className="text-white font-extrabold text-lg sm:text-xl md:text-2xl mb-1.5 md:mb-2">
            Explore
          </h4>
          <a href="#home" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1">
            Home
          </a>
          <a href="#episodes" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1">
            Episodes
          </a>
          <a href="#about" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1">
            About Us
          </a>
          <a href="#channels" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1">
            Our Channels
          </a>
          <a href="#team" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1">
            Our Team
          </a>
          <a href="#contact" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1">
            Contact Us
          </a>
        </div>

        {/* SOCIAL */}
        <div className="footer-social flex flex-col gap-2 font-bold text-sm sm:text-[15px] md:text-base items-center md:items-start">
          <h4 className="text-white font-extrabold text-lg sm:text-xl md:text-2xl mb-1.5 md:mb-2">
            Follow
          </h4>
          <a
            href="https://www.youtube.com/@PodcastTAP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1"
          >
            &gt;YouTube
          </a>
          <a
            href="https://www.instagram.com/tap_podccast"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1"
          >
            &gt;Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/tap-podcast-the-amit-parwe-podcast-7a4089303"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1"
          >
            &gt;Linkedin
          </a>
        </div>
      </div>

      <div className="footer-bottom border-t border-[#222] mt-10 sm:mt-12 pt-5 text-center text-xs sm:text-sm text-gray-500 font-semibold">
        <p>© 2026 TAP Podcast. All rights reserved.</p>
      </div>
    </footer>
  );
}
