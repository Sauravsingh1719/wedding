"use client";

import { useState, useEffect } from "react";
import { Copy, Check, MessageCircle, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function InviteGenerator() {
    const [guestName, setGuestName] = useState("");
    const [inviteType, setInviteType] = useState("solo");
    const [plusCount, setPlusCount] = useState("1");
    const [familyNames, setFamilyNames] = useState("");
    const [personalMessage, setPersonalMessage] = useState("");

    const [generatedUrl1, setGeneratedUrl1] = useState("");
    const [generatedUrl2, setGeneratedUrl2] = useState("");

    const [copied1, setCopied1] = useState(false);
    const [copied2, setCopied2] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);

    const generateLink = () => {
        if (!guestName.trim()) return;

        // 1. Create a clean data object
        const inviteData: Record<string, string> = {
            n: guestName.trim(),
        };

        if (inviteType === "family") {
            inviteData.t = "f";
            if (familyNames.trim()) inviteData.fn = familyNames.trim();
        } else if (inviteType === "plus") {
            inviteData.t = "p";
            inviteData.c = plusCount;
        }

        if (personalMessage.trim()) {
            inviteData.m = personalMessage.trim();
        }

        // 2. Convert to JSON, handle special characters/emojis safely, and Base64 Encode
        const jsonString = JSON.stringify(inviteData);
        const encodedData = btoa(unescape(encodeURIComponent(jsonString)));

        // 3. Generate BOTH links
        setGeneratedUrl1(`${baseUrl}/?id=${encodedData}`);
        setGeneratedUrl2(`${baseUrl}/sample-two?id=${encodedData}`);

        // Reset copy states
        setCopied1(false);
        setCopied2(false);
    };

    const copyToClipboard = (url: string, type: 1 | 2) => {
        navigator.clipboard.writeText(url);
        if (type === 1) {
            setCopied1(true);
            setTimeout(() => setCopied1(false), 2000);
        } else {
            setCopied2(true);
            setTimeout(() => setCopied2(false), 2000);
        }
    };

    const shareOnWhatsApp = (url: string, designName: string) => {
        const message = `Dear ${guestName},\n\nWe gracefully await your presence to bless us as we embark on this beautiful journey.\n\nPlease open your personalized wedding invitation here:\n${url}\n\nWith Warm Regards,\nSachin & Kalyani`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 font-[family-name:var(--font-lato)] text-[#2a0410]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl border border-[#D4AF37]/30">
                <h1 className="font-[family-name:var(--font-cinzel)] text-3xl text-[#8B1E41] text-center mb-2 font-bold">Invite Generator</h1>
                <p className="text-center text-gray-500 mb-8 text-sm">Create secure, hidden links for your guests</p>

                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-[#8B1E41] mb-2 uppercase tracking-wider">Primary Guest Name *</label>
                        <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="e.g. Rahul Sharma" className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all bg-[#FDFBF7]" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#8B1E41] mb-2 uppercase tracking-wider">Guest Format</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={() => setInviteType("solo")} className={`py-3 rounded-xl border text-sm ${inviteType === "solo" ? "bg-[#8B1E41] text-white border-[#8B1E41]" : "bg-transparent text-gray-600 border-gray-200 hover:border-[#D4AF37]"}`}>Solo</button>
                            <button onClick={() => setInviteType("family")} className={`py-3 rounded-xl border text-sm ${inviteType === "family" ? "bg-[#8B1E41] text-white border-[#8B1E41]" : "bg-transparent text-gray-600 border-gray-200 hover:border-[#D4AF37]"}`}>& Family</button>
                            <button onClick={() => setInviteType("plus")} className={`py-3 rounded-xl border text-sm flex items-center justify-center gap-2 ${inviteType === "plus" ? "bg-[#8B1E41] text-white border-[#8B1E41]" : "bg-transparent text-gray-600 border-gray-200 hover:border-[#D4AF37]"}`}>+ Guests</button>
                        </div>
                    </div>

                    {inviteType === "family" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                            <label className="block text-xs font-bold text-[#8B1E41] mb-2 uppercase tracking-wider">Family Members (Optional)</label>
                            <input type="text" value={familyNames} onChange={(e) => setFamilyNames(e.target.value)} placeholder="e.g. Aarti & Kids" className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none bg-[#FDFBF7]" />
                        </motion.div>
                    )}

                    {inviteType === "plus" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                            <label className="block text-xs font-bold text-[#8B1E41] mb-2 uppercase tracking-wider">Number of extra guests</label>
                            <input type="number" min="1" max="10" value={plusCount} onChange={(e) => setPlusCount(e.target.value)} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#D4AF37] outline-none bg-[#FDFBF7]" />
                        </motion.div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-[#8B1E41] mb-2 uppercase tracking-wider">Personalized Message (Optional)</label>
                        <textarea value={personalMessage} onChange={(e) => setPersonalMessage(e.target.value)} placeholder="e.g. We can't wait to celebrate with you!" rows={3} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all bg-[#FDFBF7] resize-none" />
                    </div>

                    <button onClick={generateLink} disabled={!guestName.trim()} className="w-full py-4 mt-4 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#2a0410] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed tracking-widest uppercase text-sm">
                        Generate Custom Links
                    </button>
                </div>

                {/* --- RESULT SECTION --- */}
                {generatedUrl1 && generatedUrl2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">

                        {/* DESIGN 1 LINK CARD */}
                        <div className="p-5 bg-[#FDF4F6] border border-[#8B1E41]/20 rounded-xl">
                            <p className="text-xs text-[#8B1E41] font-bold uppercase mb-3">Design 1: The Interactive Journey</p>
                            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200 mb-4 overflow-hidden">
                                <LinkIcon size={16} className="text-gray-400 shrink-0" />
                                <p className="text-sm text-gray-600 truncate">{generatedUrl1}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => copyToClipboard(generatedUrl1, 1)} className="flex-1 py-3 bg-white border border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#FDFBF7] transition-all text-sm">
                                    {copied1 ? <Check size={16} /> : <Copy size={16} />} {copied1 ? "Copied!" : "Copy"}
                                </button>
                                <button onClick={() => shareOnWhatsApp(generatedUrl1, "Design 1")} className="flex-1 py-3 bg-[#25D366] text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#128C7E] transition-all text-sm">
                                    <MessageCircle size={16} /> WhatsApp
                                </button>
                            </div>
                        </div>

                        {/* DESIGN 2 LINK CARD */}
                        <div className="p-5 bg-[#FDF4F6] border border-[#8B1E41]/20 rounded-xl">
                            <p className="text-xs text-[#8B1E41] font-bold uppercase mb-3">Design 2: The Cinematic Scroll</p>
                            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200 mb-4 overflow-hidden">
                                <LinkIcon size={16} className="text-gray-400 shrink-0" />
                                <p className="text-sm text-gray-600 truncate">{generatedUrl2}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => copyToClipboard(generatedUrl2, 2)} className="flex-1 py-3 bg-white border border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#FDFBF7] transition-all text-sm">
                                    {copied2 ? <Check size={16} /> : <Copy size={16} />} {copied2 ? "Copied!" : "Copy"}
                                </button>
                                <button onClick={() => shareOnWhatsApp(generatedUrl2, "Design 2")} className="flex-1 py-3 bg-[#25D366] text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#128C7E] transition-all text-sm">
                                    <MessageCircle size={16} /> WhatsApp
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}