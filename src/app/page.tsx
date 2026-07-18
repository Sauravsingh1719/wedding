"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, Suspense } from "react";
import { Heart, ArrowDown, MapPin, Clock, CalendarHeart } from "lucide-react";
import { useSearchParams } from "next/navigation";

// --- CUSTOM TEXT REVEAL COMPONENTS ---
const WordFade = ({ text, delay = 0, className }: { text: string, delay?: number, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } } }} className={className}>
      {words.map((word, index) => (
        <motion.span key={index} variants={{ hidden: { opacity: 0, y: 10, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } } }} className="inline-block mr-[0.25em]">{word}</motion.span>
      ))}
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ hidden: { opacity: 0, y: 10, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, delay: delay, ease: "easeOut" } } }} className={className}>
    {children}
  </motion.div>
);

const PersonalNote = () => {
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

  if (!message) return null;

  return (
    <section className="min-h-[50vh] flex items-center justify-center relative z-30 px-6 py-12 md:py-20 w-full max-w-4xl mx-auto">
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1, ease: "easeOut" }} className="w-full bg-white/70 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(139,30,65,0.05)] text-center relative">
        <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] uppercase tracking-widest text-[10px] md:text-xs mb-6 md:mb-8">A Personal Note</p>
        {guestName && <h2 className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-5xl text-[#8B1E41] mb-6 drop-shadow-sm">Dear {guestName},</h2>}
        <p className="font-[family-name:var(--font-cormorant)] italic text-xl md:text-3xl text-gray-700 leading-relaxed max-w-2xl mx-auto">"{message}"</p>
      </motion.div>
    </section>
  );
};

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

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg className={className} width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H160C160 0 155 35 120 70C85 105 45 115 45 115C45 115 40 150 0 160V0Z" fill="url(#goldGradient)" opacity="0.08" />
    <path d="M0 0H120C120 0 115 25 85 55C55 85 25 90 25 90C25 90 20 115 0 120V0Z" stroke="url(#goldGradient)" strokeWidth="1.5" />
    <path d="M0 0H80C80 0 76 15 55 35C34 55 15 60 15 60C15 60 11 75 0 80V0Z" fill="url(#goldGradient)" opacity="0.3" />
    <path d="M0 0H40C40 0 38 8 28 18C18 28 8 30 8 30C8 30 6 38 0 40V0Z" fill="url(#goldGradient)" opacity="0.6" />
    <defs><linearGradient id="goldGradient" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37" /><stop offset="1" stopColor="#8C6D1F" /></linearGradient></defs>
  </svg>
);

const GaneshaIcon = ({ className }: { className?: string }) => (
  <div className={className}><Image src="/ganesha.svg" alt="Lord Ganesha" width={280} height={350} priority className="w-full h-auto" /></div>
);

