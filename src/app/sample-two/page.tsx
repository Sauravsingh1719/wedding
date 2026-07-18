"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// --- CUSTOM TEXT REVEAL COMPONENTS ---

// Elegantly writes out text word-by-word
const WordFade = ({ text, active, delay = 0, className }: { text: string, active: boolean, delay?: number, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } } // Fast, elegant stagger
      }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } }
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Smoothly fades in single elements (like large names or buttons)
const FadeIn = ({ children, active, delay = 0, className }: { children: React.ReactNode, active: boolean, delay?: number, className?: string }) => (
  <motion.div
    initial="hidden"
    animate={active ? "visible" : "hidden"}
    variants={{
      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, delay: delay, ease: "easeOut" } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);


// --- SVG ASSETS FOR THE TRADITIONAL LOOK ---
const HangingDiya = ({ className }: { className?: string }) => (
  <svg className={className} width="40" height="120" viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0V80" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" />
    <path d="M20 80L25 85L20 100L15 85L20 80Z" fill="#D4AF37" />
    <path d="M20 100C20 100 28 100 28 105C28 110 20 115 20 115C20 115 12 110 12 105C12 100 20 100 20 100Z" fill="#8B1E41" />
    <circle cx="20" cy="98" r="3" fill="#FFC107" />
    <path d="M20 95L22 90L20 88L18 90L20 95Z" fill="#FFA000" />
  </svg>
);

const CornerFloral = ({ className }: { className?: string }) => (
  <svg className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0C50 0 100 20 150 50C100 100 50 120 0 150V0Z" fill="#FDF4F6" opacity="0.6" />
    <path d="M0 0C40 10 80 40 100 80C60 90 20 100 0 120V0Z" fill="#F4E6E8" opacity="0.8" />
    <circle cx="30" cy="30" r="15" fill="#E8B4B8" opacity="0.7" />
    <circle cx="60" cy="20" r="10" fill="#8B1E41" opacity="0.4" />
    <circle cx="20" cy="60" r="12" fill="#D4AF37" opacity="0.3" />
  </svg>
);

const GaneshaIcon = () => (
  <Image src="/ganesha.svg" alt="Lord Ganesha" width={280} height={350} priority />
);

export default function SampleTwo() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- SCROLL SENSOR (Triggers the text writing animations) ---
  const [activeSlide, setActiveSlide] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setActiveSlide(1);
    else if (latest >= 0.2 && latest < 0.45) setActiveSlide(2);
    else if (latest >= 0.45 && latest < 0.74) setActiveSlide(3);
    else if (latest >= 0.74) setActiveSlide(4);
  });

  // --- THE CINEMATIC CROSS-FADE TIMELINES ---
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);
  const display1 = useTransform(scrollYProgress, [0, 0.25, 0.26], ["flex", "flex", "none"]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1.05]);
  const display2 = useTransform(scrollYProgress, [0.19, 0.2, 0.5, 0.51], ["none", "flex", "flex", "none"]);

  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.45, 0.8], [0.95, 1.05]);
  const display3 = useTransform(scrollYProgress, [0.44, 0.45, 0.8, 0.81], ["none", "flex", "flex", "none"]);

  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0.75, 1], [1.1, 1]);
  const display4 = useTransform(scrollYProgress, [0.74, 0.75, 1], ["none", "flex", "flex"]);

  const globalElementsOpacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);
  const globalElementsDisplay = useTransform(scrollYProgress, [0.65, 0.75, 0.76], ["block", "block", "none"]);


  return (
    <main ref={containerRef} className="h-[400vh] bg-[#FDFBF7] text-gray-800 relative">

      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">

        {/* --- 🪄 THE MAGICAL ROYAL BACKGROUND --- */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          className="absolute inset-0 z-0 bg-[#FBF8F1] pointer-events-none overflow-hidden"
        >
          <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(139,30,65,0.08)_0%,transparent_70%)] blur-3xl"
          />
          <div className="absolute inset-3 md:inset-5 border-[1px] border-[#D4AF37]/30 rounded-lg shadow-[inset_0_0_40px_rgba(212,175,55,0.05)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(42,4,16,0.05)_100%)]" />
        </motion.div>


        {/* --- GLOBAL BORDERS & FALLING DIYAS --- */}
        <motion.div style={{ opacity: globalElementsOpacity, display: globalElementsDisplay }} className="absolute inset-0 pointer-events-none z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}>
            <CornerFloral className="absolute top-0 left-0" />
            <CornerFloral className="absolute top-0 right-0 rotate-90" />
            <CornerFloral className="absolute bottom-0 right-0 rotate-180" />
            <CornerFloral className="absolute bottom-0 left-0 -rotate-90" />
          </motion.div>
          <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.2 }} className="absolute top-0 left-4 md:left-24 flex gap-4 origin-top">
            <HangingDiya /><HangingDiya className="mt-8" />
          </motion.div>
          <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.4 }} className="absolute top-0 right-4 md:right-24 flex gap-4 origin-top">
            <HangingDiya className="mt-8" /><HangingDiya />
          </motion.div>
        </motion.div>

        {/* --- SLIDE 1: GANESHA --- */}
        <motion.div style={{ opacity: opacity1, scale: scale1, display: display1 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <GaneshaIcon />
            {/* WRITTEN TEXT REVEAL */}
            <WordFade active={activeSlide === 1} delay={1.8} text="Shree Ganeshay Namah" className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] mt-4 md:mt-6 tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-sm" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.8 }} className="absolute bottom-12 font-[family-name:var(--font-cormorant)] text-gray-500 italic text-sm animate-pulse">
            Scroll down
          </motion.p>
        </motion.div>

        {/* --- SLIDE 2: THE MONOGRAM --- */}
        <motion.div style={{ opacity: opacity2, scale: scale2, display: display2 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none px-4">
          <FadeIn active={activeSlide === 2} delay={0} className="relative">
            <h1 className="font-[family-name:var(--font-great-vibes)] text-8xl md:text-9xl text-[#8B1E41] drop-shadow-sm">
              S<span className="text-[#D4AF37] font-[family-name:var(--font-cinzel)] text-5xl md:text-7xl mx-4">&</span>K
            </h1>
          </FadeIn>

          <FadeIn active={activeSlide === 2} delay={0.2}>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8B1E41] to-transparent my-6" />
          </FadeIn>

          <WordFade active={activeSlide === 2} delay={0.3} text="Sachin & Kalyani" className="font-[family-name:var(--font-cinzel)] text-xl md:text-2xl text-gray-700 tracking-widest uppercase" />
        </motion.div>

        {/* --- SLIDE 3: THE FORMAL INVITATION --- */}
        <motion.div style={{ opacity: opacity3, scale: scale3, display: display3 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none px-6 text-center">

          <WordFade active={activeSlide === 3} delay={0} text="You are invited to the wedding of" className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase mb-6 md:mb-8" />

          <FadeIn active={activeSlide === 3} delay={0.3}>
            <h2 className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-7xl text-[#8B1E41] mb-1 md:mb-2 drop-shadow-sm">Kalyani</h2>
          </FadeIn>

          <WordFade active={activeSlide === 3} delay={0.5} text="(D/o Smt. & Shri Singh)" className="font-[family-name:var(--font-cormorant)] text-gray-700 italic text-sm md:text-base font-semibold mb-4 md:mb-6" />

          <WordFade active={activeSlide === 3} delay={0.7} text="With" className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase mb-4 md:mb-6" />

          <FadeIn active={activeSlide === 3} delay={0.9}>
            <h2 className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-7xl text-[#8B1E41] mb-1 md:mb-2 drop-shadow-sm">Sachin</h2>
          </FadeIn>

          <WordFade active={activeSlide === 3} delay={1.1} text="(S/o Smt. & Shri Singh)" className="font-[family-name:var(--font-cormorant)] text-gray-700 italic text-sm md:text-base font-semibold mb-8 md:mb-10" />

          <FadeIn active={activeSlide === 3} delay={1.3}>
            <div className="w-24 h-[1px] bg-[#D4AF37]/50 mb-6 mx-auto" />
          </FadeIn>

          <WordFade active={activeSlide === 3} delay={1.4} text="Thursday, 10th December 2026" className="font-[family-name:var(--font-cormorant)] text-[#8B1E41] text-xl md:text-2xl font-bold" />
        </motion.div>

        {/* --- SLIDE 4: THE PALACE VENUE --- */}
        <motion.div style={{ opacity: opacity4, display: display4 }} className="absolute inset-0 z-30 flex-col items-center justify-center">
          <motion.div style={{ scale: scale4 }} className="absolute inset-0 bg-[#2a0410] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#8B1E41]/40 to-transparent" />
          </motion.div>

          <div className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center">

            <WordFade active={activeSlide === 4} delay={0} text="A celebration of love, laughter and happily ever after!" className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase mb-8 leading-loose" />

            <FadeIn active={activeSlide === 4} delay={0.4} className="border-b border-[#D4AF37]/50 pb-6 mb-10 md:mb-12">
              <h2 className="font-[family-name:var(--font-cormorant)] text-white text-3xl md:text-5xl">10th December 2026</h2>
            </FadeIn>

            <div className="space-y-4 font-[family-name:var(--font-cinzel)] text-gray-300 tracking-wider text-sm md:text-base mb-10 md:mb-12">
              <WordFade active={activeSlide === 4} delay={0.6} text="Wedding: 6:00 PM" />
              <WordFade active={activeSlide === 4} delay={0.8} text="Reception: 8:00 PM" />
            </div>

            <WordFade active={activeSlide === 4} delay={1.0} text="Venue" className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-widest text-xs uppercase mb-3 md:mb-4" />

            <WordFade active={activeSlide === 4} delay={1.2} text="The Grand Palace, Dhanbad, Jharkhand" className="font-[family-name:var(--font-cormorant)] text-white italic text-lg md:text-xl" />

            <FadeIn active={activeSlide === 4} delay={1.6}>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-10 md:mt-12 px-6 py-3 md:px-8 md:py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-[family-name:var(--font-cinzel)] text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                Open in Maps
              </a>
            </FadeIn>

          </div>
        </motion.div>

      </div>
    </main>
  );
}