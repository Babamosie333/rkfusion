import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/rk-admin-portal";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(ADMIN_PATH);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <p className="font-mono text-xs uppercase tracking-widest2 text-sage mb-3 text-center">
          RK Fusion · Studio Dashboard
        </p>
        <h1 className="font-display text-2xl text-linen text-center mb-8">
          Admin Sign In
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-linen rounded-2xl p-7 space-y-4 shadow-xl"
        >
          {error && (
            <p className="text-sm font-body text-clay bg-clay/10 border border-clay/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-4 py-3 font-body focus:border-gold outline-none"
              autoFocus
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/15 rounded-lg px-4 py-3 font-body focus:border-gold outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-linen font-mono text-xs uppercase tracking-widest2 py-3.5 rounded-full hover:bg-gold hover:text-ink transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
