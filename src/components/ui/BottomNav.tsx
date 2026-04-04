"use client";

import { motion } from "framer-motion";
import { HomeIcon, linkIcon, transactionIcon } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { Settings, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();

    const tabs = [
        { href: "/", icon: "home", label: "Home" },
        { href: "/transactions", icon: "transactions", label: "Transactions" },
        { href: "/scan", icon: "scan", label: "Scan" },
        { href: "/links", icon: "links", label: "Links" },
        { href: "/settings", icon: "settings", label: "Settings" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 flex justify-center z-50"
        >
            <div className="w-[92%] max-w-[600px] flex flex-col items-center gap-3 pb-4 pt-2">
                {/* Create Button */}
                <Link href="/create" className="flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-[#141414] bg-primary w-[52px] h-[52px] text-[26px] rounded-full shadow-lg shadow-primary/25 font-light"
                        >
                            +
                        </Button>
                    </motion.div>
                </Link>

                {/* Tab Bar */}
                <div className="flex w-full items-center justify-around bg-[#0a0a0a]/95 backdrop-blur-md px-2 py-2 rounded-2xl border border-[#1e1e1e]">
                    {tabs.map((tab) => {
                        const active = isActive(tab.href);
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl relative"
                            >
                                {active && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#1a1a1a] rounded-xl"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <div className="w-5 h-5 flex items-center justify-center relative z-10">
                                    {tab.icon === "home" && (
                                        <Image src={HomeIcon} alt="Home" className={`w-5 h-5 transition ${active ? "invert" : "invert-[0.4]"}`} />
                                    )}
                                    {tab.icon === "transactions" && (
                                        <Image src={linkIcon} alt="Transactions" className={`w-5 h-5 transition ${active ? "invert" : "invert-[0.4]"}`} />
                                    )}
                                    {tab.icon === "links" && (
                                        <Image src={transactionIcon} alt="Links" className={`w-5 h-5 transition ${active ? "invert" : "invert-[0.4]"}`} />
                                    )}
                                    {tab.icon === "settings" && (
                                        <Settings className={`w-[18px] h-[18px] transition ${active ? "text-[#e8ddd8]" : "text-[#555]"}`} strokeWidth={1.5} />
                                    )}
                                    {tab.icon === "scan" && (
                                        <QrCode className={`w-[18px] h-[18px] transition ${active ? "text-[#e8ddd8]" : "text-[#555]"}`} strokeWidth={1.5} />
                                    )}
                                </div>
                                <span className={`font-onest text-[10px] transition relative z-10 ${active ? "text-[#e8ddd8] font-medium" : "text-[#555] font-light"}`}>
                                    {tab.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
