import { AnimatePresence, motion } from "framer-motion";
import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";

import {
  workingProjects,
  type ProjectDetailGroup,
  type WorkingProject,
} from "@/lib/projectsWorkingWithData";
import { projectImagesByName } from "@/lib/projectImages";

import "./ProjectsWorkingWith.css";

function getDetailGroup(project: WorkingProject, title: string): ProjectDetailGroup | undefined {
  return project.detailGroups.find((group) => group.title === title);
}

function getCardLocation(project: WorkingProject): string {
  const overviewLocation = project.overview?.location?.trim();
  if (overviewLocation) {
    return overviewLocation;
  }

  return getDetailGroup(project, "Location")?.items[0] ?? "";
}

function getConfigurations(project: WorkingProject): string[] {
  const unitTypeItems = getDetailGroup(project, "Unit Types")?.items ?? [];
  const found = new Set<string>();

  for (const item of unitTypeItems) {
    for (const match of item.matchAll(/\b\d(?:\.\d+)?\s*BHK(?:\s*\+\s*SQ)?\b/gi)) {
      found.add(match[0].replace(/\s+/g, " ").trim());
    }

    for (const match of item.matchAll(/\b\d\s*BED(?:\s*\dT)?\b/gi)) {
      found.add(match[0].replace(/\s+/g, " ").trim());
    }
  }

  return Array.from(found);
}

function getConfigurationText(project: WorkingProject): string {
  const overviewConfigurations = project.overview?.configurations?.trim();
  if (overviewConfigurations) {
    return overviewConfigurations;
  }

  const parsedConfigurations = getConfigurations(project);
  if (parsedConfigurations.length) {
    return parsedConfigurations.join(", ");
  }

  return "Premium configurations";
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCardImage(project: WorkingProject): string | undefined {
  const imageSet = projectImagesByName[project.name];
  if (!imageSet) {
    return undefined;
  }

  return imageSet.heroImage ?? imageSet.galleryImages[0] ?? imageSet.amenityImages[0] ?? imageSet.floorPlanImages[0];
}

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = "none";
}

type ProjectsWorkingWithProps = {
  tone?: "light" | "dark";
  openOnCardClick?: boolean;
};

