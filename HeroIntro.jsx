import React from "react";
import { motion } from "framer-motion";
import ParticleBackdrop from "./ParticleBackdrop";

export default function HeroIntro({ onStart }){
  return (
    <section className="hero">
      <ParticleBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6, ease: "easeOut" }}
        style={{ position:'relative' }}
      >
        <h1 className="hero-title">Divyam AI — ICH Detection</h1>
        <p className="hero-sub">
          Balanced clinical clarity with a heroic, next-gen feel. Upload anonymized scans,
          watch our neural engine analyze, and compare results with confidence.
        </p>
        <motion.button className="btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} onClick={onStart}>
          Start Analysis
        </motion.button>
      </motion.div>
    </section>
  );
}
