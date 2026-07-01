export default function TermsPage() {
  return (
    <div className="terms-page relative min-h-screen overflow-hidden px-4 pb-24 pt-28 text-[#FDFAF5] md:px-8">
      <style>{`
        .terms-page {
          background: radial-gradient(circle at 20% 15%, rgba(201,168,76,0.18), transparent 42%),
                      radial-gradient(circle at 85% 75%, rgba(120, 48, 48, 0.24), transparent 45%),
                      linear-gradient(160deg, #07090E 0%, #121725 55%, #1A1624 100%);
        }

        .terms-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(64px);
          opacity: 0.26;
          pointer-events: none;
          animation: terms-glow-float 8s ease-in-out infinite;
        }

        .terms-glow-1 {
          top: -80px;
          left: -50px;
          width: 280px;
          height: 280px;
          background: rgba(201, 168, 76, 0.26);
        }

        .terms-glow-2 {
          bottom: 12%;
          right: -40px;
          width: 260px;
          height: 260px;
          background: rgba(164, 96, 170, 0.18);
          animation-delay: 1.3s;
        }

        .terms-card {
          opacity: 1;
          transform: perspective(1000px) rotateX(2deg) translateY(0);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .terms-card:hover {
          transform: perspective(1000px) rotateX(0deg) scale(1.02);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.38);
        }

        @keyframes terms-glow-float {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <div className="terms-glow terms-glow-1" />
      <div className="terms-glow terms-glow-2" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <header className="mb-10 rounded-[20px] border border-white/15 bg-white/10 p-8 backdrop-blur-[10px]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Legal</p>
          <h1 className="mt-3 text-4xl font-serif font-bold md:text-5xl">Terms and Conditions</h1>
        </header>

        <section className="space-y-6">
          <article className="terms-card border border-white/15 bg-white/8 p-6 md:p-8">
            <p className="text-sm leading-7 text-white/85 md:text-base">
              When deciding between renting and buying a home, it&apos;s essential to consider both the benefits and challenges of each option, as well as your long-term goals and financial situation. Renting offers flexibility, as leases typically last for a year or less, allowing you to move without being tied down by a long-term commitment. This is especially appealing for individuals who may need to relocate for work or other reasons.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">
              Additionally, renters don&apos;t have to worry about the financial responsibility of home repairs, property taxes, or the unpredictable nature of the housing market. Renting requires less upfront investment, usually just a security deposit and the first month&apos;s rent, making it more accessible for people with limited savings. However, renters are essentially paying someone else&apos;s mortgage and don&apos;t build equity over time.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">
              On the other hand, buying a home allows you to build equity with each mortgage payment, which can be a long-term investment if the property appreciates in value. Homeownership also provides stability, with a fixed mortgage offering predictability in monthly payments, unlike renting where the landlord can increase rent. The ability to personalize your space is another perk of owning a home.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">
              However, buying requires significant upfront costs, such as a down payment, closing costs, and ongoing maintenance expenses. It also comes with the responsibility of property upkeep and the risk of market fluctuations affecting property value.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">
              Ultimately, whether renting or buying is right for you depends on factors like how long you plan to stay in one location, your financial readiness, and your desire for flexibility or long-term investment. Careful consideration of your personal and financial circumstances can help you make the best choice for your lifestyle
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
