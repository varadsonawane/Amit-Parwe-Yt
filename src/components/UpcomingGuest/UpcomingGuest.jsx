import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const UpcomingGuest = () => {
  // ================= GUEST STATES =================
  const [guest, setGuest] = useState(null);
  const [guestLoading, setGuestLoading] = useState(true);

  // ================= FEEDBACK STATES =================
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // ================= QUESTION STATES =================
  const [questionName, setQuestionName] = useState("");
  const [questionGender, setQuestionGender] = useState("");
  const [questionCity, setQuestionCity] = useState("");
  const [question, setQuestion] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [questionError, setQuestionError] = useState("");

  // ================= FETCH ACTIVE GUEST =================
  useEffect(() => {
    const fetchGuest = async () => {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching guest:", error);
        setGuestLoading(false);
        return;
      }

      setGuest(data);
      setGuestLoading(false);
    };

    fetchGuest();
  }, []);

  // ================= FEEDBACK SUBMIT =================
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (
      !feedbackName.trim() ||
      !feedbackEmail.trim() ||
      !feedback.trim()
    ) {
      return;
    }

    const { error } = await supabase
      .from("feedback")
      .insert([
        {
          name: feedbackName,
          email: feedbackEmail,
          feedback: feedback,
        },
      ]);

    if (error) {
      console.error("Error submitting feedback:", error);
      return;
    }

    setFeedbackName("");
    setFeedbackEmail("");
    setFeedback("");
    setFeedbackSubmitted(true);
  };

  // ================= QUESTION SUBMIT =================
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    setQuestionError("");
    setQuestionSubmitted(false);

    if (
      !questionName.trim() ||
      !questionGender ||
      !questionCity.trim() ||
      !question.trim()
    ) {
      return;
    }

    if (!guest?.id) {
      setQuestionError("No active guest found.");
      console.error("No active guest found:", guest);
      return;
    }

    const { error } = await supabase
      .from("questions")
      .insert({
        name: questionName.trim(),
        gender: questionGender,
        city: questionCity.trim(),
        question: question.trim(),
        guest_id: guest.id,
      });

    if (error) {
      console.error("QUESTION ERROR:", error);
      setQuestionError(error.message);
      return;
    }

    setQuestionName("");
    setQuestionGender("");
    setQuestionCity("");
    setQuestion("");
    setQuestionSubmitted(true);
  };

  return (
    <section
      id="upcoming-guest"
      className="w-full px-5 py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= SECTION HEADING ================= */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Your Feedback Matters Most
          </h1>

          <p className="mt-3 max-w-2xl text-white/60">
            Your thoughts, ideas and questions help us make every conversation
            better.
          </p>
        </div>

        {/* ================= TWO COLUMNS ================= */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* ================================================= */}
          {/* ================= FEEDBACK SIDE ================== */}
          {/* ================================================= */}

          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              p-6
              backdrop-blur-md
              sm:p-8

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:border-white/20
              hover:bg-white/[0.07]
              hover:shadow-2xl
            "
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Share Your Thoughts
            </h2>

            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Have feedback or a suggestion for our channel?
              We’d love to hear from you.
            </p>

            {/* Success Message */}
            {feedbackSubmitted && (
              <p className="mt-4 text-sm font-medium text-green-400">
                ✓ Thank you! Your feedback has been submitted successfully.
              </p>
            )}

            {/* Feedback Form */}
            <form
              onSubmit={handleFeedbackSubmit}
              className="mt-6 space-y-4"
            >
              {/* Name */}
              <input
                type="text"
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 transition-colors duration-200 focus:border-white/30"
              />

              {/* Email */}
              <input
                type="email"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 transition-colors duration-200 focus:border-white/30"
              />

              {/* Feedback */}
              <textarea
                rows="5"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback or suggestion..."
                required
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 transition-colors duration-200 focus:border-white/30"
              />

              {/* Submit */}
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-[#efff14] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                SEND FEEDBACK
              </button>
            </form>
          </div>

          {/* ================================================= */}
          {/* ================ UPCOMING GUEST ================= */}
          {/* ================================================= */}

          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              p-6
              backdrop-blur-md
              sm:p-8

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:border-white/20
              hover:bg-white/[0.07]
              hover:shadow-2xl
            "
          >
            {/* ================= GUEST LOADING ================= */}
            {guestLoading ? (
              <p className="text-white/60">
                Loading upcoming guest...
              </p>
            ) : guest ? (
              <>
                {/* Heading */}
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#efff14]">
                  Up Next
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Upcoming Guest
                </h2>

                {/* Guest Information */}
                <div className="mt-6 flex flex-col gap-5 sm:flex-row">

                  {/* Guest Image */}
                  <img
                    src={guest.image_url}
                    alt={guest.name}
                    className="h-40 w-full rounded-xl object-cover transition-transform duration-300 sm:h-40 sm:w-40"
                  />

                  {/* Guest Details */}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {guest.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {guest.description}
                    </p>
                  </div>

                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#efff14]">
                  Up Next
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Upcoming Guest
                </h2>

                <p className="mt-6 text-white/60">
                  No upcoming guest available.
                </p>
              </>
            )}

            {/* ================= ASK QUESTION ================= */}
            <div className="mt-8">

              <h3 className="text-lg font-semibold text-white">
                Have a question for the guest?
              </h3>
              <p className="text-sm text-white">
                ( तुमच्या मनातला प्रश्न आम्हाला पाठवा. )
              </p>
              {/* Success Message */}
              {questionSubmitted && (
                <p className="mt-3 text-sm font-medium text-green-400">
                  ✓ Your question has been submitted successfully!
                </p>
              )}

              {/* Error */}
              {questionError && (
                <p className="mt-3 text-sm font-medium text-red-400">
                  ✕ {questionError}
                </p>
              )}

              {/* Question Form */}
              <form
                onSubmit={handleQuestionSubmit}
                className="mt-4 space-y-3"
              >
                {/* Name */}
                <input
                  type="text"
                  value={questionName}
                  onChange={(e) => setQuestionName(e.target.value)}
                  placeholder="Your Nickname (No Worries! It will be private)"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 transition-colors duration-200 focus:border-white/30"
                />

                {/* Gender */}
                <select
                  value={questionGender}
                  onChange={(e) => setQuestionGender(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors duration-200 focus:border-white/30"
                >
                  <option value="" disabled className="bg-black">
                    Select Gender
                  </option>

                  <option value="Male" className="bg-black">
                    Male
                  </option>

                  <option value="Female" className="bg-black">
                    Female
                  </option>

                  <option value="Other" className="bg-black">
                    Other
                  </option>
                </select>

                {/* City */}
                <input
                  type="text"
                  value={questionCity}
                  onChange={(e) => setQuestionCity(e.target.value)}
                  placeholder="Your City"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 transition-colors duration-200 focus:border-white/30"
                />

                {/* Question */}
                <textarea
                  rows="3"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Write your question..."
                  required
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 transition-colors duration-200 focus:border-white/30"
                />

                {/* Submit Question */}
                <button
                  type="submit"
                  className="mt-1 cursor-pointer rounded-lg bg-[#efff14] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  SUBMIT QUESTION
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default UpcomingGuest;