import React from "react";
import { motion } from "framer-motion";
import ConfidenceBar from "./ConfidenceBar";

export default function ResultDisplay({ maskSrc, classification, confidence }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ maxWidth: 640, margin: "28px auto", textAlign: "center" }}>
      {maskSrc && (
        <motion.img src={maskSrc} alt="Segmentation Mask" className="result-image"
          initial={{ opacity: 0.6, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.6 }} />
      )}
      <h2 style={{ marginTop: 16, fontWeight: 900, letterSpacing: 0.3 }}>{classification}</h2>
      <div style={{ maxWidth: 480, margin: "16px auto 0" }}>
        <ConfidenceBar value={confidence} />
      </div>
    </motion.div>
  );
}
