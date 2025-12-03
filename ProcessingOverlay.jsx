import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProcessingOverlay({ visible, percent, message="Analyzing scan…" }){
  const ref = useRef(null);

  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current;
    gsap.to(el, { autoAlpha: visible ? 1 : 0, duration: .25 });
  },[visible]);

  if (!visible) return null;

  return (
    <div ref={ref} style={{
      position:"fixed", inset:0, display:"grid", placeItems:"center",
      background:"rgba(0,0,0,.45)", backdropFilter:"blur(6px)", zIndex:60
    }}>
      <div style={{
        background:"var(--card)", borderRadius:18, padding:22,
        boxShadow:"var(--shadow-2)", border:"1px solid rgba(120,144,156,.18)"
      }}>
        <div style={{ textAlign:"center" }}>
          <svg viewBox="0 0 200 200" width="170" height="170" aria-hidden="true">
            <defs>
              <radialGradient id="scanG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)"/>
                <stop offset="100%" stopColor="var(--primary)" stopOpacity=".25"/>
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="40" fill="url(#scanG)" />
            <circle cx="100" cy="100" r="66" stroke="url(#scanG)" strokeWidth="1.6" fill="none" opacity=".55" />
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="8s" repeatCount="indefinite"/>
              <path d="M100 36 A64 64 0 0 1 164 100" stroke="url(#scanG)" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".6"/>
            </g>
          </svg>
          <div style={{ fontWeight:900, fontSize:24, color:"var(--primary)" }}>{Math.floor(percent)}%</div>
          <div style={{ color:"var(--muted)", marginTop:8 }}>{message}</div>
        </div>
      </div>
    </div>
  );
}
