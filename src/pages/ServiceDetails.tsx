import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { projectImagesByName } from "@/lib/projectImages";
import {
  type ProjectDetailGroup,
  type WorkingProject,
  workingProjects,
} from "@/lib/projectsWorkingWithData";

function getDetailGroup(project: WorkingProject, title: string): ProjectDetailGroup | undefined {
  return project.detailGroups.find((group) => group.title === title);
}

function getCardLocation(project: WorkingProject): string {
  const overviewLocation = project.overview?.location?.trim();
  if (overviewLocation) {
    return overviewLocation;
  }

  return getDetailGroup(project, "Location")?.items.find((item) => item.trim().length > 0)?.trim() ?? "";
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

  return getConfigurations(project).join(", ");
}

function getCardImage(project: WorkingProject): string | undefined {
  const imageSet = projectImagesByName[project.name];
  if (!imageSet) {
    return undefined;
  }

  return imageSet.heroImage ?? imageSet.galleryImages[0] ?? imageSet.amenityImages[0] ?? imageSet.floorPlanImages[0];
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = "none";
}

type FeaturedPropertyCard = {
  name: string;
  location: string;
  configuration: string;
  image: string;
  slug: string;
};

export function ServicePage({ 
  title, 
  desc, 
  children, 
  defaultInterest = "New Residential Property",
  subTabs = [] 
}: { 
  title: string, 
  desc: string, 
  children?: React.ReactNode, 
  defaultInterest?: string,
  subTabs?: {label: string, path: string}[]
}) {
  const [location, setLocation] = useLocation();
  const [transitioningSlug, setTransitioningSlug] = useState<string | null>(null);

  const featuredProperties = useMemo<FeaturedPropertyCard[]>(() => {
    return workingProjects
      .map((project) => {
        const image = getCardImage(project);
        const locationText = getCardLocation(project);
        const configurationText = getConfigurationText(project);

        if (!image || !locationText || !configurationText) {
          return null;
        }

        return {
          name: project.name,
          location: locationText,
          configuration: configurationText,
          image,
          slug: toSlug(project.name),
        };
      })
      .filter((property): property is FeaturedPropertyCard => property !== null);
  }, []);

  useEffect(() => {
    if (!transitioningSlug) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLocation(`/properties/${transitioningSlug}`);
    }, 260);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setLocation, transitioningSlug]);

  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFAF5]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Navigation / Header Area */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#1C1C2E] mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            {desc}
          </motion.p>
        </div>

        {/* Sub Tabs */}
        {subTabs.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 pb-4">
            {subTabs.map((tab, i) => (
              <Link key={i} href={tab.path}>
                <span className={`px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  location === tab.path 
                    ? "bg-[#1C1C2E] text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}>
                  {tab.label}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {children}
            
            {/* Dynamic Featured Properties */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-[#1C1C2E] mb-6">Featured Properties</h3>
              <div className="-mx-1 overflow-x-auto px-1 pb-2" style={{ scrollBehavior: "smooth" }}>
                <div className="flex gap-5">
                  {featuredProperties.map((property) => (
                    <motion.article
                      key={property.slug}
                      whileHover={{ opacity: 0.95, scale: 1.02 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      onClick={() => {
                        if (!transitioningSlug) {
                          setTransitioningSlug(property.slug);
                        }
                      }}
                      className="group min-w-70 max-w-70 cursor-pointer overflow-hidden rounded-xl border border-gray-100 shadow-sm"
                    >
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={property.image}
                          alt={property.name}
                          loading="lazy"
                          decoding="async"
                          onError={hideBrokenImage}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-2 p-4">
                        <h4 className="font-bold text-[#1C1C2E]">{property.name}</h4>
                        <p className="line-clamp-2 text-sm text-gray-500">{property.location}</p>
                        <div className="text-sm font-semibold text-[#C9A84C]">{property.configuration}</div>
                      </div>
                    </motion.article>
                  ))}

                  {featuredProperties.length === 0 ? (
                    <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-500">
                      No extracted properties are available right now.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <QuoteForm defaultInterest={defaultInterest} />
            </div>
          </div>
        </div>

        {transitioningSlug ? (
          <motion.div
            className="pointer-events-none fixed inset-0 z-120 bg-[#07090E]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
          />
        ) : null}

      </div>
    </div>
  );
}

// Individual Service Route Components

export function NewResidential() {
  return (
    <ServicePage 
      title="New Residential Properties" 
      desc="Discover your perfect new home from our curated selection of premium developments."
      defaultInterest="New Residential Property"
      subTabs={[
        { label: "Overview", path: "/services/new-residential" },
        { label: "First-Time Home Buyer", path: "/services/new-residential/first-time-buyer" },
        { label: "Investment Property", path: "/services/new-residential/investment" }
      ]}
    >
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>We partner with top-tier developers to bring you exclusive access to the finest new residential projects. Whether you're looking for a luxury high-rise apartment, a sprawling villa, or a serene gated community, we have the keys to your dream home.</p>
        
        <h4 className="text-xl font-serif font-bold text-[#1C1C2E] pt-4">Loan Assistance & Benefits</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Pre-Approval", "Low Rates", "Flexible Tenure", "Quick Approvals", "Versatile Usage"].map((item, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
              <div className="text-[#C9A84C] font-bold text-xl mb-1">✓</div>
              <div className="text-sm font-semibold text-[#1C1C2E]">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </ServicePage>
  );
}

export function FirstTimeBuyer() {
  return (
    <ServicePage 
      title="First-Time Home Buyer" 
      desc="Your First Home. Our Full Support."
      defaultInterest="New Residential Property"
      subTabs={[
        { label: "Overview", path: "/services/new-residential" },
        { label: "First-Time Home Buyer", path: "/services/new-residential/first-time-buyer" },
        { label: "Investment Property", path: "/services/new-residential/investment" }
      ]}
    >
      <p className="text-gray-600 leading-relaxed">Buying your first home can be daunting. Our experts hold your hand through the entire process, from understanding your budget and securing a mortgage to selecting the right neighborhood and negotiating the best price.</p>
    </ServicePage>
  );
}

export function Investment() {
  return (
    <ServicePage 
      title="Investment Property" 
      desc="Smart Investments. Real Returns."
      defaultInterest="New Residential Property"
      subTabs={[
        { label: "Overview", path: "/services/new-residential" },
        { label: "First-Time Home Buyer", path: "/services/new-residential/first-time-buyer" },
        { label: "Investment Property", path: "/services/new-residential/investment" }
      ]}
    >
      <p className="text-gray-600 leading-relaxed">Maximize your ROI with strategic property investments. We analyze market trends, rental yields, and capital appreciation projections to identify the most lucrative opportunities for your portfolio.</p>
    </ServicePage>
  );
}

export function Resale() {
  return (
    <ServicePage 
      title="Resale Consultancy" 
      desc="Expert guidance for buying or selling pre-owned properties."
      defaultInterest="Resale Consultancy"
      subTabs={[
        { label: "Overview", path: "/services/resale" },
        { label: "Home Seller Consultation", path: "/services/resale/home-seller" },
        { label: "Investment Property", path: "/services/resale/investment" }
      ]}
    >
      <p className="text-gray-600 leading-relaxed">Navigating the resale market requires specific expertise. We provide accurate property valuations, rigorous legal checks, and strategic marketing to ensure a smooth and profitable transaction.</p>
    </ServicePage>
  );
}

export function EndToEnd() {
  return (
    <ServicePage 
      title="End-to-End Solution" 
      desc="Comprehensive support from start to finish."
      defaultInterest="End-to-End Solution"
      subTabs={[
        { label: "Overview", path: "/services/end-to-end" },
        { label: "Property Acquisition", path: "/services/end-to-end/acquisition" },
        { label: "Property Development", path: "/services/end-to-end/development" }
      ]}
    >
      <p className="text-gray-600 leading-relaxed">Experience absolute convenience. From finding the property to legal documentation, interior design, and moving assistance, we handle every detail so you can simply walk into your new life.</p>
    </ServicePage>
  );
}

export function PropertyManagement() {
  return (
    <ServicePage 
      title="Property Management" 
      desc="Professional management services to maintain and grow your asset's value."
      defaultInterest="Property Management"
    >
      <p className="text-gray-600 leading-relaxed">Protect your investment with our comprehensive property management services. We handle tenant screening, rent collection, property maintenance, and legal compliance, ensuring your asset performs optimally without the hassle.</p>
    </ServicePage>
  );
}
