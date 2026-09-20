import React, { useState } from "react";
import { teamData } from "../../data/teamData";

export default function Team() {
  const [current, setCurrent] = useState(0);
  const [activeMember, setActiveMember] = useState(null);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % teamData.length);

    // Reset opened member when changing slide
    setActiveMember(null);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + teamData.length) % teamData.length);

    // Reset opened member when changing slide
    setActiveMember(null);
  };

  const handleMemberClick = (memberIndex) => {
    // Only use click behavior for tablet/mobile
    if (window.innerWidth <= 1024) {
      setActiveMember((prev) =>
        prev === memberIndex ? null : memberIndex
      );
    }
  };

  return (
    <section
      id="team"
      className="team relative h-[75vh] sm:h-[80vh] md:h-[85vh] lg:h-[88vh] xl:h-[90vh] w-full bg-white overflow-hidden flex"
    >
      {/* ================= TEAM HEADER ================= */}
      <div className="team-header absolute top-5 left-5 sm:top-7 sm:left-8 md:top-8 md:left-12 lg:top-10 lg:left-16 text-white leading-none z-[5] font-poppins font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[46px] select-none drop-shadow-md">
        <h2>
          our <br /> team.
        </h2>
      </div>

      {/* ================= ARROWS ================= */}
      <div className="team-arrows static">
        {/* PREVIOUS */}
        <button
          id="teamPrev"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 md:left-4 flex items-center justify-center bg-white/95 hover:bg-white text-black cursor-pointer z-20 transition-all duration-200 hover:scale-110 shadow-lg rounded-sm w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 text-xl sm:text-2xl md:text-3xl font-light select-none"
        >
          ‹
        </button>

        {/* NEXT */}
        <button
          id="teamNext"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 md:right-4 flex items-center justify-center bg-white/95 hover:bg-white text-black cursor-pointer z-20 transition-all duration-200 hover:scale-110 shadow-lg rounded-sm w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 text-xl sm:text-2xl md:text-3xl font-light select-none"
        >
          ›
        </button>
      </div>

      {/* ================= SLIDER ================= */}
      <div className="team-slider w-full h-full relative">
        {teamData.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`team-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              slideIndex === current
                ? "opacity-100 z-[2] pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* ================= TEAM GRID ================= */}
            <div className="team-grid h-full w-full grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 p-2.5 sm:p-3 md:p-3.5 lg:p-4">
              {slide.members.map((member, memberIndex) => {
                const isActive = activeMember === memberIndex;

                return (
                  <div
                    key={memberIndex}
                    id={member.idAttr || undefined}
                    onClick={() => handleMemberClick(memberIndex)}
                    className={`card team-card relative overflow-hidden bg-black [isolation:isolate] cursor-pointer group rounded-lg ${
                      isActive ? "member-active" : ""
                    }`}
                  >
                    {/* ================= IMAGE ================= */}
                    <img
                      src={member.img}
                      alt={member.name}
                      className="
                        absolute inset-0
                        w-full h-full
                        object-cover object-top
                        -z-0
                        transition-all duration-500
                        group-hover:scale-[1.05]
                        group-hover:brightness-[0.7]
                      "
                    />

                    {/* ================= DARK OVERLAY ================= */}
                    <div
                      className={`
                        absolute inset-0
                        z-[1]
                        bg-gradient-to-t
                        from-black/90
                        via-black/20
                        to-transparent
                        transition-opacity duration-300

                        opacity-0
                        group-hover:opacity-100

                        ${
                          isActive
                            ? "opacity-100"
                            : ""
                        }
                      `}
                    />

                    {/* ================= MEMBER INFO ================= */}
                    <div
                      className={`
                        absolute
                        bottom-4
                        sm:bottom-6
                        md:bottom-7
                        left-1/2
                        -translate-x-1/2

                        text-center
                        text-white
                        z-[3]

                        w-full
                        px-3
                        
                        opacity-0
                        translate-y-7

                        group-hover:opacity-100
                        group-hover:translate-y-0

                        ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : ""
                        }

                        transition-all duration-300
                        pointer-events-none
                      `}
                    >
                      {/* NAME */}
                      <h3
                        className="
                          font-funnel
                          font-bold
                          leading-none
                          text-white
                          mx-auto

                          text-xl
                          sm:text-2xl
                          md:text-3xl
                          lg:text-[2.5rem]
                          xl:text-[2.75rem]

                          mb-3
                        "
                      >
                        {member.name}
                      </h3>

                      {/* ROLE */}
                      <p
                        className="
                          font-funnel
                          font-normal
                          text-gray-200

                          text-[10px]
                          sm:text-xs
                          md:text-sm
                          lg:text-[15px]
                          mb-5
                          leading-tight
                          opacity-90
                        "
                      >
                        {member.role}

                        {member.subrole && (
                          <>
                            <br />
                            {member.subrole}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}