import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-linen/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          RK Fusion <span className="text-gold">·</span>{" "}
          <span className="font-body italic font-normal text-sm text-ink-soft">
            Chiropractic &amp; Yog Centre
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="relative font-mono text-xs uppercase tracking-widest2 text-ink hover:text-gold transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="font-mono text-xs uppercase tracking-widest2 bg-ink text-linen px-4 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors"
          >
            Book Now
          </button>
        </nav>

        <button
          className="md:hidden text-ink text-2xl"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-linen border-t border-ink/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-left font-mono text-sm uppercase tracking-widest2 text-ink"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="font-mono text-sm uppercase tracking-widest2 bg-ink text-linen px-4 py-2 rounded-full w-fit"
              >
                Book Now
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
