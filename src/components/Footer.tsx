import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#1C1C2E] text-[#FDFAF5] pt-16 pb-8 border-t-4 border-[#C9A84C]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
                <path d="m21 2-9.6 9.6"/>
                <circle cx="7.5" cy="15.5" r="5.5"/>
              </svg>
              <span className="font-serif text-xl font-bold">
                Right Key <span className="text-[#C9A84C]">Navigators</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your Trusted Real Estate Partner, guiding you home with expertise and care.
            </p>
            <div className="text-xs text-gray-500 bg-white/5 p-3 rounded-lg border border-white/10 inline-block">
              <span className="text-[#C9A84C] font-semibold">RERA No:</span> PRM/KA/RERA/1251/446/AG/230113/003460
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-[#C9A84C]">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cancellation" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-[#C9A84C]">Our Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/services/new-residential" className="hover:text-white transition-colors">New Residential</Link></li>
              <li><Link href="/services/resale" className="hover:text-white transition-colors">Resale Consultancy</Link></li>
              <li><Link href="/services/end-to-end" className="hover:text-white transition-colors">End-to-End Solution</Link></li>
              <li><Link href="/services/property-management" className="hover:text-white transition-colors">Property Management</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4 text-[#C9A84C]">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Level 14, Concorde Tower C, UB City, 1 Vittal Mallya Road, Bengaluru 560001</span>
              </li>
              <li className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>contact@rightkeynavigators.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Right Key Navigators. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
