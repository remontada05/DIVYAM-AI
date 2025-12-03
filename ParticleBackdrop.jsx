import React, { useEffect, useRef } from "react";

export default function ParticleBackdrop(){
  const canvasRef = useRef(null);

  useEffect(()=>{
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let w, h, raf;

    const particles = Array.from({length: 60}, ()=>({
      x: Math.random(), y: Math.random(),
      r: Math.random()*1.6 + 0.6,
      vx: (Math.random()-.5)*0.0008,
      vy: (Math.random()-.5)*0.0008
    }));

    const resize = ()=>{ w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    const step = ()=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38bdf8';
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>1) p.vx*=-1;
        if(p.y<0||p.y>1) p.vy*=-1;
        ctx.globalAlpha = 0.28;
        ctx.beginPath(); ctx.arc(p.x*w, p.y*h, p.r, 0, Math.PI*2); ctx.fill();
      });
      raf = requestAnimationFrame(step);
    };

    resize(); step(); window.addEventListener('resize', resize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  },[]);

  return <canvas ref={canvasRef} style={{position:'absolute', inset:0, width:'100%', height:220, opacity:.6}}/>;
}
