import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuMapPin, LuClock, LuPhone } from "react-icons/lu";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919569363563";

const SERVICES = [
  "Chiropractic Adjustment",
  "Therapeutic Yoga",
  "Combined Fusion Plan",
  "General Enquiry",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const buildWhatsAppLink = ({ name, phone, service, message }) => {
  const lines = [
    `Hi RK Fusion, I'd like to get in touch.`,
    `Name: ${name}`,
    phone ? `Phone: ${phone}` : null,
    `Interested in: ${service}`,
    message ? `Message: ${message}` : null,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: SERVICES[0],
    message: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const link = buildWhatsAppLink(form);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative bg-bone py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          className="mb-14"
        >
          <p className="eyebrow mb-5">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Tell us where it hurts.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-14">
          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  className="w-full bg-linen border border-ink/15 rounded-lg px-4 py-3 font-body text-charcoal focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="Optional"
                  className="w-full bg-linen border border-ink/15 rounded-lg px-4 py-3 font-body text-charcoal focus:border-gold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                I'm interested in
              </label>
              <select
                value={form.service}
                onChange={update("service")}
                className="w-full bg-linen border border-ink/15 rounded-lg px-4 py-3 font-body text-charcoal focus:border-gold outline-none"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-widest2 text-sage block mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us a bit about what you're looking for"
                className="w-full bg-linen border border-ink/15 rounded-lg px-4 py-3 font-body text-charcoal focus:border-gold outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gold text-ink font-mono text-xs uppercase tracking-widest2 px-7 py-3.5 rounded-full hover:bg-ink hover:text-linen transition-colors"
            >
              Send on WhatsApp
            </button>
            <p className="font-body text-xs text-charcoal/55">
              This opens WhatsApp with your details pre-filled — nothing is sent until you press send there.
            </p>
          </motion.form>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="space-y-6"
          >
            <div className="bg-linen border border-ink/10 rounded-2xl p-7">
              <div className="flex items-start gap-4 mb-5">
                <LuMapPin className="text-xl text-sage mt-0.5 shrink-0" />
                <p className="font-body text-charcoal/80 leading-relaxed">
                  RK Fusion Chiropractic Yog Centre
                  <br />
                  <a href="https://share.google/WbdVP3UzoSn41A2Xv" target="_blank" rel="noopener noreferrer" className="underline">
                    Old Sales Tax Road, 7/187- 1, Khalasi Line, Swaroop Nagar, Kanpur, Uttar Pradesh 208002
                  </a>
                </p>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <LuClock className="text-xl text-sage mt-0.5 shrink-0" />
                <p className="font-body text-charcoal/80 leading-relaxed">
                  Mon – Sat, 7:00 AM – 8:00 PM
                  <br />
                  Sunday by appointment
                </p>
              </div>
              <div className="flex items-start gap-4">
                <LuPhone className="text-xl text-sage mt-0.5 shrink-0" />
                <p className="font-body text-charcoal/80 leading-relaxed">
                  +{WHATSAPP_NUMBER}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-mono text-xs uppercase tracking-widest2 border border-ink/20 text-ink rounded-full px-6 py-3.5 hover:border-gold hover:text-gold transition-colors"
            >
              Chat With Us Directly
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
