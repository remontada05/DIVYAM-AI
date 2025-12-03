import React from "react";
import { motion } from "framer-motion";

export default function ConfidenceBar({ value }) {
  // Convert safely — if undefined/null/NaN, default to 0
  const numericValue = parseFloat(value);
  const pct = isNaN(numericValue)
    ? 0
    : Math.max(0, Math.min(1, numericValue));

  return (
    <div className="progress" aria-label="AI confidence level">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct * 100}%` }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        style={{
          height: "100%",
          background: "linear-gradient(90deg, var(--accent), var(--primary))",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
          fontWeight: 800,
          textShadow: "0 1px 2px rgba(0,0,0,.6)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {(pct * 100).toFixed(1)}%
      </div>
    </div>
  );
}
