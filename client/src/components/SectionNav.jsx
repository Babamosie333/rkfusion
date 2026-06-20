import React from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const SectionNav = ({ active }) => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0"
      aria-label="Section navigation"
    >
      {SECTIONS.map((s, i) => (
        <React.Fragment key={s.id}>
          {i > 0 && <div className="w-px h-9 bg-ink/25" />}
          <button
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-center w-4 h-4"
            aria-label={`Go to ${s.label}`}
            aria-current={active === s.id}
          >
            <motion.span
              className="block rounded-[5px] border-2"
              animate={{
                width: active === s.id ? 14 : 8,
                height: active === s.id ? 14 : 8,
                borderColor: active === s.id ? "#C99A3C" : "#1E3A34",
                backgroundColor: active === s.id ? "#C99A3C" : "transparent",
              }}
              transition={{ duration: 0.25 }}
            />
            <span className="pointer-events-none absolute right-7 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest2 text-ink opacity-0 group-hover:opacity-100 transition-opacity bg-linen/90 px-2 py-1 rounded">
              {s.label}
            </span>
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default SectionNav;
