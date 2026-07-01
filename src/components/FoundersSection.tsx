import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";

type FounderTheme = "white" | "red" | "black";

type FounderImageSet = Record<FounderTheme, string>;

const THEME_SEQUENCE: FounderTheme[] = ["white", "red", "black"];

const THEME_BACKGROUND: Record<FounderTheme, string> = {
  white: "#ffffff",
  red: "#8B0000",
  black: "#000000",
};

const THEME_GLOW: Record<FounderTheme, string> = {
  white: "drop-shadow(0 0 16px rgba(255,255,255,0.45))",
  red: "drop-shadow(0 0 16px rgba(139,0,0,0.45))",
  black: "drop-shadow(0 0 16px rgba(0,0,0,0.55))",
};

const IMAGE_SWITCH_MS = 7000;

const FOUNDERS: Array<{
  id: "ab" | "rg";
  name: string;
  subtitle: string;
  images: FounderImageSet;
}> = [
  {
    id: "ab",
    name: "Amit Bhawalkar",
    subtitle: "Founder",
    images: {
      black: "/founder/CIRCLE B1 AB.png?v=2",
      red: "/assets/founders/CIRCLE R1AB.png",
      white: "/assets/founders/CIRCLE W1AB.png",
    },
  },
  {
    id: "rg",
    name: "Rasik Gowda",
    subtitle: "Founder",
    images: {
      black: "/assets/founders/CIRCLE B1 RG.png",
      red: "/assets/founders/CIRCLE R1 RG.png",
      white: "/assets/founders/CIRCLE W1 RG.png",
    },
  },
];

function FounderPortrait({
  founderId,
  name,
  subtitle,
  images,
  currentTheme,
  previousTheme,
  transitionActive,
  textClassName,
  onImageClick,
  onSelect,
}: {
  founderId: "ab" | "rg";
  name: string;
  subtitle: string;
  images: FounderImageSet;
  currentTheme: FounderTheme;
  previousTheme: FounderTheme | null;
  transitionActive: boolean;
  textClassName: string;
  onImageClick: (founderId: "ab" | "rg") => void;
  onSelect: (founderId: "ab" | "rg") => void;
}) {
  const previousImage = previousTheme ? images[previousTheme] : null;

  return (
    <article className="flex flex-col items-center gap-5">
      <button
        type="button"
        onMouseEnter={() => onSelect(founderId)}
        onFocus={() => onSelect(founderId)}
        onClick={() => {
          onSelect(founderId);
          onImageClick(founderId);
        }}
        className="relative aspect-square w-full max-w-90 rounded-3xl border border-white/10 bg-black/10 p-5 backdrop-blur-[2px]"
        aria-label={`Know more about ${name}`}
      >
        {previousImage ? (
          <img
            src={previousImage}
            alt={name}
            loading="eager"
            decoding="async"
            className={`absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)] object-contain transition-opacity duration-500 ease-in-out ${transitionActive ? "opacity-0" : "opacity-100"}`}
            style={{ filter: THEME_GLOW[currentTheme] }}
          />
        ) : null}

        <img
          src={images[currentTheme]}
          alt={name}
          loading="eager"
          decoding="async"
          className={`absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)] object-contain transition-opacity duration-500 ease-in-out ${previousImage ? (transitionActive ? "opacity-100" : "opacity-0") : "opacity-100"}`}
          style={{ filter: THEME_GLOW[currentTheme] }}
        />
      </button>

      <div className="text-center">
        <h3 className={`text-2xl font-serif font-bold ${textClassName}`}>{name}</h3>
        <p className={`mt-1 text-sm uppercase tracking-[0.18em] ${textClassName} opacity-80`}>{subtitle}</p>
      </div>
    </article>
  );
}

export function FoundersSection() {
  const [, setLocation] = useLocation();
  const [selectedFounder, setSelectedFounder] = useState<"ab" | "rg">("ab");
  const [imagesReady, setImagesReady] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [previousTheme, setPreviousTheme] = useState<FounderTheme | null>(null);
  const [transitionActive, setTransitionActive] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const transitionFrameRef = useRef<number | null>(null);

  const currentTheme = THEME_SEQUENCE[themeIndex];
  const activeTheme = imagesReady ? currentTheme : "white";

  const allFounderImages = useMemo(() => {
    return FOUNDERS.flatMap((founder) => [founder.images.white, founder.images.red, founder.images.black]);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = src;
      });

    Promise.all(allFounderImages.map((src) => preload(src))).then(() => {
      if (!cancelled) {
        setImagesReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [allFounderImages]);

  useEffect(() => {
    if (!imagesReady) {
      return;
    }

    const imageTimer = window.setInterval(() => {
      setThemeIndex((prev) => {
        const next = (prev + 1) % THEME_SEQUENCE.length;
        setPreviousTheme(THEME_SEQUENCE[prev]);
        setTransitionActive(false);

        if (transitionFrameRef.current !== null) {
          window.cancelAnimationFrame(transitionFrameRef.current);
        }
        transitionFrameRef.current = window.requestAnimationFrame(() => {
          setTransitionActive(true);
          transitionFrameRef.current = null;
        });

        if (transitionTimeoutRef.current !== null) {
          window.clearTimeout(transitionTimeoutRef.current);
        }
        transitionTimeoutRef.current = window.setTimeout(() => {
          setPreviousTheme(null);
          setTransitionActive(false);
          transitionTimeoutRef.current = null;
        }, 520);

        return next;
      });
    }, IMAGE_SWITCH_MS);

    return () => {
      window.clearInterval(imageTimer);
      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current);
      }
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [imagesReady]);

  const isLightTheme = activeTheme === "white";
  const textClassName = isLightTheme ? "text-[#1C1C2E]" : "text-[#FDFAF5]";
  const accentClassName = isLightTheme ? "text-[#8B0000]" : "text-[#F3D1D1]";

  const openFounderStory = (founderId: "ab" | "rg") => {
    setLocation(`/founders-story?founder=${founderId}`);
  };

  return (
    <section
      className="py-24"
      style={{
        backgroundColor: THEME_BACKGROUND[activeTheme],
        transition: "background-color 1s ease-in-out",
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-14 text-center">
          <h2 className={`text-4xl font-serif font-bold ${textClassName}`}>Founders</h2>
          <p className={`mt-3 text-sm uppercase tracking-[0.18em] ${accentClassName}`}>Leadership</p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          {FOUNDERS.map((founder) => (
            <FounderPortrait
              key={founder.id}
              founderId={founder.id}
              name={founder.name}
              subtitle={founder.subtitle}
              images={founder.images}
              currentTheme={activeTheme}
              previousTheme={imagesReady ? previousTheme : null}
              transitionActive={transitionActive}
              textClassName={textClassName}
              onImageClick={openFounderStory}
              onSelect={setSelectedFounder}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => openFounderStory(selectedFounder)}
            className="inline-flex items-center rounded-full bg-[#C9A84C] px-7 py-3 text-sm font-semibold text-[#1C1C2E] transition-transform duration-300 hover:scale-[1.03]"
          >
            Know More About Founders
          </button>
        </div>
      </div>
    </section>
  );
}
