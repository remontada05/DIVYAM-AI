import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

/**
 * Calm, premium loader:
 * - Subtle breathing core
 * - Slow scan arc
 * - Soft shadows (no harsh neon)
 */
export default function NeuralScanLoader({ message = "Scanning brain regions…" }) {
  const ref = useRef(null);
  const [percent, setPercent] = useState(0);

  // Gentle fake percent to feel alive (doesn't need backend)
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p = (p + Math.random() * 4) % 100;
      setPercent(Math.floor(p));
    }, 350);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ns-core", {
        scale: 1.04,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
        // subtle brightness like your older look
        filter: "drop-shadow(0 0 12px rgba(56,189,248,.45))",
      });
      gsap.to(".ns-arc", {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 8,
        ease: "none",
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ display: "grid", placeItems: "center", textAlign: "center", marginTop: 24 }}>
      <svg viewBox="0 0 200 200" width="150" height="150" aria-hidden="true">
        <defs>
          <radialGradient id="ns-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1e88e5" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        <circle className="ns-core" cx="100" cy="100" r="40" fill="url(#ns-grad)" />
        <circle cx="100" cy="100" r="62" stroke="url(#ns-grad)" strokeWidth="1.6" fill="none" opacity="0.55" />
        <g className="ns-arc" opacity="0.5">
          <path d="M100 38 A62 62 0 0 1 162 100" stroke="url(#ns-grad)" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ fontWeight: 800, fontSize: 22, color: "#38bdf8", textShadow: "0 0 8px rgba(30,136,229,.35)" }}
      >
        {percent}%
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: 8, fontSize: 14, color: "var(--muted)" }}
      >
        {message}
      </motion.p>
    </div>
  );
}
