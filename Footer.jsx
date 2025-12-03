import React from "react";
export default function Footer(){
  return(
    <footer style={{textAlign:"center",margin:"30px 0",fontSize:12,color:"var(--muted)"}}>
      © {new Date().getFullYear()} Divyam AI — Built for Life Saving Precision
    </footer>
  );
}
