import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";

import { PropertyGallery } from "@/components/PropertyGallery";
import { projectImagesByName } from "@/lib/projectImages";
import { type ProjectDetailGroup, type WorkingProject, workingProjects } from "@/lib/projectsWorkingWithData";

type PropertyDetailProps = {
  params?: {
    slug?: string;
  };
};

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDetailGroup(project: WorkingProject, title: string): ProjectDetailGroup | undefined {
  return project.detailGroups.find((group) => group.title === title);
}

function getGroupItems(project: WorkingProject, title: string): string[] {
  return (
    getDetailGroup(project, title)?.items
      .map((item) => item.trim())
      .filter((item) => item.length > 0) ?? []
  );
}

function getLocation(project: WorkingProject): string {
  return project.overview?.location?.trim() || getGroupItems(project, "Location")[0] || "";
}

function getConfigurationItems(project: WorkingProject): string[] {
  if (project.overview?.configurations?.trim()) {
    return [project.overview.configurations.trim()];
  }

  const unitTypeItems = getGroupItems(project, "Unit Types");
  const found = new Set<string>();

  for (const item of unitTypeItems) {
    for (const match of item.matchAll(/\b\d(?:\.\d+)?\s*BHK(?:\s*\+\s*SQ)?\b/gi)) {
      found.add(match[0].replace(/\s+/g, " ").trim());
    }

    for (const match of item.matchAll(/\b\d\s*BED(?:\s*\dT)?\b/gi)) {
      found.add(match[0].replace(/\s+/g, " ").trim());
    }
  }

  if (found.size) {
    return Array.from(found);
  }

  return unitTypeItems.slice(0, 8);
}

function getOverviewItems(project: WorkingProject): string[] {
  const overviewItems = getGroupItems(project, "Project Overview");
  if (overviewItems.length) {
    return overviewItems;
  }

  return getGroupItems(project, "Project Type").slice(0, 6);
}

function getDescriptionText(project: WorkingProject): string {
  const descriptionItems = getGroupItems(project, "Description");
  if (descriptionItems.length) {
    return descriptionItems.join(" ");
  }

  const projectTypeItems = getGroupItems(project, "Project Type");
  return projectTypeItems.slice(0, 2).join(" ");
}

function getFeatureItems(project: WorkingProject): string[] {
  const featureItems = getGroupItems(project, "Features");
  if (featureItems.length) {
    return featureItems;
  }

  return getGroupItems(project, "Advantages");
}

function getAmenityItems(project: WorkingProject): string[] {
  return getGroupItems(project, "Amenities");
}

function getHeroImage(project: WorkingProject): string | undefined {
  const imageSet = projectImagesByName[project.name];
  return imageSet?.heroImage ?? imageSet?.galleryImages[0] ?? imageSet?.amenityImages[0] ?? imageSet?.floorPlanImages[0];
}

export function PropertyDetail({ params }: PropertyDetailProps) {
  const [, setLocation] = useLocation();
  const [isExiting, setIsExiting] = useState(false);

  const slug = params?.slug ?? "";

  const project = useMemo(
    () => workingProjects.find((item) => toSlug(item.name) === slug) ?? null,
    [slug],
  );

  const locationText = project ? getLocation(project) : "";
  const descriptionText = project ? getDescriptionText(project) : "";
  const configurationItems = project ? getConfigurationItems(project) : [];
  const overviewItems = project ? getOverviewItems(project) : [];
  const featureItems = project ? getFeatureItems(project) : [];
  const amenityItems = project ? getAmenityItems(project) : [];
  const heroImage = project ? getHeroImage(project) : undefined;

  const handleBack = () => {
    setIsExiting(true);
    window.setTimeout(() => {
      setLocation("/properties");
    }, 420);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#07090E] px-6 py-16 text-[#F5F6FA]">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <h1 className="text-3xl font-serif font-bold">Property not found</h1>
          <p className="mt-4 text-base text-gray-300">
            The selected property is unavailable right now.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-[#F5F6FA]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-screen bg-[#07090E] text-[#F5F6FA]"
    >
      <section className="relative min-h-[62vh] overflow-hidden border-b border-white/10">
        {heroImage ? (
          <img
            src={heroImage}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/60 to-[#07090E]" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6 pb-12 pt-8 md:px-8 md:pt-10">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-semibold text-[#F5F6FA] backdrop-blur-sm transition-colors hover:bg-black/35"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </button>

          <div className="mt-auto max-w-3xl pt-24 md:pt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A84C]">Property Detail</p>
            <h1 className="mt-4 text-4xl font-serif font-bold leading-tight text-white md:text-6xl">
              {project.name}
            </h1>
            {descriptionText ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">{descriptionText}</p>
            ) : null}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-6 py-14 md:px-8 md:py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid gap-5 rounded-3xl border border-white/10 bg-white/3 p-6 md:grid-cols-2 md:p-8"
        >
          {locationText ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wide text-[#C9A84C]">Location</p>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-100 md:text-base">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                <span>{locationText}</span>
              </p>
            </div>
          ) : null}

          {configurationItems.length ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wide text-[#C9A84C]">Configurations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {configurationItems.slice(0, 8).map((item) => (
                  <span
                    key={`${project.name}-config-${item}`}
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-100 md:text-sm"
                  >
                    <Building2 className="mr-1 h-3.5 w-3.5 shrink-0 text-[#C9A84C]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </motion.section>

        {overviewItems.length ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.04 }}
            className="rounded-3xl border border-white/10 bg-white/2 p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-white md:text-3xl">Project Overview</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {overviewItems.slice(0, 10).map((item) => (
                <li
                  key={`${project.name}-overview-${item}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-gray-200 md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}

        {featureItems.length ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
            className="rounded-3xl border border-white/10 bg-white/2 p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-white md:text-3xl">Key Features</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {featureItems.slice(0, 12).map((item) => (
                <li
                  key={`${project.name}-feature-${item}`}
                  className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-gray-200 md:text-base"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C9A84C]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}

        {amenityItems.length ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/2 p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-white md:text-3xl">Amenities</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {amenityItems.slice(0, 18).map((item) => (
                <li
                  key={`${project.name}-amenity-${item}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-relaxed text-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}

        <PropertyGallery propertyName={project.name} imageSet={projectImagesByName[project.name]} />
      </main>

      <AnimatePresence>
        {isExiting ? (
          <motion.div
            className="pointer-events-none fixed inset-0 z-140 bg-[#07090E]"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
