import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { type ProjectImageSet } from "@/lib/projectImages";

type PropertyGalleryProps = {
  propertyName: string;
  imageSet?: ProjectImageSet;
};

const relevantImagePattern = /(gallery|floor-plan|master-plan|amenities|amenity|blueprint|technical|plan)/i;
const ignoredImagePattern = /(logo|icon|watermark)/i;

function toProjectSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getImageLabel(url: string): string {
  const lowered = url.toLowerCase();

  if (/(blueprint|technical)/.test(lowered)) {
    return "Technical Blueprint";
  }

  if (/(master-plan|floor-plan|unit-plan|typical-floor)/.test(lowered)) {
    return "Floor / Master Plan";
  }

  if (/(amenities|amenity)/.test(lowered)) {
    return "Amenities";
  }

  return "Project Render";
}

function toGalleryUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  if (parts.length < 4) {
    return url;
  }

  const fileName = parts[parts.length - 1];
  const projectSlug = parts[2];
  return `/assets/projects/${projectSlug}/gallery/${fileName}`;
}

function getGalleryImages(propertyName: string, imageSet?: ProjectImageSet): string[] {
  if (!imageSet) {
    return [];
  }

  const projectFolderPath = `/assets/projects/${toProjectSlug(propertyName)}/`;

  const candidates = [
    imageSet.heroImage,
    ...imageSet.galleryImages,
    ...imageSet.floorPlanImages,
    ...imageSet.amenityImages,
  ].filter(Boolean) as string[];

  const seen = new Set<string>();

  return candidates.filter((url) => {
    if (!url.startsWith(projectFolderPath)) {
      return false;
    }

    if (ignoredImagePattern.test(url)) {
      return false;
    }

    if (!relevantImagePattern.test(url)) {
      return false;
    }

    if (seen.has(url)) {
      return false;
    }

    seen.add(url);
    return true;
  }).map((url) => toGalleryUrl(url));
}

export function PropertyGallery({ propertyName, imageSet }: PropertyGalleryProps) {
  const images = useMemo(() => getGalleryImages(propertyName, imageSet), [propertyName, imageSet]);
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    const syncIndex = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    syncIndex();
    api.on("select", syncIndex);
    api.on("reInit", syncIndex);

    return () => {
      api.off("select", syncIndex);
      api.off("reInit", syncIndex);
    };
  }, [api]);

  useEffect(() => {
    if (!api || images.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 2800);

    return () => {
      window.clearInterval(timer);
    };
  }, [api, images.length]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      className="rounded-3xl border border-white/10 bg-white/2 p-6 md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-serif font-bold text-white md:text-3xl">Gallery – {propertyName}</h2>

        {images.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition-colors hover:bg-black/45"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition-colors hover:bg-black/45"
              aria-label="Next gallery image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {images.length ? (
        <>
          <Carousel setApi={setApi} opts={{ loop: images.length > 1, align: "start" }} className="mt-6 w-full">
            <CarouselContent className="-ml-3">
              {images.map((image, index) => (
                <CarouselItem key={`${propertyName}-${image}`} className="basis-[84%] pl-3 sm:basis-[58%] md:basis-[46%] lg:basis-[34%]">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left"
                  >
                    <div className="aspect-4/3 overflow-hidden">
                      <img
                        src={image}
                        alt={`${propertyName} ${getImageLabel(image)} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-300">{getImageLabel(image)}</div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {images.length > 1 ? (
            <p className="mt-4 text-xs text-gray-400">
              {activeIndex + 1} / {images.length}
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-5 text-sm text-gray-300">No brochure gallery images available for this property yet.</p>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] ? (
          <motion.div
            className="fixed inset-0 z-150 bg-[#07090E]/95 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
          >
            <div className="mx-auto flex h-full max-w-6xl flex-col">
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-black/50"
                  aria-label="Close gallery preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <motion.div
                className="relative flex flex-1 items-center justify-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={images[lightboxIndex]}
                  alt={`${propertyName} ${getImageLabel(images[lightboxIndex])} enlarged`}
                  className="max-h-full w-auto max-w-full rounded-2xl border border-white/10 object-contain"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}