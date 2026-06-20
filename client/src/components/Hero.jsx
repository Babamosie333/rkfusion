import React from "react";
import { motion } from "framer-motion";
import SpineMotif from "./SpineMotif.jsx";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";

const bookNowLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi RK Fusion, I'd like to book a consultation. Could you share the available slots?"
)}`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* faint background spine, oversized, purely atmospheric */}
      <div className="pointer-events-none absolute -right-10 top-0 h-full opacity-[0.06] hidden md:block">
        <SpineMotif className="h-full w-auto" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center w-full relative">
        <div>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="eyebrow mb-5"
          >
            Chiropractic Care · Therapeutic Yoga
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight"
          >
            Alignment for the spine,
            <br />
            <span className="italic font-body font-normal text-ink-soft">
              breath for the body.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-lg font-body text-lg text-charcoal/80 leading-relaxed"
          >
            RK Fusion Chiropractic Yog Centre brings together precise spinal
            adjustment and the slow discipline of yoga therapy — one practice
            correcting structure, the other restoring movement, both working
            toward the same spine.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={bookNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-ink font-mono text-xs uppercase tracking-widest2 px-6 py-3.5 rounded-full hover:bg-ink hover:text-linen transition-colors"
            >
              Book a Consultation
            </a>
            <button
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-mono text-xs uppercase tracking-widest2 text-ink border-b border-ink/40 pb-1 hover:border-gold hover:text-gold transition-colors"
            >
              Our Philosophy
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex justify-center"
        >
          <SpineMotif className="h-[420px] w-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
