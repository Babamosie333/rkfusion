import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuTrash2, LuUpload, LuLogOut, LuStar } from "react-icons/lu";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";

const CATEGORIES = ["chiropractic", "yoga", "studio", "events", "other"];

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("studio");
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const loadMedia = () => {
    setLoading(true);
    api
      .get("/media")
      .then((res) => setMedia(Array.isArray(res.data) ? res.data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("featured", featured);

    try {
      await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      setTitle("");
      setCategory("studio");
      setFeatured(false);
      e.target.reset();
      setMessage("Uploaded.");
      loadMedia();
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item permanently?")) return;
    await api.delete(`/media/${id}`);
    setMedia((m) => m.filter((item) => item._id !== id));
  };

  const toggleFeatured = async (item) => {
    const res = await api.put(`/media/${item._id}`, { featured: !item.featured });
    setMedia((m) => m.map((i) => (i._id === item._id ? res.data : i)));
  };

  return (
    <div className="min-h-screen bg-bone">
      <header className="bg-ink text-linen">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-sage">
              RK Fusion Studio Dashboard
            </p>
            <p className="font-display text-lg">{admin?.name || admin?.email}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 border border-linen/25 rounded-full px-4 py-2 hover:border-gold hover:text-gold transition-colors"
          >
            <LuLogOut /> Log Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-linen border border-ink/10 rounded-2xl p-7"
        >
          <h2 className="font-display text-xl mb-5">Add a photo or video</h2>
          <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                File (image or video)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 font-body bg-white"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                Title (optional)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 font-body"
                placeholder="e.g. Morning yoga session"
              />
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-ink/15 rounded-lg px-4 py-3 font-body"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 font-body text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Feature this item
            </label>
            <div className="md:col-span-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 bg-gold text-ink font-mono text-xs uppercase tracking-widest2 px-6 py-3 rounded-full hover:bg-ink hover:text-linen transition-colors disabled:opacity-60"
              >
                <LuUpload /> {uploading ? "Uploading..." : "Upload"}
              </button>
              {message && <span className="font-body text-sm text-charcoal/70">{message}</span>}
            </div>
          </form>
        </motion.section>

        <section>
          <h2 className="font-display text-xl mb-5">
            Gallery ({media.length} item{media.length !== 1 ? "s" : ""})
          </h2>

          {loading ? (
            <p className="font-mono text-xs uppercase tracking-widest2 text-sage">Loading...</p>
          ) : media.length === 0 ? (
            <p className="font-body text-charcoal/70">
              Nothing uploaded yet. Add your first photo or video above.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {media.map((item) => (
                <div
                  key={item._id}
                  className="bg-linen border border-ink/10 rounded-xl overflow-hidden"
                >
                  <div className="aspect-square bg-ink/5">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.title || "media"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video src={item.url} className="w-full h-full object-cover" muted />
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <p className="font-body text-sm truncate">{item.title || "Untitled"}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest2 text-sage">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => toggleFeatured(item)}
                        className={`text-lg ${item.featured ? "text-gold" : "text-ink/30"}`}
                        aria-label="Toggle featured"
                        title="Toggle featured"
                      >
                        <LuStar fill={item.featured ? "#C99A3C" : "none"} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-clay hover:text-clay/70"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;