export function ProjectsWorkingWith({ tone = "light", openOnCardClick = false }: ProjectsWorkingWithProps) {
  const [, setLocation] = useLocation();
  const [focusedProjectName, setFocusedProjectName] = useState<string>(workingProjects[0]?.name ?? "");
  const [hoveredProjectName, setHoveredProjectName] = useState<string | null>(null);
  const [transitioningSlug, setTransitioningSlug] = useState<string | null>(null);
  const isDarkTone = tone === "dark";

  const focusedProject = useMemo(
    () => workingProjects.find((project) => project.name === focusedProjectName) ?? null,
    [focusedProjectName],
  );

  useEffect(() => {
    if (!transitioningSlug) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLocation(`/properties/${transitioningSlug}`);
    }, 420);

    return () => window.clearTimeout(timer);
  }, [setLocation, transitioningSlug]);

  const startExplore = (project: WorkingProject) => {
    setTransitioningSlug(toSlug(project.name));
  };

  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10"
      >
        <p className="text-[#C9A84C] font-semibold tracking-widest uppercase text-sm mb-3">
          Properties Section
        </p>
        <h3 className={`text-3xl md:text-4xl font-serif font-bold ${isDarkTone ? "text-[#FDFAF5]" : "text-[#1C1C2E]"}`}>
          Projects We Are Working With
        </h3>
      </motion.div>

      <div className="hidden md:block">
        <div className="rkn-orbit-shell relative mx-auto h-175 w-full max-w-255">
          <div className="rkn-orbit-track absolute inset-0">
            {workingProjects.map((project, index) => {
              const baseAngle = (360 / Math.max(workingProjects.length, 1)) * index;
              const locationText = getCardLocation(project);
              const image = getCardImage(project);
              const isFocused = focusedProject?.name === project.name;
              const jitterClass = `rkn-jitter-${(index % 3) + 1}`;

              return (
                <div
                  key={project.name}
                  className="rkn-orbit-node absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${baseAngle}deg) translate(290px) rotate(${-baseAngle}deg)`,
                  }}
                >
                  <motion.article
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    onMouseEnter={() => setHoveredProjectName(project.name)}
                    onMouseLeave={() => setHoveredProjectName((prev) => (prev === project.name ? null : prev))}
                    onClick={() => {
                      if (openOnCardClick) {
                        startExplore(project);
                        return;
                      }

                      setFocusedProjectName(project.name);
                    }}
                    className={`group ${jitterClass} w-52.5 cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-lg transition-all duration-300 ${
                      isFocused ? "opacity-45" : "opacity-100"
                    }`}
                  >
                    <div className="relative h-28 overflow-hidden bg-[#F4EEE3]">
                      {image ? (
                        <img
                          src={image}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                          onError={hideBrokenImage}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="p-3">
                      <h4 className="text-sm font-serif font-bold text-[#1C1C2E] leading-snug">{project.name}</h4>
                      <p className="mt-1 line-clamp-1 text-xs text-gray-500">{locationText}</p>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          startExplore(project);
                        }}
                        className="mt-3 inline-flex items-center rounded-full bg-[#1C1C2E] px-3.5 py-1.5 text-xs font-semibold text-[#FDFAF5] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        Explore
                      </button>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {!openOnCardClick && focusedProject ? (
              <motion.article
                key={focusedProject.name}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 z-20 w-97.5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_26px_60px_rgba(21,24,33,0.18)]"
              >
                <div className="relative h-52 overflow-hidden bg-[#EFE7D8]">
                  {getCardImage(focusedProject) ? (
                    <img
                      src={getCardImage(focusedProject)}
                      alt={focusedProject.name}
                      loading="lazy"
                      decoding="async"
                      onError={hideBrokenImage}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A84C]">Focused Property</p>
                    <h4 className="mt-2 text-2xl font-serif font-bold text-[#1C1C2E]">{focusedProject.name}</h4>
                    <p className="mt-2 text-sm text-gray-600">{getCardLocation(focusedProject)}</p>
                  </div>

                  <p className="text-sm text-gray-600">{getConfigurationText(focusedProject)}</p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => startExplore(focusedProject)}
                      className="inline-flex items-center rounded-full bg-[#1C1C2E] px-6 py-2.5 text-sm font-semibold text-[#FDFAF5] transition-transform duration-300 hover:scale-[1.02]"
                    >
                      Explore
                    </button>

                    <span className="text-xs text-gray-500">
                      {hoveredProjectName && hoveredProjectName !== focusedProject.name
                        ? `Hovering: ${hoveredProjectName}`
                        : "Select any orbit card to focus"}
                    </span>
                  </div>
                </div>
              </motion.article>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden -mx-4 overflow-x-auto px-4 pb-2">
        <div className="flex snap-x snap-mandatory gap-4">
          {workingProjects.map((project) => {
            const image = getCardImage(project);
            return (
              <article
                key={project.name}
                onClick={() => {
                  if (openOnCardClick) {
                    startExplore(project);
                  }
                }}
                className="min-w-[82%] snap-center overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
              >
                <div className="relative h-44 overflow-hidden bg-[#F4EEE3]">
                  {image ? (
                    <img
                      src={image}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      onError={hideBrokenImage}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="space-y-3 p-4">
                  <h4 className="text-lg font-serif font-bold text-[#1C1C2E]">{project.name}</h4>
                  <p className="text-sm text-gray-600">{getCardLocation(project)}</p>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      startExplore(project);
                    }}
                    className="inline-flex items-center rounded-full bg-[#1C1C2E] px-5 py-2 text-sm font-semibold text-[#FDFAF5]"
                  >
                    Explore
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {transitioningSlug ? (
          <motion.div
            className="pointer-events-none fixed inset-0 z-120 perspective-[1400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#07090E]"
              initial={{ rotateY: 0, scale: 1 }}
              animate={{ rotateY: -78, scale: 0.96 }}
              exit={{ rotateY: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_50%,rgba(201,168,76,0.28),rgba(7,9,14,0))]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.36, ease: "easeOut" }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
