import { Link } from "wouter";
import { motion } from "framer-motion";
import { FoundersSection } from "@/components/FoundersSection";

export function About() {
  return (
    <div className="w-full pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] bg-[#1C1C2E] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="/hero1.png" alt="About Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-[#1C1C2E] to-transparent" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-white mb-4"
          >
            About Right Key <span className="text-[#C9A84C]">Navigators</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            A legacy of trust, excellence, and exceptional real estate experiences.
          </motion.p>
        </div>
      </section>

      <FoundersSection />

      {/* Story */}
      <section className="py-24 bg-[#FDFAF5]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1C2E] mb-6">Our Mission & Vision</h2>
            <div className="w-16 h-1 bg-[#C9A84C] mx-auto mb-8" />
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Right Key Navigators was founded on a simple premise: luxury real estate should be an experience, not just a transaction. We aim to redefine the property journey by providing bespoke, transparent, and highly strategic advice to our clients.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision is to be the most trusted and sought-after real estate consultancy in India, recognized for our unwavering integrity, deep market knowledge, and client-first approach. We believe in building relationships that last generations.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#C9A84C] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Happy Clients", value: "500+" },
              { label: "Years Experience", value: "10+" },
              { label: "Projects Delivered", value: "50+" },
              { label: "Presence", value: "Pan-India" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.value}</div>
                <div className="text-sm font-semibold tracking-wider uppercase opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
