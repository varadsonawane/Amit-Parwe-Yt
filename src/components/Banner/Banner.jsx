import React from "react";

const guestImages = [
  "/guest/DSC00005.JPG",
  "/guest/DSC00007.JPG",
  "/guest/DSC03110.JPG",
  "/guest/DSC03143.JPG",
  "/guest/DSC03188.JPG",
  "/guest/DSC03230.JPG",
];

export default function Banner() {
  const duplicatedImages = [...guestImages, ...guestImages];

  return (
    <section
      id="banner"
      className="banner relative w-full h-[52vh] sm:h-[56vh] md:h-[58vh] lg:h-[62vh] xl:h-[64vh] flex justify-center items-center overflow-hidden bg-white"
    >
      <div className="banner-bg absolute inset-0 overflow-hidden z-0">
        <div className="bg-track flex h-full w-max animate-banner-move" id="bgTrack">
          {duplicatedImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Guest ${index + 1}`}
              className="h-full object-cover shrink-0 brightness-[0.55]"
            />
          ))}
        </div>
      </div>

      <img
        src="/image/logomic.png"
        className="banner-logo absolute flex justify-center items-center top-22 sm:top-8 md:top-8 lg:top-2 w-8 sm:w-10 md:w-12 lg:w-12 h-auto z-[2] opacity-90"
        alt="TAP Podcast Logo"
      />

      <h1 className="absolute inset-0 w-full h-full bg-[#e0dede] font-anton font-normal text-black mix-blend-screen leading-none flex text-center justify-center items-center z-[1] select-none text-[6.6rem] sm:text-[8rem] md:text-[12rem] lg:text-[14rem] xl:text-[18rem]">
        AMIT 
        PARWE
      </h1>
      {/* <h3 className="absolute inset-0 w-full h-full text-[#414040] font-anton font-normal flex justify-center items-center z-[1] select-none text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] pt-52 sm:pt-56 md:pt-60 lg:pt-100">
        PODCAST
      </h3> */}
    </section>
  );
}
