import { useEffect } from "react";

export function CursorTrail() {
  useEffect(() => {
    const bubbles: HTMLDivElement[] = [];
    const maxBubbles = 20;

    const handleMouseMove = (e: MouseEvent) => {
      // Create a bubble
      if (Math.random() > 0.5) return; // throttle

      const bubble = document.createElement("div");
      bubble.className = "fixed rounded-full pointer-events-none z-[9998]";
      bubble.style.width = Math.random() * 8 + 4 + "px";
      bubble.style.height = bubble.style.width;
      bubble.style.left = e.clientX + "px";
      bubble.style.top = e.clientY + "px";
      bubble.style.background = "radial-gradient(circle at center, #C9A84C, transparent)";
      bubble.style.boxShadow = "0 0 10px #C9A84C";
      bubble.style.opacity = "0.6";
      bubble.style.transform = "translate(-50%, -50%)";
      bubble.style.transition = "opacity 1s ease-out, transform 1s ease-out";
      
      document.body.appendChild(bubble);
      bubbles.push(bubble);

      // Animate out
      requestAnimationFrame(() => {
        bubble.style.transform = `translate(-50%, -50%) translateY(20px) scale(0)`;
        bubble.style.opacity = "0";
      });

      // Cleanup
      setTimeout(() => {
        bubble.remove();
        const index = bubbles.indexOf(bubble);
        if (index > -1) bubbles.splice(index, 1);
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      bubbles.forEach(b => b.remove());
    };
  }, []);

  return null;
}
