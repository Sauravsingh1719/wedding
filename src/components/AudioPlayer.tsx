"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, MailOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Lock scrolling while the user is on the Welcome Screen
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hasEntered]);

  // Handle the "Open Invitation" click
  const handleEnter = () => {
    if (audioRef.current) {
        audioRef.current.volume = 0.7;
      audioRef.current.play();
      setIsPlaying(true);
    }
    setHasEntered(true);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop src="/music.mp3" preload="auto" />

      {/* --- THE ROYAL WELCOME SCREEN (Digital Envelope) --- */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#2a0410] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"
          >
            {/* Sunset Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#8B1E41]/40 to-transparent z-0" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10 flex flex-col items-center text-center px-6"
            >
              <p className="font-[family-name:var(--font-cinzel)] text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
                You are invited
              </p>
              <h1 className="font-[family-name:var(--font-great-vibes)] text-6xl md:text-8xl text-white drop-shadow-md mb-12">
                Kalyani & Sachin
              </h1>

              {/* The Action Button (Unlocks Audio) */}
              <button
                onClick={handleEnter}
                className="group relative px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-[family-name:var(--font-cinzel)] tracking-widest text-sm uppercase overflow-hidden hover:text-[#2a0410] transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-[-1]" />
                <span className="flex items-center gap-3">
                  Open Invitation <MailOpen size={18} />
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING AUDIO CONTROLS (Only appear after entering) --- */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[100]"
          >
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/70 backdrop-blur-md border border-[#D4AF37]/50 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(139,30,65,0.2)] text-[#8B1E41] hover:bg-[#8B1E41] hover:text-[#D4AF37] transition-colors duration-300"
            >
              {isPlaying ? <Volume2 size={20} strokeWidth={2} /> : <VolumeX size={20} strokeWidth={2} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}