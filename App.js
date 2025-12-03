import React, { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import HeroIntro from "./components/HeroIntro";
import FileUpload from "./components/FileUpload";
import ResultDashboard from "./components/ResultDashboard";
import ProcessingOverlay from "./components/ProcessingOverlay";
import ToastViewport from "./components/ToastViewport";
import toast from "react-hot-toast";
import "./styles.css";

export default function App() {
  // Scene flow: intro → upload → processing → result
  const [scene, setScene] = useState("intro");

  const [file, setFile] = useState(null);
  const [originalSrc, setOriginalSrc] = useState(null);
  const [maskSrc, setMaskSrc] = useState(null);
  const [classification, setClassification] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // progress management
  const [progress, setProgress] = useState(0);
  const rafId = useRef(null);
  const startTime = useRef(0);
  const targetDuration = useRef(8000);
  const backendDone = useRef(false);
  const revealAt = useRef(0);

  // sync sound state
  const soundOn = useRef((localStorage.getItem("sound") || "on") === "on");
  useEffect(() => {
    const observer = new MutationObserver(() => {
      soundOn.current = (localStorage.getItem("sound") || "on") === "on";
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // file change handler
  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setMaskSrc(null);
    setClassification("");
    setConfidence(null);
    setMessage("");
    setProgress(0);

    if (originalSrc) URL.revokeObjectURL(originalSrc);
    setOriginalSrc(URL.createObjectURL(f));
    setScene("upload");
  };

  // animation progress control
  const stopLoop = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = null;
  };

  const randomDelay = () =>
    Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000;

  const loop = (t) => {
    if (!startTime.current) startTime.current = t;
    const elapsed = t - startTime.current;

    if (!backendDone.current) {
      setProgress(Math.min(95, (elapsed / targetDuration.current) * 95));
      rafId.current = requestAnimationFrame(loop);
      return;
    }

    const remaining = Math.max(0, revealAt.current - t);
    if (remaining <= 0) {
      setProgress(100);
      stopLoop();
    } else {
      const timeWindow = revealAt.current - backendDone.currentTime;
      const ratio = 1 - remaining / timeWindow;
      setProgress(95 + ratio * 5);
      rafId.current = requestAnimationFrame(loop);
    }
  };

  // handle upload → backend → results
  const onUpload = async () => {
    if (!file) {
      toast.error("Please upload a scan first.");
      return;
    }

    startTime.current = 0;
    targetDuration.current = randomDelay();
    backendDone.current = false;
    backendDone.currentTime = 0;
    setProgress(0);

    setScene("processing");
    setLoading(true);
    setMessage("Analyzing brain scan…");
    toast.loading("Analyzing scan…", { id: "status" });
    rafId.current = requestAnimationFrame(loop);

    const fd = new FormData();
    fd.append("file", file);

    let data = null;
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Server error: " + res.status);
      data = await res.json();
    } catch (err) {
      setMessage("Prediction error: " + err.message);
      toast.error(`Error: ${err.message}`, { id: "status" });
      stopLoop();
      setScene("upload");
      setLoading(false);
      return;
    }

    const elapsedLoop = performance.now() - startTime.current;
    const remaining = Math.max(0, targetDuration.current - elapsedLoop);
    backendDone.current = true;
    backendDone.currentTime = performance.now();
    revealAt.current = performance.now() + (remaining > 0 ? remaining : 500);
    setMessage("Scanning brain regions… refining overlays");

    await new Promise((r) => setTimeout(r, remaining > 0 ? remaining : 500));

    setMaskSrc(`data:image/png;base64,${data.mask_image}`);
    setClassification(data.classification);
    setConfidence(parseFloat(data.confidence || 0).toFixed(2));
    setMessage("Prediction complete!");
    toast.success("Prediction complete", { id: "status" });

    if (soundOn.current) {
      const audio = new Audio("/sfx/success.mp3");
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }

    setLoading(false);
    setScene("result");
  };

  useEffect(() => () => stopLoop(), []);

  return (
    <>
      <NavBar />
      <ToastViewport />

      {scene === "intro" && <HeroIntro onStart={() => setScene("upload")} />}

      {(scene === "upload" || scene === "result") && (
        <div className="container">
          <div className="card">
            <h1
              style={{
                textAlign: "center",
                marginBottom: 10,
                fontWeight: 900,
              }}
            >
              Divyam AI — Brain Hemorrhage Detection
            </h1>

            <FileUpload onFileChange={onFileChange} loading={loading} />

            <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
              <button
                onClick={onUpload}
                disabled={loading || !file}
                className="btn"
              >
                {loading ? "Processing…" : "Start Prediction"}
              </button>
              {file && !loading && (
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  Selected: {file.name}
                </span>
              )}
            </div>

            {scene === "result" && maskSrc && originalSrc && (
              <ResultDashboard
                originalSrc={originalSrc}
                maskSrc={maskSrc}
                classification={classification}
                confidence={confidence}
              />
            )}
          </div>
        </div>
      )}

      <ProcessingOverlay
        visible={scene === "processing"}
        percent={progress}
        message={message}
      />
    </>
  );
}
