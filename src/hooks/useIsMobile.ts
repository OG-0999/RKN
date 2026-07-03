import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // older browsers may use addListener
    if (m.addEventListener) m.addEventListener('change', handler);
    else m.addListener(handler as any);
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', handler);
      else m.removeListener(handler as any);
    };
  }, [breakpoint]);

  return isMobile;
}
