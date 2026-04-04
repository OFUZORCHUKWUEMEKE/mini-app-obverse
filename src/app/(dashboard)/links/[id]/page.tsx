"use client";

import { motion } from "framer-motion";
import { PaymentLinksDetails, TransactionDetails } from "@/constants";
import { IoChevronBack, IoCopyOutline, IoShareSocialOutline, IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

const pageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
};

const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } }
};

export default function LinkDetailsPage({ params }: { params: { id: string } }) {
    const linkDetails = PaymentLinksDetails.find((link) => link.id === params.id);
    const [searchQuery, setSearchQuery] = useState("");

    const linkTransactions = useMemo(() => {
        return TransactionDetails.filter((txn) => txn.linkId === params.id && (
            txn.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.asset.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [params.id, searchQuery]);

    if (!linkDetails) {
        return (
            <div className="flex flex-col items-center justify-center p-10 h-full">
                <h2 className="text-[#e8ddd8] font-onest text-xl">Link not found</h2>
                <Link href="/links" className="text-[#4ade80] underline mt-4 font-onest hover:text-[#3bcf72] transition-colors">Return to links</Link>
            </div>
        );
    }

    return (
        <motion.section
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col w-full pt-6 gap-6"
        >
            {/* Header */}
            <motion.div variants={childVariants} className="flex items-center gap-4">
                <Link href="/links" className="p-2 bg-[#0a0a0a] border border-[#1e1e1e] rounded-full hover:bg-[#1a1a1a] transition-colors text-[#e8ddd8]">
                    <IoChevronBack className="w-5 h-5" />
                </Link>
                <div className="flex flex-col">
                    <h2 className="text-[#e8ddd8] text-[20px] font-onest font-semibold">{linkDetails.title}</h2>
                    <p className="text-[#666] text-[13px] font-onest flex items-center gap-2">
                        ID: <span className="text-[#888] font-mono text-[11px]">{linkDetails.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider ${linkDetails.status === "active" ? "bg-[#4ade80]/10 text-[#4ade80]" : "bg-[#555]/10 text-[#888]"}`}>{linkDetails.status}</span>
                    </p>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col p-5 bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] border border-[#1e1e1e] rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ade80]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all duration-500 group-hover:bg-[#4ade80]/20" />
                    <span className="font-onest text-[12px] text-[#666] uppercase tracking-wide font-medium mb-1">Total Revenue</span>
                    <span className="font-onest text-[28px] font-semibold text-[#4ade80] z-10">+{linkDetails.revenue} <span className="text-[16px] text-[#4ade80]/70">{linkDetails.asset}</span></span>
                </div>
                <div className="flex flex-col p-5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl group hover:border-[#333] transition-colors">
                    <span className="font-onest text-[12px] text-[#666] uppercase tracking-wide font-medium mb-1">Successful Payments</span>
                    <span className="font-onest text-[28px] font-semibold text-[#e8ddd8] group-hover:text-[#fff] transition-colors">{linkDetails.payments}</span>
                </div>
                <div className="flex flex-col p-5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl group hover:border-[#333] transition-colors">
                    <span className="font-onest text-[12px] text-[#666] uppercase tracking-wide font-medium mb-1">Date Created</span>
                    <span className="font-onest text-[18px] font-semibold text-[#e8ddd8] mt-2 group-hover:text-[#fff] transition-colors">{linkDetails.date}</span>
                </div>
            </motion.div>

            {/* Actions & QR */}
            <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-[24px] p-5 border-dashed">
                <div className="flex-shrink-0 bg-white p-2 rounded-[18px] w-fit mx-auto sm:mx-0">
                    <QRCodeSVG
                        value={`${typeof window !== 'undefined' ? window.location.origin : 'https://obverse.link'}/pay/${linkDetails.id}`}
                        size={100}
                        bgColor={"#ffffff"}
                        fgColor={"#0a0a0a"}
                        level={"Q"}
                    />
                </div>
                <div className="flex flex-col justify-between w-full h-[100px] sm:h-auto items-center sm:items-start text-center sm:text-left gap-4 sm:gap-0">
                    <div className="flex flex-col">
                        <h3 className="text-[#e8ddd8] font-onest font-medium text-[15px]">Payment QR Code</h3>
                        <p className="text-[#666] font-onest text-[12px] leading-relaxed hidden sm:block">Buyers can scan this code to pay directly or you can share the link.</p>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/pay/${linkDetails.id}`);
                            toast.success("Link copied to clipboard!");
                        }} className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-5 py-2.5 bg-[#4ade80] hover:bg-[#3bcf72] text-[#0a0a0a] rounded-xl font-onest text-[13px] font-medium transition-colors">
                            <IoCopyOutline className="w-4 h-4" /> Copy
                        </button>
                        <button onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: linkDetails.title,
                                    url: `${window.location.origin}/pay/${linkDetails.id}`
                                }).catch(() => { });
                            } else {
                                navigator.clipboard.writeText(`${window.location.origin}/pay/${linkDetails.id}`);
                                toast.success("Link copied to clipboard!");
                            }
                        }} className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-5 py-2.5 bg-[#121212] hover:bg-[#1a1a1a] border border-[#222] hover:border-[#333] text-[#e8ddd8] rounded-xl font-onest text-[13px] font-medium transition-colors">
                            <IoShareSocialOutline className="w-4 h-4" /> Share
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Transactions */}
            <motion.div variants={childVariants} className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 mb-2">
                    <h3 className="font-onest text-[17px] font-medium text-[#e8ddd8]">Transactions for this link</h3>
                    <div className="relative w-full sm:w-64">
                        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-[#e8ddd8] font-onest text-[13px] bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl focus:outline-none focus:border-[#4ade80]/40 placeholder:text-[#444] transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {linkTransactions.length > 0 ? (
                        linkTransactions.map((txn, index) => (
                            <Link key={txn.id} href={`/transactions/${txn.id}`} className="block">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.005, x: 2 }}
                                    className="flex w-full justify-between items-center px-4 py-3 bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl hover:border-[#2a2a2a] transition-all cursor-pointer group"
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                                            <Image src={txn.asseticon} alt="Asset" className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-onest font-medium text-[14px] text-[#e8ddd8] group-hover:text-[#4ade80] transition-colors">{txn.label}</p>
                                            <p className="font-onest font-light text-[11px] text-[#666]">{txn.date} · {txn.chain}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <p className="text-[#4ade80] font-onest text-[14px] font-semibold">+{txn.net} {txn.asset}</p>
                                        <span className={`text-[9px] font-onest font-medium px-1.5 py-0.5 rounded-full ${txn.status === "completed" ? "bg-[#4ade80]/10 text-[#4ade80]" : txn.status === "pending" ? "bg-[#facc15]/10 text-[#facc15]" : "bg-[#f87171]/10 text-[#f87171]"}`}>
                                            {txn.status}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <div className="flex justify-center items-center py-10 bg-[#0a0a0a] rounded-xl border border-[#1e1e1e] border-dashed">
                            <p className="font-onest text-[13px] text-[#666]">No transactions found for this search.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.section>
    );
}
