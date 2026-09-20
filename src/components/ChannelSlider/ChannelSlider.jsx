import React, { useState } from "react";
import { channelsData } from "../../data/channelsData";

export default function ChannelSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);
  const [textClass, setTextClass] = useState("active");

  const changeSlide = (newIndex) => {
    if (animating || newIndex === currentIndex) return;

    setAnimating(true);
    setPrevIndex(currentIndex);
    setTextClass("text-exit");

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTextClass("text-enter");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTextClass("text-enter active");
        });
      });
    }, 200);

    setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
      setTextClass("active");
    }, 600);
  };

  const handleNext = () => {
    changeSlide((currentIndex + 1) % channelsData.length);
  };

  const handlePrev = () => {
    changeSlide(
      (currentIndex - 1 + channelsData.length) % channelsData.length
    );
  };

  const currentChannel = channelsData[currentIndex];

  return (
    <section
      id="channels"
      className="channel-slider relative min-h-screen lg:h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-5 py-12 sm:py-16 md:px-[6%] lg:px-[7%] lg:py-16 overflow-hidden"
    >
      {/* ================= TITLE ================= */}
      <h1 className="titleleft font-poppins font-medium text-black leading-tight mb-6 lg:mb-0 lg:absolute lg:top-20 xl:top-24 lg:left-[7%] text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] text-center lg:text-left select-none">
        OUR <br className="hidden lg:inline" /> CHANNELS..
      </h1>

      {/* ================= LEFT CONTENT ================= */}
      <div className="slider-left w-full lg:w-[48%] xl:w-[45%] text-center lg:text-left z-[2] lg:mt-28 xl:mt-32">
        {/* CHANNEL NAME */}
        <h2
          id="channelName"
          className={`font-staatliches font-normal text-black leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] mb-2 select-none ${textClass}`}
        >
          {currentChannel.name}
        </h2>

        {/* DESCRIPTION */}
        {currentChannel.desc && (
          <p
            id="channelDesc"
            className={`desc font-funnel font-normal text-gray-800 text-sm sm:text-base md:text-lg lg:text-[1.1rem] leading-relaxed my-1 ${textClass}`}
          >
            {currentChannel.desc}
          </p>
        )}

        {currentChannel.desc2 && (
          <p
            id="channelDesc2"
            className={`desc font-funnel font-normal text-gray-800 text-sm sm:text-base md:text-lg lg:text-[1.1rem] leading-relaxed my-1 ${textClass}`}
          >
            {currentChannel.desc2}
          </p>
        )}

        {/* ================= SOCIAL BUTTONS ================= */}
        <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
          {/* YOUTUBE */}
          {currentChannel.link && currentChannel.desc && (
            <a
              id="channelLink"
              href={currentChannel.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-[#ff0000] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-funnel font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${textClass}`}
            >
              {/* YouTube Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
              </svg>

              YOUTUBE CHANNEL
            </a>
          )}

          {/* INSTAGRAM */}
          {currentChannel.link2 && currentChannel.desc2 && (
            <a
              id="channelLink2"
              href={currentChannel.link2}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-funnel font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${textClass}`}
            >
              {/* Instagram Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>

              INSTAGRAM PROFILE
            </a>
          )}
        </div>

        {/* ================= SLIDER CONTROLS ================= */}
        <div className="slider-buttons inline-flex gap-3 sm:gap-4 mt-7 justify-center lg:justify-start">
          {/* PREVIOUS */}
          <button
            id="prevBtn"
            onClick={handlePrev}
            aria-label="Previous channel"
            className="
              group
              flex flex-col
              items-center
              justify-center
              gap-1
              w-14 h-16
              sm:w-16 sm:h-[72px]
              rounded-lg
              border
              border-black/20
              bg-transparent
              text-black
              cursor-pointer
              transition-all duration-300
              hover:bg-black
              hover:text-white
              hover:border-black
              hover:-translate-y-1
            "
          >
            {/* Left Chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>

            <span className="font-funnel text-[10px] sm:text-xs font-medium">
              Prev
            </span>
          </button>

          {/* NEXT */}
          <button
            id="nextBtn"
            onClick={handleNext}
            aria-label="Next channel"
            className="
              group
              flex flex-col
              items-center
              justify-center
              gap-1
              w-14 h-16
              sm:w-16 sm:h-[72px]
              rounded-lg
              border
              border-black/20
              bg-transparent
              text-black
              cursor-pointer
              transition-all duration-300
              hover:bg-black
              hover:text-white
              hover:border-black
              hover:-translate-y-1
            "
          >
            {/* Right Chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>

            <span className="font-funnel text-[10px] sm:text-xs font-medium">
              Next
            </span>
          </button>
        </div>
      </div>

      {/* ================= RIGHT IMAGE ================= */}
      <div className="slider-right relative w-full lg:w-[48%] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] xl:h-[520px] flex justify-center items-center mt-6 lg:mt-0">
        {/* PREVIOUS IMAGE */}
        {prevIndex !== null && (
          <img
            src={channelsData[prevIndex].img}
            alt="Previous Host"
            className="slide-out absolute w-[240px] sm:w-[320px] md:w-[380px] lg:w-[450px] xl:w-[490px] object-cover rounded-xl shadow-2xl"
          />
        )}

        {/* CURRENT IMAGE */}
        <img
          id="hostImage"
          key={currentIndex}
          src={currentChannel.img}
          alt={currentChannel.name}
          className={`absolute w-[240px] sm:w-[320px] md:w-[380px] lg:w-[450px] xl:w-[490px] object-cover rounded-xl shadow-2xl transition-all duration-300 hover:brightness-75 ${
            prevIndex !== null ? "slide-in active" : "active"
          }`}
        />
      </div>
    </section>
  );
}