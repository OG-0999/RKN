import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ServiceCards } from "@/components/ServiceCards";
import { ProjectsWorkingWith } from "@/components/ProjectsWorkingWith";

const slides = [
  {
    title: "Find Your Perfect Home.",
    subtitle: "Trusted real estate experts guiding you home."
  },
  {
    title: "Luxury Redefined.",
    subtitle: "Discover properties that match your lifestyle."
  },
  {
    title: "Your Dream Address Awaits.",
    subtitle: "Exclusive listings in premium locations."
  }
];

const heroImages = [
  "/assets/projects/birla-evara/birla-evara-customer-presentation-feb-2026_p001_x11_2_gallery.jpeg",
  "/assets/projects/nambiar-district-25/nambiar-district-25-phase-2-mini-brochure-final_p001_x34_1_gallery.jpeg",
  "/assets/projects/east-park-residences-ramsons-trendsquares/ramsons-brochure-new-launch_p034_x866_1_gallery.jpeg",
  "/assets/projects/trl-the-right-life/trl-10-11-marketing-collaterals-mar-2026-1_p001_x327_1_gallery.jpeg",
];

import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlide = slides[currentSlide % slides.length];
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("section") !== "properties") {
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById("properties")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      params.delete("section");
      const remaining = params.toString();
      const nextUrl = `${window.location.pathname}${remaining ? `?${remaining}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", nextUrl);
    }, 60);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {/* SECTION 1 - HERO */}
      <section className="hero-container relative h-[100dvh] w-full overflow-hidden bg-[#1C1C2E]">
        {heroImages.map((imagePath, index) => (
          <img
            key={imagePath}
            className={`hero-bg-slide ${index === currentSlide ? "active" : ""}`}
            src={imagePath}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
          />
        ))}
        
        {/* Overlay gradient */}
        <div className="overlay" />

        {/* Content */}
        <div className="hero-content h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              {/* Combine title+subtitle animation on mobile to reduce simultaneous layers */}
              {isMobile ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`hero-text-${currentSlide}`}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
                      {activeSlide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md">
                      {activeSlide.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={`title-${currentSlide}`}
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg"
                    >
                      {activeSlide.title}
                    </motion.h1>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`subtitle-${currentSlide}`}
                      initial={shouldReduceMotion ? {} : { opacity: 0 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md"
                    >
                      {activeSlide.subtitle}
                    </motion.p>
                  </AnimatePresence>
                </>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/properties" className="px-8 py-4 rounded-full gold-gradient text-white font-bold shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/40 transition-all hover:-translate-y-1">
                  Explore Properties
                </Link>
                <Link href="/contact" className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:bg-white/20 transition-all hover:-translate-y-1">
                  Book a Consultation
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - ABOUT INTRO */}
      <section className="py-24 bg-[#FDFAF5]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-[#C9A84C] font-semibold tracking-widest uppercase text-sm mb-4">Welcome to Right Key Navigators</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#1C1C2E] mb-8">Where Every Key Opens a New Beginning</h3>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto mb-10" />
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                At Right Key Navigators, we understand that real estate is more than just square footage and floor plans—it's about finding the perfect backdrop for your life's best moments.
              </p>
              <p>
                With over a decade of deep-rooted experience in the Indian luxury real estate market, our expert consultants provide a seamless, transparent, and highly personalized experience whether you are buying your first home or expanding your investment portfolio.
              </p>
              <p>
                Trust, integrity, and exceptional service form the bedrock of our practice. Let us unlock the door to your future.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - FEATURE PILLARS */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#2C3E6B]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Beautiful Scene Around", icon: "✨", desc: "Properties located in serene, lush environments." },
              { title: "Exceptional Lifestyle", icon: "💎", desc: "Premium amenities curated for the extraordinary." },
              { title: "Complete 24/7 Security", icon: "🛡️", desc: "Peace of mind with state-of-the-art surveillance." },
              { title: "Smart Home Designs", icon: "📱", desc: "Future-ready homes with intelligent integrations." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center text-2xl mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-serif font-bold text-[#1C1C2E] mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - SERVICES */}
      <section className="py-24 bg-[#FDFAF5]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-[#C9A84C] font-semibold tracking-widest uppercase text-sm mb-3">What We Offer</p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#1C1C2E]">Our Services</h3>
              <Link href="/services" className="text-[#C9A84C] font-semibold hover:underline text-sm hidden md:block" data-testid="link-all-services">
                View All Services &rarr;
              </Link>
            </div>
          </motion.div>
          <ServiceCards />
        </div>
      </section>

      {/* SECTION 5 - LATEST PROPERTIES */}
      <section id="properties" className="py-24 bg-[#FDFAF5]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[#C9A84C] font-semibold tracking-widest uppercase text-sm mb-4">Discover</h2>
              <h3 className="text-4xl font-serif font-bold text-[#1C1C2E]">Latest Properties</h3>
            </div>
            <Link href="/services/new-residential" className="text-[#C9A84C] font-semibold hover:underline hidden md:block">
              View All &rarr;
            </Link>
          </div>

          <ProjectsWorkingWith />
        </div>
      </section>

      {/* SECTION 7 - TESTIMONIALS */}
      <section className="py-24 bg-[#1C1C2E] text-white relative overflow-hidden">
        <div className="absolute opacity-10 font-serif text-[400px] leading-none text-[#C9A84C] top-[-100px] left-10 pointer-events-none">
          "
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-[#FDFAF5]">What Our Clients Say</h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Priya S.", loc: "Bangalore", text: "Right Key Navigators made our home buying journey truly seamless. Exceptional team!" },
                { name: "Arjun M.", loc: "Hyderabad", text: "Professional, transparent, and always available. Found our dream home in weeks!" },
                { name: "Sneha R.", loc: "Chennai", text: "The end-to-end support was unmatched. Highly recommended." }
              ].map((test, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl relative"
                >
                  <div className="text-[#C9A84C] mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-300 italic mb-6 leading-relaxed">"{test.text}"</p>
                  <div>
                    <h5 className="font-bold text-white">{test.name}</h5>
                    <p className="text-xs text-gray-500">{test.loc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
