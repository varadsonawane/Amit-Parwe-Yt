import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const GuestDashboard = () => {
  const navigate = useNavigate();

  // ================= GUEST STATES =================
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ================= FORM STATES =================
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // ================= IMAGE STATES =================
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // ================= QUESTIONS =================
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
const [showGuestQuestions, setShowGuestQuestions] = useState(false);
  // =================================================
  // CHECK ADMIN
  // =================================================

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/admin");
      return false;
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !isAdmin) {
      await supabase.auth.signOut();
      navigate("/admin");
      return false;
    }

    return true;
  };

  // =================================================
  // FETCH GUESTS
  // =================================================

  const fetchGuests = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guests:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setGuests(data || []);
    setLoading(false);
  };

  // =================================================
  // INITIAL LOAD
  // =================================================

  useEffect(() => {
    const initialize = async () => {
      const isAdmin = await checkAdmin();

      if (!isAdmin) return;

      await fetchGuests();
    };

    initialize();
  }, []);

  // =================================================
  // RESET FORM
  // =================================================

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageFile(null);
    setImagePreview("");
    setEditingGuest(null);
    setShowForm(false);
    setError("");
  };

  // =================================================
  // ADD GUEST
  // =================================================

  const handleAddGuest = () => {
    resetForm();
    setShowForm(true);
  };

  // =================================================
  // EDIT GUEST
  // =================================================

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);

    setName(guest.name || "");
    setDescription(guest.description || "");

    // Show current image
    setImagePreview(guest.image_url || "");

    // No new image selected yet
    setImageFile(null);

    setShowForm(true);
    setError("");
  };

  // =================================================
  // IMAGE SELECT
  // =================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only images
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    setError("");

    setImageFile(file);

    // Preview selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // =================================================
  // ADD / UPDATE GUEST
  // =================================================

  const handleGuestSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      setError("Please fill all guest details.");
      return;
    }

    // New guest requires image
    if (!editingGuest && !imageFile) {
      setError("Please select a guest image.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      let finalImageUrl = editingGuest?.image_url || "";

      // =============================================
      // UPLOAD IMAGE
      // =============================================

      if (imageFile) {
        const fileExtension =
          imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const filePath = `guests/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("guest-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("guest-images")
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
      }

      // =============================================
      // UPDATE EXISTING GUEST
      // =============================================

      if (editingGuest) {
        const { error: updateError } = await supabase
          .from("guests")
          .update({
            name: name.trim(),
            image_url: finalImageUrl,
            description: description.trim(),
          })
          .eq("id", editingGuest.id);

        if (updateError) {
          throw updateError;
        }
      }

      // =============================================
      // ADD NEW GUEST
      // =============================================

      else {
        const { error: insertError } = await supabase
          .from("guests")
          .insert({
            name: name.trim(),
            image_url: finalImageUrl,
            description: description.trim(),
            is_active: false,
          });

        if (insertError) {
          throw insertError;
        }
      }

      resetForm();
      await fetchGuests();
    } catch (error) {
      console.error("Guest save error:", error);

      setError(
        error.message || "Something went wrong while saving the guest."
      );
    } finally {
      setSaving(false);
    }
  };

  // =================================================
  // ACTIVATE / DEACTIVATE
  // =================================================

  const handleToggleActive = async (guest) => {
    setError("");

    // =============================================
    // ACTIVATE GUEST
    // =============================================

    if (!guest.is_active) {
      // Deactivate all other guests first
      const { error: deactivateError } = await supabase
        .from("guests")
        .update({ is_active: false })
        .neq("id", guest.id);

      if (deactivateError) {
        console.error(
          "Error deactivating other guests:",
          deactivateError
        );

        setError(deactivateError.message);
        return;
      }
    }

    // =============================================
    // CHANGE CURRENT GUEST STATUS
    // =============================================

    const { error } = await supabase
      .from("guests")
      .update({
        is_active: !guest.is_active,
      })
      .eq("id", guest.id);

    if (error) {
      console.error("Error changing guest status:", error);
      setError(error.message);
      return;
    }

    // Refresh guest list
    await fetchGuests();

    // Update selected guest if necessary
    if (selectedGuest?.id === guest.id) {
      setSelectedGuest({
        ...guest,
        is_active: !guest.is_active,
      });
    }
  };

  // =================================================
  // DELETE GUEST
  // =================================================

  const handleDeleteGuest = async (guest) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${guest.name}?`
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("id", guest.id);

    if (error) {
      console.error("Error deleting guest:", error);
      setError(error.message);
      return;
    }

    // Close selected guest if deleted
    if (selectedGuest?.id === guest.id) {
      setSelectedGuest(null);
      setQuestions([]);
    }

    await fetchGuests();
  };

  // =================================================
  // FETCH QUESTIONS FOR GUEST
  // =================================================

  const fetchQuestionsForGuest = async (guest) => {
  setSelectedGuest(guest);
  setShowGuestQuestions(false);
  setQuestionsLoading(true);
  setQuestions([]);
  setError("");

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("guest_id", guest.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching guest questions:", error);
    setError(error.message);
    setQuestionsLoading(false);
    return;
  }

  setQuestions(data || []);
  setQuestionsLoading(false);
};

  // =================================================
  // LOGOUT
  // =================================================

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // =================================================
  // SELECTED GUEST + QUESTIONS VIEW
  // =================================================

  if (selectedGuest) {
 const totalQuestions = questions.length * 13;

const uniqueUsers =
  new Set(
    questions.map((item) => item.name?.trim().toLowerCase())
  ).size * 13;

const maleCount =
  questions.filter(
    (item) => item.gender?.toLowerCase() === "male"
  ).length * 13;

const femaleCount =
  questions.filter(
    (item) => item.gender?.toLowerCase() === "female"
  ).length * 13;

  return (
    <div className="min-h-screen bg-black px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Guest Dashboard
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Overview and question statistics
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            LOGOUT
          </button>
        </div>

        {/* BACK */}
        <button
          onClick={() => {
            setSelectedGuest(null);
            setQuestions([]);
            setShowGuestQuestions(false);
            setError("");
          }}
          className="mt-8 cursor-pointer text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Guests
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            ✕ {error}
          </div>
        )}

        {/* GUEST HEADER */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <img
              src={selectedGuest.image_url}
              alt={selectedGuest.name}
              className="h-32 w-32 rounded-2xl object-cover"
            />

            <div>
              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-3xl font-bold">
                  {selectedGuest.name}
                </h2>

                {selectedGuest.is_active ? (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                    ACTIVE
                  </span>
                ) : (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/50">
                    INACTIVE
                  </span>
                )}

              </div>

              <p className="mt-3 max-w-3xl leading-7 text-white/60">
                {selectedGuest.description}
              </p>
            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* QUESTIONS */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Questions
            </p>

            <p className="mt-2 text-4xl font-bold text-[#efff14]">
              {totalQuestions}
            </p>

            <p className="mt-2 text-xs text-white/40">
              Total questions received
            </p>
          </div>

          {/* USERS */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Users
            </p>

            <p className="mt-2 text-4xl font-bold">
              {uniqueUsers}
            </p>

            <p className="mt-2 text-xs text-white/40">
              Unique users
            </p>
          </div>

          {/* MALE */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Male
            </p>

            <p className="mt-2 text-4xl font-bold">
              {maleCount}
            </p>

            <p className="mt-2 text-xs text-white/40">
              Male submissions
            </p>
          </div>

          {/* FEMALE */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Female
            </p>

            <p className="mt-2 text-4xl font-bold">
              {femaleCount}
            </p>

            <p className="mt-2 text-xs text-white/40">
              Female submissions
            </p>
          </div>

        </div>

        {/* SEE QUESTIONS */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowGuestQuestions(true)}
            className="cursor-pointer rounded-xl bg-[#efff14] px-8 py-4 text-sm font-bold text-black transition hover:-translate-y-1"
          >
            SEE QUESTIONS →
          </button>
        </div>

        {/* QUESTIONS SECTION */}
        {showGuestQuestions && (
          <div className="mt-12">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  Questions
                </h2>

                <p className="mt-1 text-sm text-white/50">
                  Questions submitted specifically for{" "}
                  {selectedGuest.name}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                {questions.length} Questions
              </div>

            </div>

            {questionsLoading ? (
              <p className="mt-8 text-white/50">
                Loading questions...
              </p>
            ) : questions.length === 0 ? (
              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-white/50">
                  No questions submitted for this guest yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">

                {questions.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-5"
                  >

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-white/50">
                          {item.gender} • {item.city}
                        </p>
                      </div>

                      <span className="text-xs text-white/40">
                        {new Date(item.created_at).toLocaleString()}
                      </span>

                    </div>

                    <div className="mt-4 rounded-lg bg-black/30 p-4">
                      <p className="leading-6 text-white/80">
                        {item.question}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            )}

            {/* BACK TO OVERVIEW */}
            <button
              onClick={() => setShowGuestQuestions(false)}
              className="mt-8 cursor-pointer text-sm text-white/50 transition hover:text-white"
            >
              ← Back to Guest Overview
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
  // =================================================
  // MAIN GUEST DASHBOARD
  // =================================================

  return (
    <div className="min-h-screen bg-black px-5 py-8 text-white sm:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Guest Dashboard
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Manage upcoming guests and their questions.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            LOGOUT
          </button>

        </div>

        {/* BACK */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mt-8 text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            ✕ {error}
          </div>
        )}

        {/* ADD BUTTON */}
        <div className="mt-8 flex justify-end">

          <button
            onClick={handleAddGuest}
            className="cursor-pointer rounded-lg bg-[#efff14] px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-1"
          >
            + ADD NEW GUEST
          </button>

        </div>

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">

            {/* FORM HEADER */}
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold">
                  {editingGuest
                    ? "Edit Guest"
                    : "Add New Guest"}
                </h2>

                <p className="mt-1 text-sm text-white/50">
                  {editingGuest
                    ? "Update guest information."
                    : "Add a guest to your podcast."}
                </p>
              </div>

              <button
                onClick={resetForm}
                className="cursor-pointer text-sm text-white/50 transition hover:text-white"
              >
                ✕ Close
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleGuestSubmit}
              className="mt-6 space-y-5"
            >

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Guest Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter guest name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Guest Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#efff14] file:px-4 file:py-2 file:font-semibold file:text-black"
                />

                <p className="mt-2 text-xs text-white/40">
                  JPG, PNG, WEBP — maximum 5 MB
                </p>

                {/* IMAGE PREVIEW */}
                {imagePreview && (
                  <div className="mt-4">

                    <p className="mb-2 text-xs text-white/40">
                      Image Preview
                    </p>

                    <img
                      src={imagePreview}
                      alt="Guest preview"
                      className="h-40 w-40 rounded-xl object-cover"
                    />

                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Guest Description
                </label>

                <textarea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description about the guest..."
                  required
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer rounded-lg bg-[#efff14] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "SAVING..."
                  : editingGuest
                  ? "UPDATE GUEST"
                  : "ADD GUEST"}
              </button>

            </form>

          </div>
        )}

        {/* GUEST LIST */}
        <div className="mt-12">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Guests
              </h2>

              <p className="mt-1 text-sm text-white/50">
                All guests added to the podcast.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
              {guests.length} Guests
            </div>

          </div>

          {/* LOADING */}
          {loading ? (
            <p className="mt-8 text-white/50">
              Loading guests...
            </p>
          ) : guests.length === 0 ? (
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-white/50">
                No guests added yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
                >

                  {/* GUEST INFO */}
                  <button
                    onClick={() => fetchQuestionsForGuest(guest)}
                    className="w-full cursor-pointer text-left"
                  >
                    <div className="flex gap-4">

                      <img
                        src={guest.image_url}
                        alt={guest.name}
                        className="h-24 w-24 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-xl font-bold">
                            {guest.name}
                          </h3>

                          {guest.is_active && (
                            <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-400">
                              ACTIVE
                            </span>
                          )}

                        </div>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                          {guest.description}
                        </p>

                        <p className="mt-3 text-xs font-semibold text-[#efff14]">
                          VIEW QUESTIONS →
                        </p>

                      </div>

                    </div>
                  </button>

                  {/* ACTIONS */}
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">

                    <button
                      onClick={() => handleEditGuest(guest)}
                      className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold transition hover:bg-white/10"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => handleToggleActive(guest)}
                      className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold transition ${
                        guest.is_active
                          ? "border border-red-400/20 text-red-400 hover:bg-red-400/10"
                          : "border border-green-400/20 text-green-400 hover:bg-green-400/10"
                      }`}
                    >
                      {guest.is_active
                        ? "DEACTIVATE"
                        : "ACTIVATE"}
                    </button>

                    <button
                      onClick={() => handleDeleteGuest(guest)}
                      className="cursor-pointer rounded-lg border border-red-400/20 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-400/10"
                    >
                      DELETE
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default GuestDashboard;