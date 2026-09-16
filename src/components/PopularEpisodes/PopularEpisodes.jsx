import React from "react";
import { episodesData } from "../../data/episodesData";

export default function PopularEpisodes() {
  const allEpisodes = [...episodesData, ...episodesData];

  return (
    <section id="episodes" className="video-marquee bg-black py-10 sm:py-12 md:py-14 lg:py-16 overflow-hidden">
      <h2 className="marquee-title text-white text-center font-clash font-semibold text-xl sm:text-2xl md:text-[1.85rem] lg:text-[2.1rem] mb-6 sm:mb-8 select-none">
        Popular Episodes
      </h2>

      <div className="marquee w-full overflow-hidden">
        <div className="marquee-track flex gap-4 sm:gap-6 md:gap-7 w-max animate-scroll-marquee hover:[animation-play-state:paused]">
          {allEpisodes.map((ep, index) => (
            <a
              key={index}
              href={ep.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block shrink-0"
            >
              <img
                src={ep.thumb}
                alt={`Episode thumbnail ${(index % 6) + 1}`}
                className="h-[105px] sm:h-[125px] md:h-[145px] lg:h-[155px] xl:h-[160px] rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.06] hover:brightness-110 shadow-lg object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
