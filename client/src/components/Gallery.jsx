import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import api from "../api/axios";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "chiropractic", label: "Chiropractic" },
  { key: "yoga", label: "Yoga" },
  { key: "studio", label: "Studio" },
  { key: "events", label: "Events" },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api
      .get("/media")
      .then((res) => setMedia(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visible = Array.isArray(media)
    ? media.filter((m) => filter === "all" || m.category === filter)
    : [];

  return (
    <section id="gallery" className="relative py-28 bg-linen">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <p className="eyebrow mb-5">Inside The Studio</p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">Gallery</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-mono text-[11px] uppercase tracking-widest2 px-4 py-2 rounded-full border transition-colors ${
                  filter === f.key
                    ? "bg-ink text-linen border-ink"
                    : "border-ink/20 text-ink hover:border-gold hover:text-gold"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {loading && (
          <p className="font-mono text-xs uppercase tracking-widest2 text-sage">
            Loading gallery...
          </p>
        )}

        {!loading && error && (
          <p className="font-body text-charcoal/70">
            The gallery couldn't be reached right now. Please check back shortly.
          </p>
        )}

        {!loading && !error && visible.length === 0 && (
          <div className="border border-dashed border-ink/20 rounded-2xl py-20 text-center">
            <p className="font-body text-charcoal/70">
              Photos and videos from the studio will appear here once they're
              added from the dashboard.
            </p>
          </div>
        )}

        {!loading && !error && visible.length > 0 && (
          <motion.div
            className="columns-2 md:columns-3 gap-4 [column-fill:_balance]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {visible.map((item) => (
              <motion.button
                key={item._id}
                variants={reveal}
                onClick={() => setActive(item)}
                className="block w-full mb-4 rounded-xl overflow-hidden break-inside-avoid border border-ink/10 group relative"
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.title || "RK Fusion studio"}
                    loading="lazy"
                    className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-auto"
                    muted
                    loop
                    playsInline
                  />
                )}
                {item.title && (
                  <span className="absolute bottom-0 left-0 right-0 bg-ink/70 text-linen text-xs font-mono px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-6 right-6 text-linen text-3xl"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <HiOutlineX />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[80vh]"
            >
              {active.type === "image" ? (
                <img
                  src={active.url}
                  alt={active.title || "RK Fusion studio"}
                  className="max-h-[80vh] w-auto rounded-lg"
                />
              ) : (
                <video
                  src={active.url}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-auto rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;