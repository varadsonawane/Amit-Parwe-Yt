import React from "react";

export default function StatusModal({ status }) {
  const { show, type, title, message } = status;

  if (!show) return null;

  return (
    <div
      id="formStatus"
      className="form-status fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] transition-opacity duration-300"
    >
      <div className="status-box bg-[#0e0e0e] border border-white/10 text-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl transition-transform duration-300 min-w-[260px] sm:min-w-[300px]">
        <div
          className="status-icon w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3"
          style={{
            background: type === "error" ? "#ff4d4d" : "#ffeb00",
            color: "black",
          }}
        >
          {type === "error" ? "✕" : "✓"}
        </div>
        <h3 id="statusTitle" className="text-lg sm:text-xl font-semibold mb-1">
          {title}
        </h3>
        <p id="statusMsg" className="text-gray-400 text-xs sm:text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
