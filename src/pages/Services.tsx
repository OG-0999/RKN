import { motion } from "framer-motion";
import { ServiceCards } from "@/components/ServiceCards";

export function ServicesHub() {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFAF5]">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#C9A84C] font-semibold tracking-widest uppercase text-sm mb-4">What We Offer</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1C1C2E] mb-6">Our Services</h1>
          <div className="w-20 h-1 bg-[#C9A84C] mb-8" />
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Comprehensive real estate solutions designed around your unique goals — whether you are buying your first home, selling a property, or building a portfolio.
          </p>
        </motion.div>

        <ServiceCards />
      </div>
    </div>
  );
}
