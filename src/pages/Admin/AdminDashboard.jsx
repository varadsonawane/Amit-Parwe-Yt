import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black px-5 py-8 text-white sm:px-8 lg:px-12">

      {/* HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Amit Parwe
          </h1>

          <p className="mt-1 text-sm text-white/50">
            Admin Panel
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          LOGOUT
        </button>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-7xl">

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Admin Dashboard
          </h2>

          <p className="mt-3 text-white/50">
            Manage your channel and upcoming guests.
          </p>
        </div>

        {/* TWO OPTIONS */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* CHANNEL FEEDBACK */}
          <button
            onClick={() => navigate("/admin/feedback")}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#efff14] text-2xl text-black">
              💬
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Channel Feedback
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
              View feedback and questions submitted by your audience.
            </p>

            <p className="mt-6 text-sm font-semibold text-[#efff14]">
              OPEN FEEDBACK →
            </p>
          </button>

          {/* GUEST DASHBOARD */}
          <button
            onClick={() => navigate("/admin/guests")}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#efff14] text-2xl text-black">
              👤
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Guest Dashboard
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
              Manage upcoming guests, guest information and availability.
            </p>

            <p className="mt-6 text-sm font-semibold text-[#efff14]">
              OPEN GUESTS →
            </p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;