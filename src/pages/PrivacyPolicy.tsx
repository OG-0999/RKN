import { useEffect, useState } from "react";

type PolicySection = {
  id: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 1,
    title: "Information We Collect",
    paragraphs: [
      "Right Key Navigators may collect personal and usage information to provide real estate consultation services and improve your website experience.",
    ],
    bullets: [
      "Personal details such as your name, email address, and any details submitted through forms.",
      "Property-related preferences such as budget, location preferences, and property interests.",
      "Technical and usage data such as IP address, browser type, device information, pages visited, and interaction data.",
      "Communication data including messages, call requests, or inquiries shared through our website or support channels.",
    ],
  },
  {
    id: 2,
    title: "How We Use Your Information",
    paragraphs: [
      "We use your information only for legitimate business purposes connected with your requests and our services.",
    ],
    bullets: [
      "To respond to your inquiries and provide requested real estate consultation.",
      "To personalize recommendations and improve service quality.",
      "To send relevant updates, property information, and service communications.",
      "To maintain website performance, troubleshoot issues, and improve user experience.",
      "To comply with legal obligations and protect our rights, users, and operations.",
    ],
  },
  {
    id: 3,
    title: "How We Share Your Information",
    paragraphs: [
      "Right Key Navigators does not sell your personal data. We may share information only when necessary and lawful.",
    ],
    bullets: [
      "With trusted service providers who support website operations, communication, and service delivery under confidentiality obligations.",
      "With business partners, developers, or stakeholders only where required to process your specific property request.",
      "When required by law, regulation, court order, or government authority.",
      "To protect against fraud, security incidents, or misuse of our platform and services.",
    ],
  },
  {
    id: 4,
    title: "Data Protection and Security",
    paragraphs: [
      "We apply reasonable technical and organizational safeguards to protect your data from unauthorized access, alteration, disclosure, or loss.",
    ],
    bullets: [
      "Access controls and role-based data handling within authorized teams.",
      "Secure storage and transmission practices for personal information.",
      "Ongoing monitoring and periodic review of data handling practices.",
      "Data retention only for as long as needed for business, legal, or compliance purposes.",
    ],
  },
  {
    id: 5,
    title: "Your Rights",
    paragraphs: [
      "Depending on applicable law, you may have rights regarding your personal information.",
    ],
    bullets: [
      "Request access to the personal data we hold about you.",
      "Request correction or update of inaccurate information.",
      "Request deletion of your data, subject to legal and contractual obligations.",
      "Withdraw consent for specific communications at any time.",
      "Request details about how your data is processed and shared.",
    ],
  },
  {
    id: 6,
    title: "Cookies and Tracking",
    paragraphs: [
      "Our website may use cookies and similar tracking technologies to improve functionality, analyze traffic, and enhance your experience.",
      "You can manage cookie preferences through your browser settings. Disabling certain cookies may affect site functionality.",
    ],
    bullets: [
      "Essential cookies to support core website operations.",
      "Analytics cookies to understand visitor behavior and improve performance.",
      "Preference cookies to remember selected settings and improve usability.",
    ],
  },
  {
    id: 7,
    title: "Third-Party Links",
    paragraphs: [
      "Our website may include links to third-party websites or services. Right Key Navigators is not responsible for the privacy practices, content, or policies of external websites.",
      "We encourage you to review the privacy policies of any third-party site you visit.",
    ],
  },
  {
    id: 8,
    title: "Updates to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect legal, operational, or service-related changes.",
      "Any updates will be posted on this page with an updated effective date.",
    ],
  },
  {
    id: 9,
    title: "Contact Us",
    paragraphs: [
      "If you have any questions, requests, or concerns regarding this Privacy Policy or your personal information, please contact us:",
      "Email: contact@rightkeynavigators.com",
      "Address: Level 14, Concorde Tower C, UB City, 1 Vittal Mallya Road, Bengaluru 560001",
    ],
  },
];

function PrivacyPolicy() {
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const cardId = Number(entry.target.getAttribute("data-policy-card"));
          setVisibleCards((prev) => (prev[cardId] ? prev : { ...prev, [cardId]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    const cards = document.querySelectorAll<HTMLElement>("[data-policy-card]");
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="privacy-policy-page relative min-h-screen overflow-hidden px-4 pb-24 pt-28 text-[#FDFAF5] md:px-8">
      <style>{`
        .privacy-policy-page {
          background: radial-gradient(circle at 20% 15%, rgba(201,168,76,0.18), transparent 42%),
                      radial-gradient(circle at 85% 75%, rgba(120, 48, 48, 0.24), transparent 45%),
                      linear-gradient(160deg, #07090E 0%, #121725 55%, #1A1624 100%);
        }

        .privacy-policy-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(64px);
          opacity: 0.26;
          pointer-events: none;
          animation: privacy-policy-glow-float 8s ease-in-out infinite;
        }

        .privacy-policy-glow-1 {
          top: -80px;
          left: -50px;
          width: 280px;
          height: 280px;
          background: rgba(201, 168, 76, 0.26);
        }

        .privacy-policy-glow-2 {
          bottom: 12%;
          right: -40px;
          width: 260px;
          height: 260px;
          background: rgba(164, 96, 170, 0.18);
          animation-delay: 1.3s;
        }

        .privacy-policy-card {
          opacity: 0;
          transform: perspective(1000px) rotateX(2deg) translateY(22px);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: opacity 0.45s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }

        .privacy-policy-card.is-visible {
          opacity: 1;
          transform: perspective(1000px) rotateX(2deg) translateY(0);
        }

        .privacy-policy-card:hover {
          transform: perspective(1000px) rotateX(0deg) scale(1.02);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.38);
        }

        @keyframes privacy-policy-glow-float {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <div className="privacy-policy-glow privacy-policy-glow-1" />
      <div className="privacy-policy-glow privacy-policy-glow-2" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <header className="mb-10 rounded-[20px] border border-white/15 bg-white/10 p-8 backdrop-blur-[10px]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Legal</p>
          <h1 className="mt-3 text-4xl font-serif font-bold md:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-base text-white/80 md:text-lg">Your data protection is our priority</p>
          <p className="mt-4 text-sm text-white/65">Last updated: April 10, 2026</p>
        </header>

        <section className="space-y-6">
          {POLICY_SECTIONS.map((section) => (
            <article
              key={section.id}
              data-policy-card={section.id}
              className={`privacy-policy-card border border-white/15 bg-white/8 p-6 md:p-8 ${
                visibleCards[section.id] ? "is-visible" : ""
              }`}
            >
              <h2 className="text-2xl font-serif font-bold text-[#FCEFCB]">
                {section.id}. {section.title}
              </h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={`${section.id}-${paragraph.slice(0, 28)}`} className="mt-4 text-sm leading-7 text-white/85 md:text-base">
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-white/85 md:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={`${section.id}-${bullet.slice(0, 28)}`}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export { PrivacyPolicy };
export default PrivacyPolicy;
