import React from "react";
import { motion } from "framer-motion";
import { LuActivity, LuWind, LuRefreshCw, LuLeaf } from "react-icons/lu";

const PILLARS = [
  {
    icon: LuActivity,
    label: "Align",
    text: "Manual chiropractic adjustment to correct posture and restore joint mobility.",
  },
  {
    icon: LuLeaf,
    label: "Move",
    text: "Guided asana sequences that rebuild strength and range of motion around the spine.",
  },
  {
    icon: LuWind,
    label: "Breathe",
    text: "Pranayama and breathwork to release tension held in the back, neck and shoulders.",
  },
  {
    icon: LuRefreshCw,
    label: "Restore",
    text: "A maintenance plan combining both disciplines so progress holds long-term.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  return (
    <section id="about" className="relative bg-bone py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={reveal}
          >
            <p className="eyebrow mb-5">About RK Fusion</p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-6">
              Two disciplines.
              <br />
              One spine.
            </h2>
            <p className="font-body text-charcoal/80 leading-relaxed mb-5">
              Most clinics treat the spine with their hands. Most studios treat
              it with movement. RK Fusion was built on a simple observation:
              the two work better together. A chiropractic adjustment corrects
              what's misaligned; a yoga practice keeps it that way.
            </p>
            <p className="font-body text-charcoal/80 leading-relaxed">
              Every plan here starts with an assessment, not a routine — so
              whether you arrive with chronic back pain, postural strain from
              a desk job, or simply want a more mobile, balanced body, your
              sessions are built around what your spine actually needs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="grid sm:grid-cols-2 gap-5"
          >
            {PILLARS.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                className="bg-linen border border-ink/10 rounded-2xl p-6 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="text-2xl text-sage mb-4" />
                <h3 className="font-display text-base font-semibold text-ink mb-2">
                  {label}
                </h3>
                <p className="font-body text-sm text-charcoal/75 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
