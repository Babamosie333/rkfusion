import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import SectionNav from "../components/SectionNav.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Gallery from "../components/Gallery.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

const SECTION_IDS = ["hero", "about", "gallery", "contact"];

const Home = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <SectionNav active={active} />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
