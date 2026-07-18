"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// --- SVG ASSETS ---
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

const SlideSixContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  let message = "";
  let guestName = "";

  if (id) {
    try {
      const decodedString = decodeURIComponent(escape(atob(id)));
      const data = JSON.parse(decodedString);
      message = data.m || "";
      guestName = data.n || "";
    } catch (error) {
      console.error("Invalid invite link format.");
    }
  }

  return (
    <div className="w-full max-w-2xl px-6 flex flex-col items-center">
      {message && (
        <div className="mb-12 w-full bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(139,30,65,0.05)]">
          <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6">A Personal Note</p>
          {guestName && <h2 className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-5xl text-[#8B1E41] mb-4">Dear {guestName},</h2>}
          <p className="font-[family-name:var(--font-cormorant)] italic text-xl md:text-2xl text-gray-700 leading-relaxed">"{message}"</p>
        </div>
      )}
      <p className="font-[family-name:var(--font-cormorant)] italic text-xl md:text-3xl text-[#8B1E41] leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-sm px-4">
        We gracefully await your presence to bless the couple as they embark on this beautiful journey.
      </p>
      <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-8" />
      <p className="font-[family-name:var(--font-cinzel)] text-gray-500 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4">With Warm Regards,</p>
      <p className="font-[family-name:var(--font-great-vibes)] text-[#8B1E41] text-5xl md:text-6xl capitalize">The Singh Family</p>
      <div className="w-full text-center mt-16 pb-8 pointer-events-auto">
  <a 
    href="https://saurav190.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="font-[family-name:var(--font-cinzel)] text-[#D4AF37]/70 hover:text-[#8B1E41] text-[10px] md:text-xs uppercase tracking-[0.3em] transition-colors duration-300"
  >
    Designed & Developed with ❤️ by Saurav Singh
  </a>
</div>
    </div>
  );
};

export default function SampleTwo() {
  const containerRef = useRef(null);

  // --- SYNCHRONIZATION STATE ---
  const [startEntrance, setStartEntrance] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("envelopeOpened")) {
        setStartEntrance(true);
      } else {
        const triggerEntrance = () => setStartEntrance(true);
        window.addEventListener("envelopeOpened", triggerEntrance);
        return () => window.removeEventListener("envelopeOpened", triggerEntrance);
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Timelines
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.16], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.16], [1, 1.1]);
  const display1 = useTransform(scrollYProgress, [0, 0.16, 0.17], ["flex", "flex", "none"]);
  const opacity2 = useTransform(scrollYProgress, [0.12, 0.16, 0.28, 0.32], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.12, 0.32], [0.95, 1.05]);
  const display2 = useTransform(scrollYProgress, [0.11, 0.12, 0.32, 0.33], ["none", "flex", "flex", "none"]);
  const opacity3 = useTransform(scrollYProgress, [0.28, 0.32, 0.44, 0.48], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.28, 0.48], [0.95, 1.05]);
  const display3 = useTransform(scrollYProgress, [0.27, 0.28, 0.48, 0.49], ["none", "flex", "flex", "none"]);
  const opacity4 = useTransform(scrollYProgress, [0.44, 0.48, 0.60, 0.64], [0, 1, 1, 0]);
  const scale4 = useTransform(scrollYProgress, [0.44, 0.64], [0.95, 1.05]);
  const display4 = useTransform(scrollYProgress, [0.43, 0.44, 0.64, 0.65], ["none", "flex", "flex", "none"]);
  const opacity5 = useTransform(scrollYProgress, [0.60, 0.64, 0.76, 0.80], [0, 1, 1, 0]);
  const scale5 = useTransform(scrollYProgress, [0.60, 0.80], [1.1, 1]);
  const display5 = useTransform(scrollYProgress, [0.59, 0.60, 0.80, 0.81], ["none", "flex", "flex", "none"]);
  const opacity6 = useTransform(scrollYProgress, [0.76, 0.80, 1], [0, 1, 1]);
  const scale6 = useTransform(scrollYProgress, [0.76, 1], [0.95, 1]);
  const display6 = useTransform(scrollYProgress, [0.75, 0.76, 1], ["none", "flex", "flex"]);
  const globalElementsOpacity = useTransform(scrollYProgress, [0, 0.55, 0.64, 0.76, 0.82, 1], [1, 1, 0, 0, 1, 1]);
  const globalElementsDisplay = useTransform(scrollYProgress, [0, 0.64, 0.65, 0.75, 0.76, 1], ["block", "block", "none", "none", "block", "block"]);

  return (
    <main ref={containerRef} className="h-[600vh] bg-[#FDFBF7] text-gray-800 relative">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">

        {/* Background */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0 z-0 bg-[#FBF8F1] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-3xl" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(139,30,65,0.08)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-3 md:inset-5 border-[1px] border-[#D4AF37]/30 rounded-lg shadow-[inset_0_0_40px_rgba(212,175,55,0.05)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(42,4,16,0.05)_100%)]" />
        </motion.div>

        {/* --- GLOBAL BORDERS & FALLING DIYAS (Gated by startEntrance) --- */}
        <motion.div style={{ opacity: globalElementsOpacity, display: globalElementsDisplay }} className="absolute inset-0 pointer-events-none z-10">
          <motion.div initial={{ opacity: 0 }} animate={startEntrance ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 2, delay: 0.5 }}>
            <CornerFloral className="absolute top-0 left-0" />
            <CornerFloral className="absolute top-0 right-0 rotate-90" />
            <CornerFloral className="absolute bottom-0 right-0 rotate-180" />
            <CornerFloral className="absolute bottom-0 left-0 -rotate-90" />
          </motion.div>

          <motion.div initial={{ y: -200, opacity: 0 }} animate={startEntrance ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }} transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.2 }} className="absolute top-0 left-4 md:left-24 flex gap-4 origin-top">
            <HangingDiya /><HangingDiya className="mt-8" />
          </motion.div>
          <motion.div initial={{ y: -200, opacity: 0 }} animate={startEntrance ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }} transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.4 }} className="absolute top-0 right-4 md:right-24 flex gap-4 origin-top">
            <HangingDiya className="mt-8" /><HangingDiya />
          </motion.div>
        </motion.div>

        {/* --- SLIDE 1: GANESHA (Gated by startEntrance) --- */}
        <motion.div style={{ opacity: opacity1, scale: scale1, display: display1 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }} animate={startEntrance ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.85, filter: "blur(10px)" }} transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay: 0.5 }} className="flex flex-col items-center">
            <GaneshaIcon />
            <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] mt-4 md:mt-6 tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-sm">Shree Ganeshay Namah</p>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={startEntrance ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.0 }} className="absolute bottom-12 font-[family-name:var(--font-cormorant)] text-gray-500 italic text-sm animate-pulse">
            Scroll down
          </motion.p>
        </motion.div>

        {/* --- SLIDE 2: THE MONOGRAM --- */}
        <motion.div style={{ opacity: opacity2, scale: scale2, display: display2 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none px-4">
          <div className="relative"><h1 className="font-[family-name:var(--font-great-vibes)] text-8xl md:text-9xl text-[#8B1E41] drop-shadow-sm">S<span className="text-[#D4AF37] font-[family-name:var(--font-cinzel)] text-5xl md:text-7xl mx-4">&</span>K</h1></div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8B1E41] to-transparent my-6" />
          <h2 className="font-[family-name:var(--font-cinzel)] text-xl md:text-2xl text-gray-700 tracking-widest uppercase">Sachin & Kalyani</h2>
        </motion.div>

        {/* --- SLIDE 3: THE ROYAL PORTRAIT --- */}
        <motion.div style={{ opacity: opacity3, scale: scale3, display: display3 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none px-4">
          <div className="relative p-2 md:p-3 border border-[#D4AF37]/40 rounded-t-full rounded-b-xl shadow-[0_20px_50px_rgba(139,30,65,0.15)] bg-white/40 backdrop-blur-sm">
            <div className="relative w-[260px] h-[360px] md:w-[320px] md:h-[440px] overflow-hidden rounded-t-full rounded-b-lg border border-[#D4AF37]/20 bg-[#FDF4F6] flex flex-col items-center justify-center">
              <Image src="/image.jpg" alt="Sachin & Kalyani" fill className="object-cover opacity-95 mix-blend-multiply" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8B1E41]/30"><span className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest uppercase">The Couple</span></div>
            </div>
          </div>
          <h2 className="mt-8 font-[family-name:var(--font-great-vibes)] text-5xl md:text-6xl text-[#8B1E41] drop-shadow-sm">Sachin & Kalyani</h2>
        </motion.div>

        {/* --- SLIDE 4: THE FORMAL INVITATION --- */}
        <motion.div style={{ opacity: opacity4, scale: scale4, display: display4 }} className="absolute inset-0 flex-col items-center justify-center z-20 pointer-events-none px-6 text-center">
          <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase mb-6 md:mb-8">You are invited to the wedding of</p>
          <h2 className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-7xl text-[#8B1E41] mb-1 md:mb-2 drop-shadow-sm">Kalyani</h2>
          <p className="font-[family-name:var(--font-cormorant)] text-gray-700 italic text-sm md:text-base font-semibold mb-4 md:mb-6">(D/o Smt. & Shri Singh)</p>
          <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase mb-4 md:mb-6">With</p>
          <h2 className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-7xl text-[#8B1E41] mb-1 md:mb-2 drop-shadow-sm">Sachin</h2>
          <p className="font-[family-name:var(--font-cormorant)] text-gray-700 italic text-sm md:text-base font-semibold mb-8 md:mb-10">(S/o Smt. & Shri Singh)</p>
          <div className="w-24 h-[1px] bg-[#D4AF37]/50 mb-6 mx-auto" />
          <p className="font-[family-name:var(--font-cormorant)] text-[#8B1E41] text-xl md:text-2xl font-bold">Thursday, 10th December 2026</p>
        </motion.div>

        {/* --- SLIDE 5: THE PALACE VENUE --- */}
        <motion.div style={{ opacity: opacity5, display: display5 }} className="absolute inset-0 z-30 flex-col items-center justify-center">
          <motion.div style={{ scale: scale5 }} className="absolute inset-0 bg-[#2a0410] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#8B1E41]/40 to-transparent" />
          </motion.div>
          <div className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center pointer-events-none">
            <h3 className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase mb-8 leading-loose">A celebration of love, laughter <br /> and happily ever after!</h3>
            <h2 className="font-[family-name:var(--font-cormorant)] text-white text-3xl md:text-5xl mb-10 md:mb-12 border-b border-[#D4AF37]/50 pb-6">10th December 2026</h2>
            <div className="space-y-4 font-[family-name:var(--font-cinzel)] text-gray-300 tracking-wider text-sm md:text-base mb-10 md:mb-12">
              <p><span className="text-[#D4AF37]">Wedding:</span> 6:00 PM</p>
              <p><span className="text-[#D4AF37]">Reception:</span> 8:00 PM</p>
            </div>
            <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-widest text-xs uppercase mb-3 md:mb-4">Venue</p>
            <p className="font-[family-name:var(--font-cormorant)] text-white italic text-lg md:text-xl">The Grand Palace, Dhanbad, <br /> Jharkhand</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="pointer-events-auto mt-10 md:mt-12 px-6 py-3 md:px-8 md:py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-[family-name:var(--font-cinzel)] text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">Open in Maps</a>
          </div>
        </motion.div>

        {/* --- SLIDE 6: PERSONAL NOTE & BLESSINGS --- */}
        <motion.div style={{ opacity: opacity6, scale: scale6, display: display6 }} className="absolute inset-0 flex-col items-center justify-center z-20 text-center pointer-events-none">
          <Suspense fallback={null}>
            <SlideSixContent />
          </Suspense>
        </motion.div>

      </div>
    </main>
  );
}