import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function FileUpload({ onFileChange, loading }){
  const [dragOver, setDragOver] = useState(false);
  const onDrop = useCallback((e)=>{
    e.preventDefault(); setDragOver(false);
    const files = Array.from(e.dataTransfer.files||[]);
    if(files.length) onFileChange({ target: { files } });
  },[onFileChange]);

  return (
    <div style={{ margin: "16px auto 22px", textAlign: "center" }}>
      <div
        onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={onDrop}
        style={{
          border:`2px dashed ${dragOver?"var(--primary)":"rgba(120,144,156,.35)"}`,
          borderRadius:20,padding:22,background:dragOver?"rgba(30,136,229,.08)":"transparent",
          transition:"border .2s, background .2s",
        }}
      >
        <input id="fileInput" type="file" accept="image/*" onChange={onFileChange} style={{display:"none"}} disabled={loading}/>
        <motion.label htmlFor="fileInput" whileHover={{scale: loading?1:1.04}} whileTap={{scale: loading?1:.97}} className="btn" style={{borderRadius:18}}>
          <Upload size={18}/> Upload Brain Scan
        </motion.label>
        <p style={{ marginTop: 10, color: "var(--muted)", fontSize: 13 }}>
          Drag & drop PNG/JPG or click to select.
        </p>
      </div>
    </div>
  );
}
