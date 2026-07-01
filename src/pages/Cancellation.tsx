export default function CancellationPage() {
  return (
    <div className="cancellation-page relative min-h-screen overflow-hidden px-4 pb-24 pt-28 text-[#FDFAF5] md:px-8">
      <style>{`
        .cancellation-page {
          background: radial-gradient(circle at 20% 15%, rgba(201,168,76,0.18), transparent 42%),
                      radial-gradient(circle at 85% 75%, rgba(120, 48, 48, 0.24), transparent 45%),
                      linear-gradient(160deg, #07090E 0%, #121725 55%, #1A1624 100%);
        }

        .cancellation-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(64px);
          opacity: 0.26;
          pointer-events: none;
          animation: cancellation-glow-float 8s ease-in-out infinite;
        }

        .cancellation-glow-1 {
          top: -80px;
          left: -50px;
          width: 280px;
          height: 280px;
          background: rgba(201, 168, 76, 0.26);
        }

        .cancellation-glow-2 {
          bottom: 12%;
          right: -40px;
          width: 260px;
          height: 260px;
          background: rgba(164, 96, 170, 0.18);
          animation-delay: 1.3s;
        }

        .cancellation-card {
          opacity: 1;
          transform: perspective(1000px) rotateX(2deg) translateY(0);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .cancellation-card:hover {
          transform: perspective(1000px) rotateX(0deg) scale(1.02);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.38);
        }

        @keyframes cancellation-glow-float {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <div className="cancellation-glow cancellation-glow-1" />
      <div className="cancellation-glow cancellation-glow-2" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <header className="mb-10 rounded-[20px] border border-white/15 bg-white/10 p-8 backdrop-blur-[10px]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">Legal</p>
          <h1 className="mt-3 text-4xl font-serif font-bold md:text-5xl">Cancellation Policy</h1>
        </header>

        <section className="space-y-6">
          <article className="cancellation-card border border-white/15 bg-white/8 p-6 md:p-8">
            <p className="text-sm leading-7 text-white/85 md:text-base">
              At Right Key Navigators we strive to provide accurate, timely, and reliable information to our clients. However, please read the following disclaimer regarding the use of our website and services:
            </p>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">1. No Warranty on Information</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                All content provided on our website, including property listings, articles, and other resources, is for informational purposes only. While we make every effort to ensure that the information is accurate and up-to-date, we do not guarantee the accuracy, completeness, or reliability of the information. We recommend that you verify all details independently before making any real estate decisions.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">2. Property Availability</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                The availability and pricing of properties listed on our website are subject to change without notice. While we strive to provide accurate details regarding property availability, descriptions, and pricing, Right Key Navigators does not guarantee that all listings are current or still available at the time of your inquiry.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">3. No Liability for Damages</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                Right Key Navigators and its affiliates are not liable for any direct, indirect, incidental, or consequential damages that may result from your use of our website, services, or reliance on the information provided. This includes, but is not limited to, any errors, omissions, or delays in the information or services provided.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">4. Third-Party Websites</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                Our website may contain links to third-party websites for your convenience. We are not responsible for the content, privacy practices, or services provided by these external sites. By using third-party links, you agree to assume any risks associated with these websites.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">5. Legal and Financial Advice</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                The information provided on our website is not intended to serve as legal, financial, or professional advice. We recommend that you consult with qualified professionals, including real estate attorneys, financial advisors, or mortgage brokers, before making any legal or financial decisions.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">6. No Endorsement</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                Any mention of specific products, services, or companies does not constitute an endorsement by Right Key Navigators. We are not responsible for the performance or quality of these third-party products or services.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-serif font-semibold text-[#FCEFCB]">7. Modifications</h3>
              <p className="mt-2 text-sm leading-7 text-white/85 md:text-base">
                Right Key Navigators reserves the right to modify or update this disclaimer at any time without notice. Please review this policy periodically for any changes. Your continued use of our website and services signifies your acceptance of any modifications.
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">
              By using our website or engaging with our services, you acknowledge and accept this disclaimer. If you have any questions or concerns regarding this policy, please contact us.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