export default function Home() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // --- SYNCHRONIZATION STATE ---
  const [startEntrance, setStartEntrance] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth > 768);
    checkSize();
    window.addEventListener("resize", checkSize);

    // Check if envelope was opened
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("envelopeOpened")) {
        setStartEntrance(true);
      } else {
        const triggerEntrance = () => setStartEntrance(true);
        window.addEventListener("envelopeOpened", triggerEntrance);
        return () => window.removeEventListener("envelopeOpened", triggerEntrance);
      }
    }

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scrollPoints = [0, 0.1, 0.18, 0.25, 0.35, 0.42, 0.50, 0.60, 0.68, 0.75];
  const arrowTop = useTransform(scrollYProgress, scrollPoints, ["80%", "80%", "10%", "50%", "50%", "10%", "50%", "50%", "85%", "65%"]);
  const arrowScale = useTransform(scrollYProgress, scrollPoints, [1, 1, 0.4, 1, 1, 0.4, 1, 1, 0.4, 1]);
  const leftDesktop = useTransform(scrollYProgress, scrollPoints, ["50%", "50%", "50%", "25%", "25%", "25%", "75%", "75%", "75%", "50%"]);
  const leftMobile = useTransform(scrollYProgress, scrollPoints, ["50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"]);
  const arrowLeft = isDesktop ? leftDesktop : leftMobile;

  const brideGlow = useTransform(scrollYProgress, scrollPoints, ["0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 60px 15px rgba(212,175,55,0.3)", "0px 0px 60px 15px rgba(212,175,55,0.3)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)"]);
  const groomGlow = useTransform(scrollYProgress, scrollPoints, ["0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 60px 15px rgba(212,175,55,0.3)", "0px 0px 60px 15px rgba(212,175,55,0.3)", "0px 0px 0px 0px rgba(212,175,55,0)", "0px 0px 0px 0px rgba(212,175,55,0)"]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.85, 0.90], [1, 1, 0]);
  const bounceTransition = { type: "spring", stiffness: 150, damping: 12, mass: 1.2 };

  return (
    <main ref={containerRef} className="bg-[#FDFBF7] text-[#2a0410] relative overflow-x-hidden min-h-screen">

      <div className="fixed inset-0 opacity-[0.5] pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      <div className="fixed inset-4 md:inset-6 border-[1px] border-[#D4AF37]/50 rounded-lg pointer-events-none z-10 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]" />

      <div className="fixed top-2 left-2 md:top-4 md:left-4 z-20 pointer-events-none w-24 h-24 md:w-40 md:h-40"><CornerOrnament className="w-full h-full" /></div>
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-20 pointer-events-none rotate-90 w-24 h-24 md:w-40 md:h-40"><CornerOrnament className="w-full h-full" /></div>
      <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 z-20 pointer-events-none rotate-180 w-24 h-24 md:w-40 md:h-40"><CornerOrnament className="w-full h-full" /></div>
      <div className="fixed bottom-2 left-2 md:bottom-4 md:left-4 z-20 pointer-events-none -rotate-90 w-24 h-24 md:w-40 md:h-40"><CornerOrnament className="w-full h-full" /></div>

      {/* --- FALLING DIYAS (Gated by startEntrance) --- */}
      <div className="absolute top-0 left-0 w-full h-[100dvh] pointer-events-none z-20 overflow-hidden">
        <motion.div initial={{ y: -200, opacity: 0 }} animate={startEntrance ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }} transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.2 }} className="absolute top-0 left-4 md:left-24 flex gap-4 origin-top">
          <HangingDiya /><HangingDiya className="mt-8" />
        </motion.div>
        <motion.div initial={{ y: -200, opacity: 0 }} animate={startEntrance ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }} transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.4 }} className="absolute top-0 right-4 md:right-24 flex gap-4 origin-top">
          <HangingDiya className="mt-8" /><HangingDiya />
        </motion.div>
      </div>

      {/* --- THE 3D FLIGHT AVATAR (Waits slightly longer now to sync) --- */}
      <motion.div initial={{ opacity: 0 }} animate={startEntrance ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 3.5, duration: 1 }} style={{ top: arrowTop, left: arrowLeft, scale: arrowScale, x: "-50%", y: "-50%" }} className="fixed z-50 pointer-events-none">
        <motion.div style={{ opacity: arrowOpacity }} animate={{ scaleY: [1, 1.1, 0.9, 1], scaleX: [1, 0.95, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-b from-[#8B1E41] to-[#4A1023] rounded-full shadow-[0_20px_40px_rgba(139,30,65,0.3)] border-t border-[#D4AF37] border-b-4 border-[#2A0914]">
          <div className="absolute inset-2 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none" />
          <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] drop-shadow-md z-10" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* --- 1. HERO SECTION (Ganesha Gated by startEntrance) --- */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center p-8 relative z-30 pt-16">
        <motion.div initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }} animate={startEntrance ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.85, filter: "blur(10px)" }} transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.5 }} className="flex flex-col items-center mb-8 md:mb-12">
          <GaneshaIcon className="w-32 md:w-48 opacity-90" />
          {startEntrance && <WordFade delay={1.0} text="Shree Ganeshay Namah" className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] mt-4 md:mt-6 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-sm text-center" />}
        </motion.div>

        <div className="text-center space-y-4">
          {startEntrance && (
            <>
              <WordFade delay={1.8} text="Get ready to" className="font-[family-name:var(--font-cinzel)] font-bold text-lg md:text-2xl uppercase tracking-[0.4em] text-[#D4AF37]" />
              <FadeIn delay={2.4}><h1 className="font-[family-name:var(--font-cinzel)] text-5xl md:text-8xl font-bold text-[#8B1E41] drop-shadow-sm leading-tight">MEET THE <br /> COUPLE</h1></FadeIn>
            </>
          )}
        </div>
      </section>

      {/* The rest of the sections (Personal Note, Bride, Groom, etc.) remain untouched as they trigger 'whileInView' */}
      <Suspense fallback={null}>
        <PersonalNote />
      </Suspense>

      <section className="min-h-screen flex items-center justify-center md:justify-start px-4 md:px-24 relative z-30 w-full max-w-7xl mx-auto">
        <motion.div initial={{ x: isDesktop ? 300 : 50, opacity: 0, rotate: isDesktop ? 15 : 5 }} whileInView={{ x: 0, opacity: 1, rotate: -3 }} viewport={{ once: true, amount: 0.1 }} transition={bounceTransition} style={{ boxShadow: brideGlow }} className="w-[85%] md:w-full max-w-[320px] md:max-w-md bg-white border border-[#D4AF37]/30 p-5 md:p-6 rounded-3xl transform origin-bottom-right relative transition-shadow duration-300 shadow-xl">
          <div className="absolute -top-5 -right-3 md:-top-6 md:-right-6 bg-[#8B1E41] text-[#FDFBF7] px-4 py-3 md:p-4 rounded-full shadow-lg rotate-12 z-20 border border-[#D4AF37]/50"><span className="font-[family-name:var(--font-cinzel)] font-bold uppercase tracking-wider text-xs md:text-base">Bride!</span></div>
          <div className="w-full h-56 md:h-64 bg-[#FDF4F6] rounded-2xl mb-4 md:mb-6 overflow-hidden flex items-end justify-center border border-[#8B1E41]/10"><div className="w-28 h-40 md:w-32 md:h-48 bg-white/50 rounded-t-full" /></div>
          <FadeIn delay={0.4}><h2 className="font-[family-name:var(--font-great-vibes)] text-6xl md:text-7xl text-[#8B1E41] text-center mb-4 md:mb-6 mt-4">Kalyani</h2></FadeIn>
          <div className="space-y-3 text-center font-[family-name:var(--font-cormorant)] italic text-lg md:text-xl font-semibold text-[#8B1E41]/90">
            <FadeIn delay={0.6} className="bg-[#FDFBF7] border border-[#D4AF37]/20 py-1.5 md:py-2 rounded-lg">💖 Ghar Ki Ladli Beti</FadeIn>
            <FadeIn delay={0.7} className="bg-[#FDFBF7] border border-[#D4AF37]/20 py-1.5 md:py-2 rounded-lg">🤪 Fun Loving & Clumsy</FadeIn>
            <FadeIn delay={0.8} className="bg-[#FDFBF7] border border-[#D4AF37]/20 py-1.5 md:py-2 rounded-lg">🗣️ Talkative</FadeIn>
          </div>
        </motion.div>
      </section>

      <section className="min-h-screen flex items-center justify-center md:justify-end px-4 md:px-24 relative z-30 w-full max-w-7xl mx-auto">
        <motion.div initial={{ x: isDesktop ? -300 : -50, opacity: 0, rotate: isDesktop ? -15 : -5 }} whileInView={{ x: 0, opacity: 1, rotate: 3 }} viewport={{ once: true, amount: 0.1 }} transition={bounceTransition} style={{ boxShadow: groomGlow }} className="w-[85%] md:w-full max-w-[320px] md:max-w-md bg-white border border-[#D4AF37]/30 p-5 md:p-6 rounded-3xl transform origin-bottom-left relative transition-shadow duration-300 shadow-xl">
          <div className="absolute -top-5 -left-3 md:-top-6 md:-left-6 bg-[#8B1E41] text-[#FDFBF7] px-4 py-3 md:p-4 rounded-full shadow-lg -rotate-12 z-20 border border-[#D4AF37]/50"><span className="font-[family-name:var(--font-cinzel)] font-bold uppercase tracking-wider text-xs md:text-base">Groom!</span></div>
          <div className="w-full h-56 md:h-64 bg-[#F4F7F4] rounded-2xl mb-4 md:mb-6 overflow-hidden flex items-end justify-center border border-[#8B1E41]/10"><div className="w-28 h-40 md:w-32 md:h-48 bg-white/50 rounded-t-full" /></div>
          <FadeIn delay={0.4}><h2 className="font-[family-name:var(--font-great-vibes)] text-6xl md:text-7xl text-[#8B1E41] text-center mb-4 md:mb-6 mt-4">Sachin</h2></FadeIn>
          <div className="space-y-3 text-center font-[family-name:var(--font-cormorant)] italic text-lg md:text-xl font-semibold text-[#8B1E41]/90">
            <FadeIn delay={0.6} className="bg-[#FDFBF7] border border-[#D4AF37]/20 py-1.5 md:py-2 rounded-lg">👔 Ghar ka Ladla Beta</FadeIn>
            <FadeIn delay={0.7} className="bg-[#FDFBF7] border border-[#D4AF37]/20 py-1.5 md:py-2 rounded-lg">🧘‍♂️ Responsible & Calm</FadeIn>
            <FadeIn delay={0.8} className="bg-[#FDFBF7] border border-[#D4AF37]/20 py-1.5 md:py-2 rounded-lg">📅 Always Planned</FadeIn>
          </div>
        </motion.div>
      </section>

      <section className="min-h-[90vh] flex flex-col items-center justify-center relative z-30 p-4">
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12">
          <motion.div initial={{ x: isDesktop ? -100 : -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={bounceTransition} className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#D4AF37] z-10"><span className="font-[family-name:var(--font-cinzel)] text-3xl md:text-5xl text-[#8B1E41]">S</span></motion.div>
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ type: "spring", delay: 0.3, stiffness: 300, damping: 10 }} className="z-20 -mx-6 md:-mx-8 bg-[#FDFBF7] rounded-full p-2 md:p-3 shadow-lg border border-[#D4AF37]/40"><Heart className="w-8 h-8 md:w-10 md:h-10 text-[#8B1E41] fill-[#8B1E41] animate-pulse" /></motion.div>
          <motion.div initial={{ x: isDesktop ? 100 : 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={bounceTransition} className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#D4AF37] z-10"><span className="font-[family-name:var(--font-cinzel)] text-3xl md:text-5xl text-[#8B1E41]">K</span></motion.div>
        </div>
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ type: "spring", stiffness: 100, delay: 0.5 }} className="text-center bg-white p-8 md:p-14 rounded-3xl shadow-[0_15px_40px_rgba(139,30,65,0.08)] border border-[#D4AF37]/30 w-[90%] md:w-full max-w-2xl relative overflow-hidden">
          <div className="mb-6 md:mb-8 relative z-10">
            <WordFade delay={0.6} text="Different hearts." className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-6xl text-[#8B1E41] block" />
            <WordFade delay={1.0} text="Different worlds." className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-6xl text-[#8B1E41] block" />
          </div>
          <div className="relative z-10">
            <WordFade delay={1.4} text="One beautiful destiny." className="font-[family-name:var(--font-cinzel)] tracking-widest text-sm md:text-lg text-gray-600 font-bold uppercase block" />
            <WordFade delay={1.8} text="Now, one forever." className="font-[family-name:var(--font-cinzel)] tracking-widest text-sm md:text-lg text-gray-600 font-bold uppercase block mt-1 md:mt-2" />
          </div>
        </motion.div>
      </section>

      <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-30 p-4">
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={bounceTransition} className="text-center bg-white p-8 md:p-14 rounded-3xl shadow-[0_15px_40px_rgba(139,30,65,0.08)] border border-[#D4AF37]/30 w-[90%] md:w-full max-w-2xl">
          <WordFade delay={0.3} text="The Celebration" className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-[#8B1E41] mb-8 border-b-2 border-[#D4AF37]/20 pb-4 md:pb-6 inline-block uppercase tracking-wider" />
          <div className="space-y-4 md:space-y-6 text-gray-800 font-[family-name:var(--font-cormorant)]">
            <FadeIn delay={0.6} className="flex items-center justify-center gap-3"><CalendarHeart className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" /><p className="text-xl md:text-3xl font-semibold">10th December 2026</p></FadeIn>
            <FadeIn delay={0.8} className="flex items-center justify-center gap-3"><Clock className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" /><p className="text-lg md:text-2xl">7:00 PM Onwards</p></FadeIn>
            <FadeIn delay={1.0} className="flex items-center justify-center gap-3"><MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" /><p className="text-lg md:text-2xl max-w-xs">Dhanbad, Jharkhand</p></FadeIn>
          </div>
          <FadeIn delay={1.4}>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 mt-8 md:mt-10 px-6 py-3 md:px-8 md:py-4 bg-[#8B1E41] text-[#FDFBF7] rounded-full font-bold font-[family-name:var(--font-cinzel)] tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#6c1631] transition-all duration-300 text-xs md:text-sm uppercase"><MapPin className="w-4 h-4 md:w-5 md:h-5" /> View on Google Maps</a>
          </FadeIn>
        </motion.div>
      </section>

      <section className="min-h-[70vh] flex flex-col items-center justify-center relative z-30 p-8 text-center pb-24">
        <WordFade delay={0.2} text="We gracefully await your presence to bless the couple as they embark on this beautiful journey." className="font-[family-name:var(--font-cormorant)] italic text-2xl md:text-5xl text-[#8B1E41] leading-relaxed max-w-3xl mx-auto drop-shadow-sm px-4" />
        <FadeIn delay={1.0}><div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-10 md:mt-12 mb-8" /></FadeIn>
        <WordFade delay={1.2} text="With Warm Regards," className="font-[family-name:var(--font-cinzel)] text-gray-500 uppercase tracking-[0.3em] text-xs md:text-sm font-bold" />
        <FadeIn delay={1.6}><span className="font-[family-name:var(--font-great-vibes)] text-[#8B1E41] text-5xl md:text-6xl capitalize tracking-normal leading-tight block mt-4">The Singh Family</span></FadeIn>
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
      
      </section>
    </main>
  );
}