import { Link } from "wouter";
import { motion } from "framer-motion";

const HouseIllustration = () => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect x="60" y="130" width="200" height="140" rx="4" fill="#d4a85a" fillOpacity="0.18" />
    <rect x="80" y="130" width="160" height="140" rx="4" fill="#C9A84C" fillOpacity="0.12" />
    <path d="M40 130 L160 40 L280 130" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#C9A84C" fillOpacity="0.08" />
    <rect x="120" y="175" width="45" height="60" rx="2" fill="#C9A84C" fillOpacity="0.25" />
    <rect x="175" y="155" width="50" height="35" rx="2" fill="#C9A84C" fillOpacity="0.18" />
    <rect x="80" y="155" width="30" height="30" rx="2" fill="#C9A84C" fillOpacity="0.18" />
    <line x1="160" y1="40" x2="160" y2="60" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
    <rect x="148" y="58" width="24" height="20" rx="2" fill="#C9A84C" fillOpacity="0.6" />
    <rect x="55" y="126" width="210" height="8" rx="4" fill="#C9A84C" fillOpacity="0.4" />
    <path d="M230 130 L230 270" stroke="#C9A84C" strokeWidth="2" strokeOpacity="0.3" />
    <path d="M90 130 L90 270" stroke="#C9A84C" strokeWidth="2" strokeOpacity="0.3" />
    <ellipse cx="160" cy="275" rx="120" ry="8" fill="#C9A84C" fillOpacity="0.06" />
  </svg>
);

const HandshakeIllustration = () => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <circle cx="160" cy="140" r="80" fill="#9a9a9a" fillOpacity="0.07" />
    <path d="M60 160 C80 130 120 110 160 130 C200 150 240 130 260 160" stroke="#9a9a9a" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
    <path d="M80 150 L130 120 L160 130 L190 115 L240 150" stroke="#7a7a7a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="160" cy="130" r="12" fill="#7a7a7a" fillOpacity="0.3" />
    <path d="M130 130 C130 130 140 145 160 145 C180 145 190 130 190 130" stroke="#7a7a7a" strokeWidth="3" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
    <ellipse cx="100" cy="180" rx="35" ry="25" fill="#9a9a9a" fillOpacity="0.1" />
    <ellipse cx="220" cy="180" rx="35" ry="25" fill="#9a9a9a" fillOpacity="0.1" />
    <path d="M85 172 L100 160 L115 172 M100 160 L100 195" stroke="#7a7a7a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
    <path d="M205 172 L220 160 L235 172 M220 160 L220 195" stroke="#7a7a7a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
    <circle cx="160" cy="200" r="18" fill="#9a9a9a" fillOpacity="0.08" />
    <path d="M152 200 L158 206 L170 194" stroke="#7a7a7a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
    <ellipse cx="160" cy="275" rx="120" ry="8" fill="#9a9a9a" fillOpacity="0.04" />
  </svg>
);

const BlueprintIllustration = () => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect x="40" y="40" width="240" height="200" rx="4" fill="#7fc8e8" fillOpacity="0.08" stroke="#5aa8c8" strokeWidth="1.5" strokeOpacity="0.3" />
    <line x1="40" y1="80" x2="280" y2="80" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <line x1="40" y1="120" x2="280" y2="120" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <line x1="40" y1="160" x2="280" y2="160" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <line x1="40" y1="200" x2="280" y2="200" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <line x1="100" y1="40" x2="100" y2="240" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <line x1="160" y1="40" x2="160" y2="240" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <line x1="220" y1="40" x2="220" y2="240" stroke="#5aa8c8" strokeWidth="1" strokeOpacity="0.25" />
    <rect x="65" y="100" width="110" height="120" rx="2" fill="#4a90c8" fillOpacity="0.12" stroke="#5aa8c8" strokeWidth="2" strokeOpacity="0.5" />
    <rect x="75" y="170" width="30" height="50" fill="#4a90c8" fillOpacity="0.2" stroke="#5aa8c8" strokeWidth="1.5" strokeOpacity="0.6" />
    <rect x="120" y="155" width="40" height="30" fill="#4a90c8" fillOpacity="0.15" stroke="#5aa8c8" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="65" y1="100" x2="175" y2="100" stroke="#5aa8c8" strokeWidth="2.5" strokeOpacity="0.7" />
    <line x1="65" y1="100" x2="65" y2="220" stroke="#5aa8c8" strokeWidth="2.5" strokeOpacity="0.7" />
    <line x1="175" y1="100" x2="175" y2="220" stroke="#5aa8c8" strokeWidth="2.5" strokeOpacity="0.7" />
    <path d="M230 100 L270 100 L270 220" stroke="#5aa8c8" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.5" fill="none" />
    <circle cx="250" cy="80" r="8" fill="#5aa8c8" fillOpacity="0.3" />
    <line x1="244" y1="80" x2="256" y2="80" stroke="#5aa8c8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="250" y1="74" x2="250" y2="86" stroke="#5aa8c8" strokeWidth="1.5" strokeOpacity="0.7" />
    <ellipse cx="160" cy="275" rx="120" ry="8" fill="#5aa8c8" fillOpacity="0.04" />
  </svg>
);

