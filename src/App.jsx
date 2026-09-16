import React from "react";
import Home from "./pages/Home/Home";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";


import FeedbackDashboard from "./pages/Admin/FeedbackDashboard";
import GuestDashboard from "./pages/Admin/GuestDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/feedback" element={<FeedbackDashboard />} />
<Route path="/admin/guests" element={<GuestDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;