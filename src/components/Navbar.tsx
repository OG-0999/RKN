import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) {
      return;
    }

    const logoEl = logo;
    const letters = Array.from(logoEl.querySelectorAll<HTMLElement>(".rkn-letter"));
    if (!letters.length) {
      return;
    }

    const timeoutIds: number[] = [];
    const EXPAND_STAGGER = 120;
    const COLLAPSE_STAGGER = 95;
    const BLUR_LEAD = 80;
    const BASE_CHAR_STEP = 34;
    const LONG_WORD_CHAR_STEP = 24;
    const HOLD_EXPANDED = 2100;
    const HOLD_COLLAPSED = 950;

    const queueTimeout = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeoutIds.push(timeoutId);
    };

    const setInitialState = () => {
      letters.forEach((el) => {
        const short = el.dataset.short ?? el.textContent?.charAt(0) ?? "";
        el.textContent = short;
        el.classList.remove("expanded", "morphing");
      });
      logoEl.classList.remove("expanded");
    };

    const animateToFull = (el: HTMLElement, start: number) => {
      const short = el.dataset.short ?? el.textContent?.charAt(0) ?? "";
      const full = el.dataset.full ?? short;
      const charStep = full.length > 8 ? LONG_WORD_CHAR_STEP : BASE_CHAR_STEP;

      queueTimeout(() => {
        el.classList.add("morphing");
      }, start);

      let cursor = start + BLUR_LEAD;
      for (let idx = Math.max(short.length + 1, 1); idx <= full.length; idx++) {
        const partial = full.slice(0, idx);
        queueTimeout(() => {
          el.textContent = partial;
        }, cursor);
        cursor += charStep;
      }

      queueTimeout(() => {
        el.textContent = full;
        el.classList.remove("morphing");
        el.classList.add("expanded");
      }, cursor);

      return cursor;
    };

    const animateToShort = (el: HTMLElement, start: number) => {
      const short = el.dataset.short ?? el.textContent?.charAt(0) ?? "";
      const full = el.dataset.full ?? short;
      const current = el.textContent && el.textContent.length > short.length ? el.textContent : full;
      const charStep = current.length > 8 ? LONG_WORD_CHAR_STEP : BASE_CHAR_STEP;

      queueTimeout(() => {
        el.classList.add("morphing");
      }, start);

      let cursor = start + BLUR_LEAD;
      for (let idx = current.length - 1; idx >= short.length; idx--) {
        const partial = current.slice(0, idx);
        queueTimeout(() => {
          el.textContent = partial || short;
        }, cursor);
        cursor += charStep;
      }

      queueTimeout(() => {
        el.textContent = short;
        el.classList.remove("morphing", "expanded");
      }, cursor);

      return cursor;
    };

    function expand() {
      logoEl.classList.add("expanded");
      let maxEnd = 0;

      letters.forEach((el, i) => {
        const endTime = animateToFull(el, i * EXPAND_STAGGER);
        maxEnd = Math.max(maxEnd, endTime);
      });

      return maxEnd;
    }

    function collapse() {
      logoEl.classList.remove("expanded");
      let maxEnd = 0;

      [...letters].reverse().forEach((el, i) => {
        const endTime = animateToShort(el, i * COLLAPSE_STAGGER);
        maxEnd = Math.max(maxEnd, endTime);
      });

      return maxEnd;
    }

    function loop() {
      const expandEnd = expand();

      queueTimeout(() => {
        const collapseEnd = collapse();

        queueTimeout(loop, collapseEnd + HOLD_COLLAPSED);
      }, expandEnd + HOLD_EXPANDED);
    }

    setInitialState();
    queueTimeout(loop, 700);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container relative mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/">
          <div className="navbar-left flex items-center gap-2 cursor-pointer group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
              <path d="m21 2-9.6 9.6"/>
              <circle cx="7.5" cy="15.5" r="5.5"/>
            </svg>
            <div ref={logoRef} className="rkn-logo" aria-label="Right Key Navigators logo">
              <span className="rkn-letter white-word" data-short="R" data-full="Right">R</span>
              <span className="rkn-letter white-word" data-short="K" data-full="Key">K</span>
              <span className="rkn-letter gold-word" data-short="N" data-full="Navigators">N</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-right hidden md:flex items-center gap-8">
          <NavLink href="/" isScrolled={isScrolled} currentPath={location}>Home</NavLink>
          <NavLink href="/about" isScrolled={isScrolled} currentPath={location}>About Us</NavLink>
          
          <div className="relative group">
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              (location.startsWith("/services") || isScrolled || location !== "/") 
                ? "text-[#1C1C2E] hover:text-[#C9A84C]" 
                : "text-[#FDFAF5] hover:text-[#C9A84C]"
            }`}>
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-64 flex flex-col">
                <Link href="/services/new-residential" className="px-4 py-3 hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1C1C2E] transition-colors">New Residential Properties</Link>
                <Link href="/services/resale" className="px-4 py-3 hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1C1C2E] transition-colors">Resale Consultancy</Link>
                <Link href="/services/end-to-end" className="px-4 py-3 hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1C1C2E] transition-colors">End-to-End Solution</Link>
                <Link href="/services/property-management" className="px-4 py-3 hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1C1C2E] transition-colors">Property Management</Link>
              </div>
            </div>
          </div>

          <NavLink href="/properties" isScrolled={isScrolled} currentPath={location}>Properties</NavLink>

          <NavLink href="/contact" isScrolled={isScrolled} currentPath={location}>Contact</NavLink>
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="px-6 py-2.5 rounded-full gold-gradient text-white text-sm font-semibold shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/40 transition-all hover:-translate-y-0.5">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled || location !== "/" ? "text-[#1C1C2E]" : "text-[#FDFAF5]"} />
          ) : (
            <Menu className={isScrolled || location !== "/" ? "text-[#1C1C2E]" : "text-[#FDFAF5]"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              <Link href="/" className="text-[#1C1C2E] font-medium p-2 hover:bg-gray-50 rounded-lg">Home</Link>
              <Link href="/about" className="text-[#1C1C2E] font-medium p-2 hover:bg-gray-50 rounded-lg">About Us</Link>
              <div className="pl-2 flex flex-col gap-2 border-l-2 border-[#C9A84C] ml-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Services</span>
                <Link href="/services/new-residential" className="text-[#1C1C2E] text-sm p-2 hover:bg-gray-50 rounded-lg">New Residential</Link>
                <Link href="/services/resale" className="text-[#1C1C2E] text-sm p-2 hover:bg-gray-50 rounded-lg">Resale Consultancy</Link>
                <Link href="/services/end-to-end" className="text-[#1C1C2E] text-sm p-2 hover:bg-gray-50 rounded-lg">End-to-End Solution</Link>
                <Link href="/services/property-management" className="text-[#1C1C2E] text-sm p-2 hover:bg-gray-50 rounded-lg">Property Management</Link>
              </div>
              <Link href="/properties" className="text-[#1C1C2E] font-medium p-2 hover:bg-gray-50 rounded-lg">Properties</Link>
              <Link href="/contact" className="text-[#1C1C2E] font-medium p-2 hover:bg-gray-50 rounded-lg">Contact</Link>
              <Link href="/contact" className="mt-4 px-6 py-3 rounded-full gold-gradient text-white text-center font-semibold shadow-lg">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children, isScrolled, currentPath }: { href: string, children: React.ReactNode, isScrolled: boolean, currentPath: string }) {
  const isActive = currentPath === href;
  const isDarkText = isScrolled || currentPath !== "/";
  
  return (
    <Link href={href}>
      <span className={`text-sm font-medium transition-colors relative group cursor-pointer ${
        isActive 
          ? "text-[#C9A84C]" 
          : isDarkText 
            ? "text-[#1C1C2E] hover:text-[#C9A84C]" 
            : "text-[#FDFAF5] hover:text-[#C9A84C]"
      }`}>
        {children}
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A84C] transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`} />
      </span>
    </Link>
  );
}
