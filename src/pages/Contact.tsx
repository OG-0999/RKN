import { QuoteForm } from "@/components/QuoteForm";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFAF5]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1C1C2E] mb-6">Let's Find Your Perfect Home Together</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reach out to our experts for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1C1C2E] mb-6">Contact Information</h3>
              <div className="space-y-6 text-gray-600">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] shrink-0">
                    📍
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1C1C2E] mb-1">Office Address</h5>
                    <p>Level 14, Concorde Tower C, UB City,<br/>1 Vittal Mallya Road, Bengaluru 560001</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1C1C2E] mb-1">Email</h5>
                    <p>contact@rightkeynavigators.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 relative flex items-center justify-center">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-[#1C1C2E]/5" />
              <div className="text-center p-4">
                <div className="text-[#C9A84C] text-3xl mb-2">🗺️</div>
                <p className="font-semibold text-gray-500">Interactive Map Location</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
