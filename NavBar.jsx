import React, { useEffect, useState } from "react";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { gsap } from "gsap";
import "../styles.css"; // ensure this line exists

export default function NavBar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [soundOn, setSoundOn] = useState(
    (localStorage.getItem("sound") || "on") === "on"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sound", soundOn ? "on" : "off");
  }, [soundOn]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".navbar-logo",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      ".navbar-title",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  return (
    <header
      style={{
        width: "100%",
        padding: "0.9rem 2rem",
        background: theme === "dark" ? "#0a0e18" : "#ffffff",
        color: theme === "dark" ? "#f9fafb" : "#111827",
        borderBottom:
          theme === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 999,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* LEFT SECTION */}
      <div
        className="navbar-left"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Glowing circular logo */}
        <div
          className="navbar-logo"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background:
              theme === "dark"
                ? "radial-gradient(circle at center, #1c1c2e 55%, #2a0a5f 100%)"
                : "#ffffff",
            boxShadow:
              theme === "dark"
                ? "0 0 18px rgba(168,85,247,0.45)"
                : "0 0 10px rgba(79,70,229,0.3)",
            border: "1.5px solid rgba(168,85,247,0.6)",
            animation: "glowPulse 3.5s ease-in-out infinite",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <img
            src="/assets/divyam-logo.png"
            alt="Divyam AI logo"
            style={{
              width: "82%",
              height: "82%",
              objectFit: "contain",
              filter:
                theme === "dark"
                  ? "drop-shadow(0 0 8px rgba(168,85,247,0.9)) brightness(1.1)"
                  : "drop-shadow(0 0 4px rgba(79,70,229,0.5)) brightness(1.15)",
              transition: "filter 0.3s ease",
            }}
          />
        </div>

        {/* Brand title */}
        <h1
          className="navbar-title"
          style={{
            fontSize: 25,
            fontWeight: 900,
            letterSpacing: "0.7px",
            background:
              "linear-gradient(90deg, #c084fc 0%, #8b5cf6 50%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow:
              theme === "dark"
                ? "0 0 18px rgba(147,51,234,0.4), 0 0 6px rgba(79,70,229,0.35)"
                : "0 0 10px rgba(59,130,246,0.3)",
            margin: 0,
          }}
        >
          DIVYAM AI
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div style={{ display: "flex", gap: 14 }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: theme === "dark" ? "#e2e8f0" : "#111827",
            cursor: "pointer",
            padding: 6,
          }}
          onClick={() => setSoundOn((s) => !s)}
          title="Toggle sound"
        >
          {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            color: theme === "dark" ? "#e2e8f0" : "#111827",
            cursor: "pointer",
            padding: 6,
          }}
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