const CityIllustration = () => (
  <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect x="30" y="160" width="50" height="110" rx="2" fill="#b8a8f0" fillOpacity="0.2" stroke="#9880e0" strokeWidth="1.5" strokeOpacity="0.3" />
    <rect x="40" y="140" width="30" height="20" rx="1" fill="#b8a8f0" fillOpacity="0.15" />
    <rect x="95" y="120" width="70" height="150" rx="2" fill="#b8a8f0" fillOpacity="0.25" stroke="#9880e0" strokeWidth="1.5" strokeOpacity="0.35" />
    <rect x="108" y="100" width="44" height="22" rx="1" fill="#b8a8f0" fillOpacity="0.2" />
    <rect x="125" y="82" width="10" height="20" rx="1" fill="#9880e0" fillOpacity="0.4" />
    <rect x="180" y="145" width="55" height="125" rx="2" fill="#b8a8f0" fillOpacity="0.2" stroke="#9880e0" strokeWidth="1.5" strokeOpacity="0.3" />
    <rect x="190" y="128" width="35" height="18" rx="1" fill="#b8a8f0" fillOpacity="0.15" />
    <rect x="250" y="175" width="42" height="95" rx="2" fill="#b8a8f0" fillOpacity="0.18" stroke="#9880e0" strokeWidth="1.5" strokeOpacity="0.25" />
    <rect x="42" y="170" width="8" height="10" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="56" y="170" width="8" height="10" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="42" y="190" width="8" height="10" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="56" y="190" width="8" height="10" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="105" y="135" width="12" height="14" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="123" y="135" width="12" height="14" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="141" y="135" width="12" height="14" rx="1" fill="#9880e0" fillOpacity="0.3" />
    <rect x="105" y="158" width="12" height="14" rx="1" fill="#9880e0" fillOpacity="0.25" />
    <rect x="123" y="158" width="12" height="14" rx="1" fill="#9880e0" fillOpacity="0.25" />
    <rect x="141" y="158" width="12" height="14" rx="1" fill="#9880e0" fillOpacity="0.25" />
    <line x1="20" y1="270" x2="300" y2="270" stroke="#9880e0" strokeWidth="2" strokeOpacity="0.2" />
    <path d="M20 240 Q80 220 130 235 Q180 250 230 230 Q260 218 300 225" stroke="#9880e0" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
    <ellipse cx="160" cy="275" rx="120" ry="8" fill="#9880e0" fillOpacity="0.04" />
  </svg>
);

const services = [
  {
    title: "New Residential Properties",
    shortTitle: "New Residential",
    desc: "Explore premium new homes crafted for modern living — from first-time buyer-friendly to high-yield investment properties across India's top cities.",
    bg: "#f9f0e8",
    link: "/services/new-residential",
    tags: ["First-Time Buyer", "Investment"],
    tagBg: "bg-amber-100 text-amber-800",
    Illustration: HouseIllustration,
  },
  {
    title: "Resale Consultancy",
    shortTitle: "Resale",
    desc: "The right combination of experience & expertise for buying or selling pre-owned properties with full market intelligence.",
    bg: "#efefef",
    link: "/services/resale",
    tags: ["Home Seller", "Investment"],
    tagBg: "bg-gray-200 text-gray-700",
    Illustration: HandshakeIllustration,
  },
  {
    title: "End-to-End Solution",
    shortTitle: "End-to-End",
    desc: "Complete property solutions from acquisition to development — a single point of contact for every step of your property journey.",
    bg: "#e2f5fe",
    link: "/services/end-to-end",
    tags: ["Acquisition", "Development"],
    tagBg: "bg-sky-100 text-sky-800",
    Illustration: BlueprintIllustration,
  },
  {
    title: "Property Management",
    shortTitle: "Management",
    desc: "Delivering a customised approach to every complex transaction — we handle the details so you can focus on what matters.",
    bg: "#f3eeff",
    link: "/services/property-management",
    tags: ["Maintenance", "Leasing", "ROI"],
    tagBg: "bg-violet-100 text-violet-800",
    Illustration: CityIllustration,
    hasPartners: true,
  },
];

interface ServiceCardsProps {
  className?: string;
}

export function ServiceCards({ className = "" }: ServiceCardsProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ${className}`}>
      {services.map((service, i) => (
        <motion.div
          key={service.link}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          data-testid={`service-card-${i}`}
        >
          <Link href={service.link} className="block group h-[450px] relative overflow-hidden rounded-2xl" style={{ backgroundColor: service.bg }}>
            {/* Background Illustration — bottom right, stays fixed */}
            <div
              className="absolute bottom-0 right-0 w-[200px] sm:w-[210px] lg:w-[210px] xl:w-[250px] 2xl:w-[280px] h-[280px] pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-2"
              aria-hidden="true"
            >
              <service.Illustration />
            </div>

            {/* Gradient overlay — lightens slightly on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100/10 via-gray-200/10 to-gray-400/10 opacity-10 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none" />

            {/* Top badge */}
            <div className="absolute top-6 left-6 z-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] border border-[#C9A84C]/30 rounded-full px-3 py-1 bg-white/50 backdrop-blur-sm">
                {service.shortTitle}
              </span>
            </div>

            {/* Hover content layer — slides up from bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md p-6 translate-y-[calc(100%-90px)] group-hover:translate-y-0 transition-transform duration-300 ease-out border-t border-white/40">
              {/* Title — always visible */}
              <h2 className="text-xl font-serif font-bold text-[#1C1C2E] mb-3 leading-tight">
                {service.title}
              </h2>

              {/* Description — visible on hover */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
                {service.desc}
              </p>

              {/* Sub-tags row */}
              <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                {service.hasPartners ? (
                  <>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${service.tagBg}`}
                        data-testid={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </>
                ) : (
                  service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${service.tagBg}`}
                      data-testid={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>

              {/* Learn More pill button */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-150">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #d4b76a)" }}>
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
