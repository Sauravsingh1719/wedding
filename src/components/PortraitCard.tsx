"use client";

import { motion } from "framer-motion";
import CinematicReveal from "./CinematicReveal";

interface PortraitCardProps {
  name: string;
  role: "Bride" | "Groom";
  traits: string[];
  imageSrc: string; // We'll put placeholder images for now
  theme: "pink" | "green";
}

export default function PortraitCard({ name, role, traits, imageSrc, theme }: PortraitCardProps) {
  const isPink = theme === "pink";
  const bgColor = isPink ? "bg-[#FDF4F6]" : "bg-[#F4F7F4]";
  const borderColor = isPink ? "border-[#E8B4B8]" : "border-[#A3B899]";
  const textColor = isPink ? "text-[#8B1E41]" : "text-[#2C4C3B]";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <CinematicReveal direction="up" delay={0.2}>
      <div className={`relative p-6 rounded-2xl border-[1px] ${borderColor} ${bgColor} shadow-sm overflow-hidden flex flex-col items-center max-w-sm w-full mx-auto`}>
        
        {/* The Role & Name */}
        <div className="text-center mb-6 z-10">
          <p className="font-lato text-xs tracking-widest uppercase text-gray-500 mb-2">
            Meet Our {role}
          </p>
          <h2 className={`font-playfair text-4xl ${textColor}`}>
            {name}
          </h2>
        </div>

        {/* The Traits List - Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="w-full text-center space-y-3 mb-8 z-10 min-h-[140px]"
        >
          {traits.map((trait, index) => (
            <motion.div key={index} variants={itemVariants}>
              <p className={`font-lato text-sm font-medium ${textColor} opacity-80`}>
                {trait}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* The Photo Cutout placeholder */}
        <div className="relative w-full h-64 mt-auto flex justify-center items-end">
          {/* For now, just a colored block representing the cutout image. 
              Later, replace this div with an <img src={imageSrc} className="object-contain" /> */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className={`w-48 h-full rounded-t-full opacity-80 ${isPink ? 'bg-[#E8B4B8]' : 'bg-[#A3B899]'}`}
          />
        </div>

      </div>
    </CinematicReveal>
  );
}