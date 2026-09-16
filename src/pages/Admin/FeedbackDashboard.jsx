import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const FeedbackDashboard = () => {
  const navigate = useNavigate();

  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeedback = async () => {
      setLoading(true);
      setError("");

      // Check logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/admin");
        return;
      }

      // Check admin
      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

      if (adminError || !isAdmin) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      // Fetch feedback
      const { data, error: feedbackError } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (feedbackError) {
        console.error("Error fetching feedback:", feedbackError);
        setError(feedbackError.message);
        setLoading(false);
        return;
      }

      setFeedbackList(data || []);
      setLoading(false);
    };

    loadFeedback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-8 text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold sm:text-4xl">
          Channel Feedback
        </h1>

        <p className="mt-2 text-white/50">
          Feedback submitted by your audience.
        </p>

        {loading && (
          <p className="mt-10 text-white/50">
            Loading feedback...
          </p>
        )}

        {error && (
          <p className="mt-10 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            ✕ {error}
          </p>
        )}

        {!loading && !error && feedbackList.length === 0 && (
          <p className="mt-10 text-white/50">
            No feedback submitted yet.
          </p>
        )}

        {!loading && !error && feedbackList.length > 0 && (
          <div className="mt-8 space-y-4">
            {feedbackList.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>

                  <span className="text-xs text-white/40">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>

                <p className="mt-1 text-sm text-white/50">
                  {item.email}
                </p>

                <p className="mt-4 leading-6 text-white/80">
                  {item.feedback}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default FeedbackDashboard;