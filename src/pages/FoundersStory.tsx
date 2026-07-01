import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type FounderId = "ab" | "rg";

type TimelineStep = {
  title: string;
  role: string;
  duration?: string;
  focus?: string;
  skills?: string[];
  summary?: string;
};

type FounderStory = {
  name: string;
  title: string;
  tagline: string;
  steps: TimelineStep[];
};

const STORIES: Record<FounderId, FounderStory> = {
  ab: {
    name: "Amit Bhawalkar",
    title: "Deputy Vice President - ANAROCK",
    tagline: "Driving Real Estate Growth through Strategy & Execution",
    steps: [
      {
        title: "Step 1 - Early Career",
        role: "Sales & Real Estate Foundation",
        focus: "Customer understanding, ground-level sales",
      },
      {
        title: "Step 2 - Growth Phase",
        role: "Senior Manager - ANAROCK",
        skills: ["Team Management", "Sales Execution", "Client Handling"],
      },
      {
        title: "Step 3 - Leadership Rise",
        role: "Deputy Vice President - ANAROCK",
        skills: [
          "Business Development",
          "Strategic Planning",
          "Project Management",
          "Marketing Strategy",
          "Negotiation",
        ],
      },
      {
        title: "Step 4 - Expertise Layer",
        role: "Leadership Capabilities",
        skills: [
          "Business Strategy",
          "Relationship Management",
          "Product Launch",
          "Performance Management",
          "Investment Understanding",
        ],
      },
      {
        title: "Step 5 - Leadership Identity",
        role: "Executive Summary",
        summary:
          "A results-driven real estate leader focused on scaling business operations, building strong client relationships, and delivering high-value property solutions.",
      },
    ],
  },
  rg: {
    name: "Rasik Gowda",
    title: "Real Estate & Business Strategy Specialist",
    tagline: "Building Scalable Real Estate Systems through Leadership & Execution",
    steps: [
      {
        title: "Step 1 - Foundation Phase",
        role: "Real Estate Specialist - Nest Realtors",
        duration: "Jan 2013 - Oct 2019",
        skills: [
          "Residential Real Estate",
          "Commercial Real Estate",
          "Direct Sales",
          "Client Acquisition",
          "Listings & Market Understanding",
        ],
      },
      {
        title: "Step 2 - Growth Phase",
        role: "Purchase Manager - Mitera Impex Pvt Ltd",
        duration: "Jan 2019 - Aug 2021",
        skills: [
          "Business Planning",
          "Logistics Management",
          "Vendor Management",
          "B2B Operations",
        ],
      },
      {
        title: "Step 3 - Leadership Rise",
        role: "Team Lead - TRESPECT India",
        duration: "Oct 2021 - Dec 2024",
        skills: [
          "Managing 8-10 team members",
          "Sales Strategy Execution",
          "Team Performance",
          "Operational Leadership",
        ],
      },
      {
        title: "Step 4 - Expertise Layer",
        role: "Cross-Functional Expertise",
        skills: [
          "Real Estate Economics",
          "Real Estate Financing",
          "Corporate Real Estate",
          "Business Development",
          "Sales Management",
          "Account Management",
          "Consulting",
        ],
      },
      {
        title: "Step 5 - Leadership Identity",
        role: "Leadership Identity",
        summary:
          "A dynamic real estate professional with strong expertise in sales, operations, and team leadership, focused on delivering scalable business growth and high-performance execution.",
      },
    ],
  },
};

function readFounderFromSearch(search: string): FounderId {
  const params = new URLSearchParams(search);
  const founder = params.get("founder");

  return founder === "rg" ? "rg" : "ab";
}

