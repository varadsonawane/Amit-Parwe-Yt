import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHost() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger scale animation
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: "top -100%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.35 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

const handleMouseMove = (e) => {
  if (window.innerWidth <= 768 || !cardRef.current || !imgRef.current) {
    return;
  }

  const rect = cardRef.current.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const moveX = (x - rect.width / 2) / 25;
  const moveY = (y - rect.height / 2) / 25;

  imgRef.current.style.transform = `
    translate(${moveX}px, ${moveY}px)
    scale(1.06)
    rotateY(${moveX / 2}deg)
    rotateX(${-moveY / 2}deg)
  `;
};

const handleMouseLeave = () => {
  if (imgRef.current) {
    imgRef.current.style.transform =
      "translate(0, 0) scale(1) rotateY(0deg) rotateX(0deg)";
  }
};

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-host reveal-section bg-black text-white px-5 py-16 sm:py-20 md:px-[6%] lg:px-[7%] xl:px-[8%] lg:py-20 xl:py-24 min-h-screen flex items-center overflow-hidden"
    >
      <div
        ref={containerRef}
        className="host-container w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-16 xl:gap-20 max-w-7xl mx-auto"
      >
        {/* LEFT CONTENT */}
        <div
          ref={leftRef}
          className="host-left reveal-left flex-1 order-2 md:order-1 text-center md:text-left md:ml-4 lg:ml-8 xl:ml-10"
        >
          <h3 className="font-playfair font-bold text-xl sm:text-2xl md:text-2xl lg:text-[1.65rem] text-white">
            Our host
          </h3>
          <h2 className="font-playfair font-bold italic text-brand-yellow text-3xl sm:text-4xl md:text-[2.4rem] lg:text-[2.75rem] mb-3 md:mb-4">
            The Amit Parwe
          </h2>

          <div className="divider w-10 h-[3px] bg-white my-3.5 sm:my-4 mx-auto md:mx-0"></div>

          <p className="font-sans text-gray-300 font-semibold text-[0.92rem] sm:text-base md:text-[1rem] lg:text-[1.05rem] leading-relaxed sm:leading-loose mb-6 max-w-2xl">
            होस्ट अमित पारवे हे इंजिनियर, म्युझिक कंपोझर, गायक, लेखक आणि उद्योजक आहेत. मनाने ते एक शोधक,
            विचारवंत आणि जिज्ञासू प्रवृत्तीचे व्यक्तिमत्व आहेत. अज्ञात गोष्टींचा शोध घेणे, धर्म आणि विज्ञान
            यामधील सूक्ष्म दुवे उलगडणे आणि त्यामागील सत्य समजून घेणे, ही त्यांची खास ओढ आहे. ज्ञान, अनुभव आणि
            तर्क यांच्या आधारे ते श्रोत्यांसमोर असे संवाद आणि प्रश्न मांडतात जे फक्त माहिती देत नाहीत, तर
            विचारांना चालना देतात आणि मनाला स्पर्श करतात. तुमच्या-आमच्या मनातले प्रश्न उचलून त्यांना नव्या
            दृष्टिकोनातून पाहण्याचा प्रयत्न हा त्यांच्या प्रत्येक संवादामागचा हेतू असतो. त्यांच्या या प्रवासाचा
            मुख्य उद्देश म्हणजे विज्ञान, अध्यात्म आणि वास्तव, आर्थिक साक्षरता, समाज कल्याण, इतिहास आणि
            नाविन्यपूर्ण माहिती मायबोली मराठीतून महाराष्ट्रातील तमाम घराघरात पोहोचवणे.
          </p>

          <a
            href="#"
            className="host-link inline-block text-brand-yellow font-clash font-semibold text-sm sm:text-base border-b-2 border-brand-yellow pb-0.5 hover:translate-y-1 transition-transform"
          >
            MY LIFE JOURNEY ↗
          </a>
        </div>

       {/* RIGHT IMAGE */}
<div
  ref={cardRef}
  className="host-right reveal-right order-1 md:order-2 flex-1 flex justify-center [perspective:900px]"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  <div className="relative w-[230px] sm:w-[280px] md:w-[330px] lg:w-[380px] xl:w-[410px] overflow-hidden rounded-xl group">

    {/* IMAGE */}
    <img
      ref={imgRef}
      src="/image/hostimage.png"
      alt="Amit Parwe"
      className="block w-full h-auto rounded-xl shadow-2xl transition-transform duration-150 ease-out will-change-transform"
    />

    {/* HOVER OVERLAY */}
    <div
      className="
        absolute inset-0
        flex items-end justify-start
        rounded-xl
        bg-gradient-to-t from-black/90 via-black/30 to-transparent
        p-4 sm:p-5 md:p-6
        opacity-0
        transition-opacity duration-300
        group-hover:opacity-100
      "
    >
      <h3
        className="
          font-clash font-semibold text-white tracking-wide
          text-2xl sm:text-3xl md:text-3xl lg:text-[2.2rem]
          translate-y-6
          transition-transform duration-300
          group-hover:translate-y-0
        "
      >
        Amit Parwe
      </h3>
    </div>

  </div>
</div>
      </div>
    </section>
  );
}
