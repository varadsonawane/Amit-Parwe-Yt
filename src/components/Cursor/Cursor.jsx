import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "none"
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, img")) {
        gsap.to(cursor, { scale: 2.5, opacity: 0.7, duration: 0.2 });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, img")) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="cursorv1"></div>;
}