export function FoundersStoryPage() {
  const [activeFounder, setActiveFounder] = useState<FounderId>(() => readFounderFromSearch(window.location.search));
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const activeStory = STORIES[activeFounder];

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      if (!timelineRef.current) {
        setScrollProgress(0);
        return;
      }

      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const trackStart = viewportHeight * 0.2;
      const trackRange = rect.height + viewportHeight * 0.55;
      const raw = (trackStart - rect.top) / Math.max(trackRange, 1);
      const clamped = Math.max(0, Math.min(1, raw));

      setScrollProgress(clamped);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        updateProgress();
        rafId = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const progressLabel = useMemo(() => Math.round(scrollProgress * 100), [scrollProgress]);

  const switchFounder = (founder: FounderId) => {
    if (founder === activeFounder) {
      return;
    }

    setActiveFounder(founder);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07090E] pb-24 pt-28 text-[#FDFAF5]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#C9A84C]/15 blur-3xl" />
        <div className="absolute bottom-16 left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <aside className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
        <span className="text-xs font-semibold tracking-[0.24em] text-[#C9A84C]">{progressLabel}%</span>
        <div className="h-36 w-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="w-full rounded-full bg-[#C9A84C] transition-all duration-200 ease-out"
            style={{ height: `${Math.max(4, progressLabel)}%` }}
          />
        </div>
      </aside>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.24em] text-[#C9A84C]">Founders Story</p>
          <h1 className="mt-4 text-4xl font-serif font-bold md:text-5xl">{activeStory.name}</h1>
          <p className="mt-3 text-lg text-white/80">{activeStory.title}</p>
          <p className="mt-3 max-w-3xl text-base italic text-[#E6D6A8]">"{activeStory.tagline}"</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => switchFounder("ab")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeFounder === "ab"
                  ? "bg-[#C9A84C] text-[#1C1C2E]"
                  : "border border-[#C9A84C]/45 bg-white/5 text-[#FDFAF5] hover:bg-white/10"
              }`}
            >
              Amit Bhawalkar Timeline
            </button>
            <button
              type="button"
              onClick={() => switchFounder("rg")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeFounder === "rg"
                  ? "bg-[#C9A84C] text-[#1C1C2E]"
                  : "border border-[#C9A84C]/45 bg-white/5 text-[#FDFAF5] hover:bg-white/10"
              }`}
            >
              Rasik Gowda Timeline
            </button>
          </div>
        </motion.header>

        <motion.div
          key={activeFounder}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div ref={timelineRef} className="timeline-container relative pb-8">
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/20 md:block" />
            <div
              className="pointer-events-none absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#C9A84C] transition-all duration-150 ease-out md:block"
              style={{ height: `${scrollProgress * 100}%` }}
            />

            <div className="timeline space-y-12 md:space-y-16">
              {activeStory.steps.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div key={`${activeFounder}-${step.title}`} className="timeline-step md:grid md:grid-cols-[1fr_64px_1fr] md:items-start">
                    <div className={isLeft ? "hidden md:block md:pr-10" : "hidden md:block md:invisible"}>
                      {isLeft ? (
                        <motion.article
                          initial={{ opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.52, delay: index * 0.07, ease: "easeOut" }}
                          className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_14px_36px_rgba(201,168,76,0.12)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
                        >
                          <p className="text-xs uppercase tracking-[0.18em] text-[#C9A84C]">{step.title}</p>
                          <h3 className="mt-3 text-2xl font-serif font-bold">{step.role}</h3>
                          {step.duration ? (
                            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/65">{step.duration}</p>
                          ) : null}
                          {step.focus ? <p className="mt-3 text-sm text-white/80">{step.focus}</p> : null}
                          {step.summary ? <p className="mt-3 text-sm text-white/85">{step.summary}</p> : null}
                          {step.skills?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {step.skills.map((skill) => (
                                <span
                                  key={`${step.title}-${skill}`}
                                  className="rounded-full border border-[#C9A84C]/45 bg-[#C9A84C]/15 px-3 py-1 text-xs font-medium text-[#FCEFCB]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </motion.article>
                      ) : null}
                    </div>

                    <div className="hidden items-start justify-center pt-8 md:flex">
                      <span className="h-4 w-4 rounded-full border-2 border-[#C9A84C] bg-[#07090E] shadow-[0_0_14px_rgba(201,168,76,0.55)]" />
                    </div>

                    <div className={!isLeft ? "hidden md:block md:pl-10" : "hidden md:block md:invisible"}>
                      {!isLeft ? (
                        <motion.article
                          initial={{ opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.52, delay: index * 0.07, ease: "easeOut" }}
                          className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_14px_36px_rgba(201,168,76,0.12)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
                        >
                          <p className="text-xs uppercase tracking-[0.18em] text-[#C9A84C]">{step.title}</p>
                          <h3 className="mt-3 text-2xl font-serif font-bold">{step.role}</h3>
                          {step.duration ? (
                            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/65">{step.duration}</p>
                          ) : null}
                          {step.focus ? <p className="mt-3 text-sm text-white/80">{step.focus}</p> : null}
                          {step.summary ? <p className="mt-3 text-sm text-white/85">{step.summary}</p> : null}
                          {step.skills?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {step.skills.map((skill) => (
                                <span
                                  key={`${step.title}-${skill}`}
                                  className="rounded-full border border-[#C9A84C]/45 bg-[#C9A84C]/15 px-3 py-1 text-xs font-medium text-[#FCEFCB]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </motion.article>
                      ) : null}
                    </div>

                    <div className="mt-3 md:hidden">
                      <div className="timeline-mobile-step relative pl-8">
                        {index > 0 ? (
                          <span className="pointer-events-none absolute left-2.5 -top-5 h-5 w-px bg-white/30" />
                        ) : null}
                        <span
                          className="pointer-events-none absolute left-2.5 top-3 w-px bg-white/25"
                          style={{
                            height:
                              index < activeStory.steps.length - 1
                                ? "calc(100% + 20px)"
                                : "calc(100% - 12px)",
                          }}
                        />
                        <span className="pointer-events-none absolute left-2.5 top-3 h-3 w-3 -translate-x-1/2 rounded-full border border-[#C9A84C] bg-[#07090E] shadow-[0_0_10px_rgba(201,168,76,0.45)]" />

                        <motion.article
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.48, delay: index * 0.05, ease: "easeOut" }}
                          className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_14px_36px_rgba(201,168,76,0.12)] backdrop-blur-md"
                        >
                          <p className="text-xs uppercase tracking-[0.18em] text-[#C9A84C]">{step.title}</p>
                          <h3 className="mt-3 text-xl font-serif font-bold">{step.role}</h3>
                          {step.duration ? (
                            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/65">{step.duration}</p>
                          ) : null}
                          {step.focus ? <p className="mt-3 text-sm text-white/80">{step.focus}</p> : null}
                          {step.summary ? <p className="mt-3 text-sm text-white/85">{step.summary}</p> : null}
                          {step.skills?.length ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {step.skills.map((skill) => (
                                <span
                                  key={`${step.title}-${skill}-mobile`}
                                  className="rounded-full border border-[#C9A84C]/45 bg-[#C9A84C]/15 px-3 py-1 text-xs font-medium text-[#FCEFCB]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </motion.article>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
