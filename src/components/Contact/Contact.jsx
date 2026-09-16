import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import StatusModal from "./StatusModal";

export default function Contact() {
  const formRef = useRef(null);
  const [modalStatus, setModalStatus] = useState({
    show: false,
    type: "success",
    title: "",
    message: ""
  });

  useEffect(() => {
    emailjs.init("RzmLp4cru01hlbELP");
  }, []);

  const showStatus = (type, title, msg) => {
    setModalStatus({
      show: true,
      type,
      title,
      message: msg
    });

    setTimeout(() => {
      setModalStatus((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm("service_q4zl8hu", "template_gtyqgxg", formRef.current)
      .then(() => {
        emailjs.sendForm("service_q4zl8hu", "template_1aiaszt", formRef.current);
        showStatus("success", "Request Sent 🎉", "We will contact you soon");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        showStatus("error", "Failed ❌", "Please try again later");
      });
  };

  return (
    <>
      <section id="contact" className="guest-contact bg-black px-5 py-14 sm:py-16 md:px-[6%] md:py-20 lg:py-24 flex justify-center">
        <div className="guest-card-wrap relative rounded-3xl w-full max-w-[940px] shadow-2xl">
          <div className="guest-card w-full bg-[#0c0c0c] rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row gap-8 sm:gap-10 lg:gap-12 relative z-[1] overflow-hidden font-clash">
            <div className="shine"></div>

            {/* LEFT CONTENT */}
            <div className="guest-left flex-1 text-white text-center md:text-left">
              <h2 className="font-clash text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] font-medium mb-3.5 leading-snug">
                Be a Guest <span className="text-brand-yellow italic">on TAP Podcast</span>
              </h2>

              <p className="text-[#bfbfbf] leading-relaxed mb-6 font-clash text-sm sm:text-base font-normal max-w-md mx-auto md:mx-0">
                Have a story, experience, or knowledge worth sharing? Join TAP
                Podcast and inspire thousands of listeners. Fill the form or
                directly connect with us on WhatsApp.
              </p>

              <div className="guest-icons flex justify-center md:justify-start gap-4 text-gray-300 font-hind font-medium text-base sm:text-lg md:text-xl">
                <div>ऐका.. ऐकवा.. एकत्र व्हा.. एवढंच 🎙</div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <form
              id="guestform"
              ref={formRef}
              onSubmit={handleSubmit}
              className="guest-form flex-1 flex flex-col gap-3.5 sm:gap-4 font-funnel w-full"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="bg-transparent border-b border-[#444] focus:border-brand-yellow px-1 py-2 sm:py-2.5 text-white text-sm sm:text-base outline-none transition-colors font-clash placeholder:text-gray-500"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                required
                className="bg-transparent border-b border-[#444] focus:border-brand-yellow px-1 py-2 sm:py-2.5 text-white text-sm sm:text-base outline-none transition-colors font-clash placeholder:text-gray-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="bg-transparent border-b border-[#444] focus:border-brand-yellow px-1 py-2 sm:py-2.5 text-white text-sm sm:text-base outline-none transition-colors font-clash placeholder:text-gray-500"
              />

              <textarea
                name="message"
                placeholder="Tell us about yourself / topic..."
                required
                className="bg-transparent border-b border-[#444] focus:border-brand-yellow px-1 py-2 sm:py-2.5 text-white text-sm sm:text-base outline-none transition-colors font-clash placeholder:text-gray-500 min-h-[85px] sm:min-h-[95px] resize-none"
              ></textarea>

              <button
                type="submit"
                className="guest-btn bg-brand-yellow hover:bg-brand-yellow-light text-black font-funnel font-medium text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded transition-all duration-200 mt-2 shadow-sm cursor-pointer"
              >
                BECOME A GUEST
              </button>

              <a
                href="https://wa.me/917972377136"
                target="_blank"
                rel="noopener noreferrer"
                className="wa-btn text-center border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-black font-funnel font-medium text-sm sm:text-base py-2 sm:py-2.5 px-4 rounded transition-all duration-200"
              >
                Contact on WhatsApp
              </a>
            </form>
          </div>
        </div>
      </section>

      <StatusModal status={modalStatus} />
    </>
  );
}
