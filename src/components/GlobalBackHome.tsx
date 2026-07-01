import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useRef } from "react";

const PREVIOUS_ROUTE_KEY = "rkn_previous_route";
const CURRENT_ROUTE_KEY = "rkn_current_route";

function normalizeRoute(route: string | null): string | null {
  if (!route) {
    return null;
  }

  if (route.startsWith("/about")) {
    return "/about";
  }

  if (route.startsWith("/founders-story")) {
    return "/founders-story";
  }

  return route;
}

export function GlobalBackHome() {
  const [location, setLocation] = useLocation();
  const isPropertyDetailRoute = location.startsWith("/properties/");
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const currentRoute = normalizeRoute(location);
    const storedCurrentRoute = normalizeRoute(sessionStorage.getItem(CURRENT_ROUTE_KEY));

    if (storedCurrentRoute && storedCurrentRoute !== currentRoute) {
      sessionStorage.setItem(PREVIOUS_ROUTE_KEY, storedCurrentRoute);
    }

    if (currentRoute) {
      sessionStorage.setItem(CURRENT_ROUTE_KEY, currentRoute);
    }
  }, [location]);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const navigateBackWithFallback = (fallbackPath: "/about" | "/") => {
    const startPath = location;

    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
    }

    window.history.back();

    fallbackTimerRef.current = window.setTimeout(() => {
      if (window.location.pathname === startPath) {
        setLocation(fallbackPath);
      }
      fallbackTimerRef.current = null;
    }, 120);
  };

  const handleBack = () => {
    const normalizedLocation = normalizeRoute(location);
    const previousRoute = normalizeRoute(sessionStorage.getItem(PREVIOUS_ROUTE_KEY));

    if (normalizedLocation === "/founders-story") {
      if (previousRoute === "/about") {
        navigateBackWithFallback("/about");
        return;
      }

      setLocation("/");
      return;
    }

    if (normalizedLocation === "/about") {
      navigateBackWithFallback("/");
      return;
    }

    setLocation("/");
  };

  if (location === "/" || isPropertyDetailRoute) {
    return null;
  }

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={handleBack}
      className="fixed left-4 top-20 z-90 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 px-4 py-2 text-sm font-semibold text-[#1C1C2E] shadow-md backdrop-blur-sm transition-colors hover:bg-white"
      aria-label="Back to Home"
      data-testid="button-global-back-home"
    >
      <ArrowLeft className="h-4 w-4" />
      Back Home
    </motion.button>
  );
}
