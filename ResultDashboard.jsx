import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import ConfidenceBar from "./ConfidenceBar";

function makeScanId() {
  const t = new Date();
  const rand = Math.floor(Math.random() * 900 + 100);
  return `DIVYAM-${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, "0")}${String(
    t.getDate()
  ).padStart(2, "0")}-${t.getHours()}${String(t.getMinutes())}${String(t.getSeconds())}-${rand}`;
}

export default function ResultDashboard({ originalSrc, maskSrc, classification, confidence }) {
  const idRef = useRef(makeScanId());
  const dateStr = useMemo(() => new Date().toLocaleString(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ textAlign: "center", marginTop: 30 }}
    >
      <h2 style={{ marginBottom: 10, fontWeight: 900 }}>AI Prediction Results</h2>

      {/* Side-by-side comparison */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 20,
          marginTop: 20,
        }}
      >
        <div className="card" style={{ flex: "1 1 350px" }}>
          <h3 style={{ color: "var(--muted)" }}>Original CT Scan</h3>
          <img
            src={originalSrc}
            alt="Original brain scan"
            className="result-image"
            style={{ marginTop: 10 }}
          />
        </div>

        <div className="card" style={{ flex: "1 1 350px" }}>
          <h3 style={{ color: "var(--muted)" }}>AI Predicted Mask</h3>
          <img
            src={maskSrc}
            alt="AI predicted segmentation mask"
            className="result-image"
            style={{ marginTop: 10 }}
          />
        </div>
      </div>

      {/* Classification and confidence */}
      <div style={{ maxWidth: 480, margin: "30px auto" }}>
        <h2 style={{ fontWeight: 800 }}>{classification}</h2>
        <ConfidenceBar value={confidence} />
      </div>

      {/* Scan Info Card */}
      <div className="card" style={{ marginTop: 25 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Scan ID</div>
            <div style={{ fontWeight: 700 }}>{idRef.current}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Completed</div>
            <div style={{ fontWeight: 700 }}>{dateStr}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Status</div>
            <div style={{ fontWeight: 700, color: "var(--success)" }}>AI Verified</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
