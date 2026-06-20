/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#F2F0E6",      // page background - warm bone white
        bone: "#E8E3D5",       // alternate section background
        ink: "#1E3A34",        // primary deep spruce-teal (headers, nav, spine line)
        "ink-soft": "#2C4D45", // lighter ink for hovers/secondary
        charcoal: "#2A2924",   // body text
        gold: "#C99A3C",       // turmeric gold - CTAs, accents
        "gold-soft": "#E0BC72",
        sage: "#8FA68E",       // secondary accent - icons, dividers
        "sage-soft": "#D7E1D3",
        clay: "#B5572E",       // rare use - error/warning states only
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Newsreader'", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.035)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
