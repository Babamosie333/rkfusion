import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-linen/80 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-sm text-linen">
          RK Fusion <span className="text-gold">·</span> Chiropractic &amp; Yog Centre
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-linen/50">
          © {year} RK Fusion. All rights reserved.<br></br>
          <a href="https://vikramsingh.itsfolio.tech" target="_blank" rel="noopener noreferrer" className="underline ml-1">Developed by Vikram Singh</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
