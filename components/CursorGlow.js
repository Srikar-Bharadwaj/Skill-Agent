"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
        animate={{ 
          x: mousePos.x - 128, 
          y: mousePos.y - 128 
        }}
        transition={{ 
          type: "tween", 
          ease: "easeOut", 
          duration: 0.15 
        }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-[60px]"
        animate={{ 
          x: mousePos.x - 64, 
          y: mousePos.y - 64 
        }}
        transition={{ 
          type: "tween", 
          ease: "easeOut", 
          duration: 0.3 
        }}
      />
    </div>
  );
}
