import { motion } from "framer-motion";

import { ProjectsWorkingWith } from "@/components/ProjectsWorkingWith";

export function PropertiesPage() {
  return (
    <div className="w-full min-h-screen bg-[#07090E] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="text-[#C9A84C] font-semibold tracking-widest uppercase text-sm mb-3">
            Properties
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FDFAF5]">
            Explore Our Properties
          </h1>
        </motion.div>

        <ProjectsWorkingWith tone="dark" openOnCardClick />
      </div>
    </div>
  );
}
