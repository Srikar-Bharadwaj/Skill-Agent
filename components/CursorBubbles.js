"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function CursorBubbles() {
  const [bubbles, setBubbles] = useState([]);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Generate initial bubbles
    const newBubbles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 40 + 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setBubbles(newBubbles);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} mousePos={mousePos} />
      ))}
    </div>
  );
}

function Bubble({ bubble, mousePos }) {
  const controls = useAnimation();
  const position = useRef({ x: bubble.x, y: bubble.y });
  const basePosition = useRef({ x: bubble.x, y: bubble.y });

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const bx = position.current.x;
      const by = position.current.y;

      const dx = mx - bx;
      const dy = my - by;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // If mouse is close (within 150px), repel the bubble
      if (dist < 150) {
        const repelStrength = (150 - dist) / 10;
        position.current.x -= (dx / dist) * repelStrength;
        position.current.y -= (dy / dist) * repelStrength;
      } else {
        // Slowly return to base position or just drift slightly
        position.current.x += (basePosition.current.x - position.current.x) * 0.02;
        position.current.y += (basePosition.current.y - position.current.y) * 0.02;
      }

      controls.set({ x: position.current.x, y: position.current.y });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [controls, mousePos]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: bubble.x, y: bubble.y }}
      className="absolute rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
      style={{
        width: bubble.size,
        height: bubble.size,
        opacity: bubble.opacity,
      }}
    />
  );
}
