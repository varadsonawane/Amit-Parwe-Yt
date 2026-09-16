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
    changeSlide((currentIndex - 1 + channelsData.length) % channelsData.length);
  };

  const currentChannel = channelsData[currentIndex];

  return (
    <section
      id="channels"
      className="channel-slider relative min-h-screen lg:h-screen bg-white flex flex-col lg:flex-row items-center justify-between px-5 py-12 sm:py-16 md:px-[6%] lg:px-[7%] lg:py-16 overflow-hidden"
    >
      <h1 className="titleleft font-poppins font-medium text-black leading-tight mb-6 lg:mb-0 lg:absolute lg:top-20 xl:top-24 lg:left-[7%] text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] text-center lg:text-left select-none">
        OUR <br className="hidden lg:inline" /> CHANNELS..
      </h1>

      {/* LEFT CONTENT */}
      <div className="slider-left w-full lg:w-[48%] xl:w-[45%] text-center lg:text-left z-[2] lg:mt-28 xl:mt-32">
        <h2
          id="channelName"
          className={`font-staatliches font-normal text-black leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] mb-2 select-none ${textClass}`}
        >
          {currentChannel.name}
        </h2>

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

        <div className="mt-4 flex flex-wrap gap-2.5 justify-center lg:justify-start">
          {currentChannel.link && currentChannel.desc && (
            <a
              id="channelLink"
              href={currentChannel.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`desc inline-block font-funnel font-bold text-black border border-black px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm md:text-base rounded hover:bg-black hover:text-white transition-colors duration-300 shadow-sm ${textClass}`}
            >
              YOUTUBE
            </a>
          )}

          {currentChannel.link2 && currentChannel.desc2 && (
            <a
              id="channelLink2"
              href={currentChannel.link2}
              target="_blank"
              rel="noopener noreferrer"
              className={`desc inline-block font-funnel font-bold text-black border border-black px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm md:text-base rounded hover:bg-black hover:text-white transition-colors duration-300 shadow-sm ${textClass}`}
            >
              INSTAGRAM
            </a>
          )}
        </div>

        <div className="slider-buttons inline-flex gap-3 sm:gap-4 mt-6 justify-center lg:justify-start">
          <button
            id="prevBtn"
            onClick={handlePrev}
            className="font-funnel font-medium text-black border-[1.5px] border-black px-5 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm md:text-base bg-transparent cursor-pointer rounded hover:bg-black hover:text-white transition-colors duration-300"
          >
            Prev
          </button>
          <button
            id="nextBtn"
            onClick={handleNext}
            className="font-funnel font-medium text-black border-[1.5px] border-black px-5 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm md:text-base bg-transparent cursor-pointer rounded hover:bg-black hover:text-white transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="slider-right relative w-full lg:w-[48%] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] xl:h-[520px] flex justify-center items-center mt-6 lg:mt-0">
        {prevIndex !== null && (
          <img
            src={channelsData[prevIndex].img}
            alt="Previous Host"
            className="slide-out absolute w-[240px] sm:w-[320px] md:w-[380px] lg:w-[450px] xl:w-[490px] object-cover rounded-xl shadow-2xl"
          />
        )}
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
