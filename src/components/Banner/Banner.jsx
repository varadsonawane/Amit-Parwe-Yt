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
      {/* ================= BACKGROUND ================= */}
      <div className="banner-bg absolute inset-0 overflow-hidden z-0">
        <div
          className="bg-track flex h-full w-max animate-banner-move"
          id="bgTrack"
        >
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

      {/* ================= LOGO ================= */}
      <img
        src="/image/logomic.png"
        className="banner-logo absolute flex justify-center items-center top-22 sm:top-8 md:top-8 lg:top-2 w-8 sm:w-10 md:w-12 lg:w-12 h-auto z-[2] opacity-90"
        alt="Amit Parwe Logo"
      />

      {/* ================= TITLE ================= */}
      <div
        className="
          absolute
          inset-0
          w-full
          h-full
          bg-[#e0dede]
          mix-blend-screen
          z-[1]
          select-none
          flex
          flex-col
          justify-center
          items-center
          text-center
        "
      >
        {/* LEVEL UP WITH */}
        <span
          className="
            font-poppins
            font-bold
            text-black
            leading-none
            mb-2
            sm:mb-3
            md:mb-4
            text-lg
            sm:text-xl
            md:text-2xl
            lg:text-3xl
            xl:text-4xl
            tracking-[0.01em]
          "
        >
          Level Up with
        </span>

        {/* AMIT PARWE */}
        <h1
          className="
            w-full
            font-anton
            font-normal
            text-black
            leading-none
            flex
            justify-center
            items-center
            text-center
            text-[5rem]
            sm:text-[7rem]
            md:text-[10rem]
            lg:text-[14rem]
            xl:text-[18rem]
          "
        >
          AMIT PARWE
        </h1>
      </div>

      {/* Optional subtitle */}
      {/* 
      <h3
        className="
          absolute
          inset-0
          w-full
          h-full
          text-[#414040]
          font-anton
          font-normal
          flex
          justify-center
          items-center
          z-[1]
          select-none
          text-xl
          sm:text-2xl
          md:text-3xl
          lg:text-[2.2rem]
          pt-52
          sm:pt-56
          md:pt-60
          lg:pt-100
        "
      >
        PODCAST
      </h3>
      */}
    </section>
  );
}