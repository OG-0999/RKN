import { QuoteForm } from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function Contact() {
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 767px)");

    const getHeader = () => document.querySelector("header");

    const update = () => {
      if (!mq.matches) {
        setHeaderHeight(null);
        return;
      }
      const header = getHeader();
      if (!header) return;
      const h = Math.ceil(header.getBoundingClientRect().height);
      setHeaderHeight(h);
    };

    update();

    // watch header size changes (mobile menu open/close)
    const header = getHeader();
    let ro: ResizeObserver | null = null;
    if (header && (window as any).ResizeObserver) {
      ro = new (window as any).ResizeObserver(update);
      ro.observe(header);
    }

    const onResize = () => update();
    window.addEventListener("resize", onResize);
    // also listen for orientation change
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (ro && header) ro.unobserve(header);
    };
  }, []);

  return (
    <div ref={rootRef} className="w-full pt-32 pb-24 bg-[#FDFAF5]" style={headerHeight ? { paddingTop: `${headerHeight}px` } : undefined}>
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
                    <p>
                      Right Key Navigators India Private Limited<br/>
                      3rd Floor, No. 589, 60 Feet Main Road,<br/>
                      A.E.C.S. Layout,<br/>
                      Above State Bank of India,<br/>
                      Kundalahalli,<br/>
                      Bangalore – 560037,<br/>
                      Karnataka, India
                    </p>
                    <div className="mt-4">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=3rd%20Floor%2C%20No.%20589%2C%2060%20Feet%20Main%20Road%2C%20A.E.C.S.%20Layout%2C%20Above%20State%20Bank%20of%20India%2C%20Kundalahalli%2C%20Bangalore%20-%20560037"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#C9A84C] text-[#1C1C2E] px-4 py-2 rounded-md font-semibold text-sm"
                      >
                        Get Directions
                      </a>
                    </div>
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

            <div className="h-64 rounded-2xl overflow-hidden border border-gray-200 relative">
              <iframe
                title="Right Key Navigators - Office Location"
                src="https://www.google.com/maps?q=3rd%20Floor%2C%20No.%20589%2C%2060%20Feet%20Main%20Road%2C%20A.E.C.S.%20Layout%2C%20Above%20State%20Bank%20of%20India%2C%20Kundalahalli%2C%20Bangalore%20560037&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=3rd%20Floor%2C%20No.%20589%2C%2060%20Feet%20Main%20Road%2C%20A.E.C.S.%20Layout%2C%20Above%20State%20Bank%20of%20India%2C%20Kundalahalli%2C%20Bangalore%20-%20560037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#1C1C2E] px-3 py-1 rounded-md font-semibold text-sm shadow-sm"
                >
                  Open in Google Maps
                </a>
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
