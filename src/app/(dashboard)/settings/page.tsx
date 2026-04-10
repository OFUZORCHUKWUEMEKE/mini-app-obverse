"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFarcaster } from "@/providers/FarcasterProvider";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { arrowDown2 } from "@/assets/icons";

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 400, damping: 28 },
    },
};

export default function SettingsPage() {
    const chains = ["Solana", "Base", "Arbitrum", "BNB", "Monad"];
    const stablecoins = ["USDT", "USDC"];

    const { user } = useFarcaster();
    const [displayName, setDisplayName] = useState("");
    const [selectedChain, setSelectedChain] = useState(chains[1]); // Default to Base

    useEffect(() => {
        if (user?.displayName ?? user?.username) {
            setDisplayName(user.displayName ?? user.username ?? "");
        }
    }, [user]);
    const [selectedStablecoin, setSelectedStablecoin] = useState(stablecoins[0]);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <motion.section
            className="flex flex-col w-full pt-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h2
                variants={cardVariants}
                className="text-[#e8ddd8] text-[17px] font-onest font-semibold mb-6"
            >
                Settings
            </motion.h2>

            <div className="flex flex-col gap-5">
                {/* Profile Section */}
                <motion.div variants={cardVariants} className="flex flex-col gap-1.5">
                    <p className="text-[#666] font-onest text-[11px] uppercase tracking-wider font-medium">
                        Profile
                    </p>
                    <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-4 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" as const, stiffness: 400, damping: 15, delay: 0.2 }}
                                className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden"
                            >
                                {user?.pfpUrl ? (
                                    <Image
                                        src={user.pfpUrl}
                                        alt={displayName}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/30 flex items-center justify-center rounded-full">
                                        <span className="text-[#141414] font-onest font-bold text-[18px]">
                                            {displayName.charAt(0).toUpperCase() || "?"}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                            <div className="flex flex-col">
                                <p className="text-[#e8ddd8] font-onest text-[14px] font-medium">{displayName}</p>
                                <p className="text-[#555] font-onest text-[11px]">Edit your profile details</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#888] font-onest text-[11px] font-medium">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full px-3.5 py-2.5 text-[#e8ddd8] font-onest text-[13px] bg-[#141414] border border-[#1e1e1e] rounded-xl focus:outline-none focus:border-primary/40 placeholder:text-[#444] transition-colors"
                                placeholder="Your display name"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Defaults Section */}
                <motion.div variants={cardVariants} className="flex flex-col gap-1.5">
                    <p className="text-[#666] font-onest text-[11px] uppercase tracking-wider font-medium">
                        Defaults
                    </p>
                    <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#1e1e1e]">
                            <div className="flex flex-col">
                                <p className="text-[#e8ddd8] font-onest text-[13px] font-medium">Default Chain</p>
                                <p className="text-[#555] font-onest text-[11px]">Used for new payment links</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#1e1e1e] rounded-xl text-[#e8ddd8] font-onest text-[12px] hover:border-[#2a2a2a] transition-colors">
                                        {selectedChain}
                                        <Image src={arrowDown2} alt="Arrow down" className="w-3 h-3 opacity-50" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-36 bg-[#0a0a0a] text-[#e8ddd8] border border-[#1e1e1e] font-onest text-[13px] rounded-xl">
                                    <DropdownMenuLabel className="text-[11px] text-[#666] uppercase tracking-wider">Chains</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#1e1e1e]" />
                                    {chains.map((chain) => (
                                        <DropdownMenuItem
                                            key={chain}
                                            onClick={() => setSelectedChain(chain)}
                                            className="rounded-lg focus:bg-[#1a1a1a] cursor-pointer"
                                        >
                                            <span className="flex items-center gap-2">
                                                {chain === selectedChain && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                {chain}
                                            </span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3.5">
                            <div className="flex flex-col">
                                <p className="text-[#e8ddd8] font-onest text-[13px] font-medium">Default Stablecoin</p>
                                <p className="text-[#555] font-onest text-[11px]">Currency for receiving payments</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#1e1e1e] rounded-xl text-[#e8ddd8] font-onest text-[12px] hover:border-[#2a2a2a] transition-colors">
                                        {selectedStablecoin}
                                        <Image src={arrowDown2} alt="Arrow down" className="w-3 h-3 opacity-50" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-32 bg-[#0a0a0a] text-[#e8ddd8] border border-[#1e1e1e] font-onest text-[13px] rounded-xl">
                                    <DropdownMenuLabel className="text-[11px] text-[#666] uppercase tracking-wider">Stablecoin</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#1e1e1e]" />
                                    {stablecoins.map((coin) => (
                                        <DropdownMenuItem
                                            key={coin}
                                            onClick={() => setSelectedStablecoin(coin)}
                                            className="rounded-lg focus:bg-[#1a1a1a] cursor-pointer"
                                        >
                                            <span className="flex items-center gap-2">
                                                {coin === selectedStablecoin && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                {coin}
                                            </span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <motion.div variants={cardVariants}>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                        <Button
                            onClick={handleSave}
                            variant="normal"
                            size="normal"
                            className={`w-full py-3 font-onest font-semibold text-[14px] rounded-2xl transition-all ${saved
                                    ? "bg-[#4ade80] text-[#0a0a0a] border-[#4ade80]"
                                    : "border-none hover:opacity-90"
                                }`}
                        >
                            {saved ? "✓ Saved" : "Save Changes"}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
