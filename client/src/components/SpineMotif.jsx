import React from "react";
import { motion } from "framer-motion";

// Anatomical S-curve: vertebrae taper from small (cervical, top) to large
// (lumbar, bottom), following the spine's natural curve. The gold point is
// the signature touch - it travels the length of the spine and back,
// slow and continuous, like a breath cycle running along it.
const VERTEBRAE = [
  { x: 45, y: 20, hw: 9, hh: 6.0 },
  { x: 51, y: 56, hw: 10, hh: 6.67 },
  { x: 55, y: 92, hw: 11, hh: 7.33 },
  { x: 50, y: 128, hw: 12, hh: 8.0 },
  { x: 41, y: 164, hw: 13, hh: 8.67 },
  { x: 33, y: 200, hw: 14, hh: 9.33 },
  { x: 30, y: 236, hw: 15, hh: 10.0 },
  { x: 35, y: 272, hw: 16, hh: 10.67 },
  { x: 44, y: 308, hw: 17, hh: 11.33 },
  { x: 50, y: 344, hw: 18, hh: 12.0 },
];

const SpineMotif = ({ className = "", tone = "ink" }) => {
  const stroke = tone === "linen" ? "#F2F0E6" : "#1E3A34";
  const dotColor = "#C99A3C";

  // The dot's path runs through every vertebra center, top to bottom.
  // repeatType "mirror" plays it back bottom to top, then loops forever.
  const cxKeyframes = VERTEBRAE.map((v) => v.x);
  const cyKeyframes = VERTEBRAE.map((v) => v.y);

  return (
    <motion.svg
      viewBox="0 0 90 380"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      {VERTEBRAE.map((v, i) => {
        const next = VERTEBRAE[i + 1];
        const opacity = 0.4 + (i / (VERTEBRAE.length - 1)) * 0.6;
        return (
          <g key={i}>
            {next && (
              <line
                x1={v.x}
                y1={v.y + v.hh}
                x2={next.x}
                y2={next.y - next.hh}
                stroke={stroke}
                strokeWidth="1"
                opacity="0.5"
              />
            )}
            <rect
              x={v.x - v.hw}
              y={v.y - v.hh}
              width={v.hw * 2}
              height={v.hh * 2}
              rx="4"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              opacity={opacity}
            />
          </g>
        );
      })}

      <motion.circle
        r="4"
        fill={dotColor}
        initial={{ cx: cxKeyframes[0], cy: cyKeyframes[0] }}
        animate={{ cx: cxKeyframes, cy: cyKeyframes }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
};

export default SpineMotif;