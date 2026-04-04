"use client";

import { motion, type Variants } from "framer-motion";
import { catIcon, spotify } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoSearch, IoCopyOutline, IoShareSocialOutline, IoEllipsisVertical } from "react-icons/io5";
import { PaymentLinksDetails } from "@/constants";
import { toast } from "sonner";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
};

export default function LinksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = PaymentLinksDetails.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.section
      className="flex flex-col w-full pt-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-4">
        <motion.h2 variants={itemVariants} className="text-[#e8ddd8] text-[17px] font-onest font-semibold">
          Payment Links
        </motion.h2>

        <motion.div variants={itemVariants} className="flex gap-2 items-center">
          <Image src={spotify} alt="payments Icon" className="w-4 h-4 opacity-70" />
          <p className="text-[#999] font-onest text-[12px] font-light">
            Total Payments Created
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex w-full justify-between items-center px-4 py-4 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl"
        >
          <p className="text-[#e8ddd8] font-onest text-[15px] font-semibold">
            {filteredLinks.length} {filteredLinks.length === 1 ? "Link" : "Links"}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative w-full">
          <IoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555] w-[18px] h-[18px]" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[#e8ddd8] font-onest text-[13px] bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl focus:outline-none focus:border-[#4ade80]/40 placeholder:text-[#444] transition-colors"
          />
        </motion.div>

        {/* Links Grid */}
        {filteredLinks.length > 0 ? (
          <motion.div
            variants={sectionVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2"
          >
            {filteredLinks.map((link) => (
              <motion.div
                key={link.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group flex flex-col p-5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl hover:border-[#4ade80]/30 hover:shadow-[0_8px_30px_rgb(74,222,128,0.04)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle gradient background for aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ade80]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Absolute link overlay covering the card */}
                <Link href={`/links/${link.id}`} className="absolute inset-0 z-10" />

                <div className="relative z-0 flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-1.5">
                    <span className={`text-[9px] font-onest font-medium px-2 py-0.5 rounded-full w-fit uppercase tracking-wider ${link.status === "active" ? "bg-[#4ade80]/10 text-[#4ade80]" : "bg-[#555]/10 text-[#888]"}`}>
                      {link.status}
                    </span>
                    <h3 className="font-onest font-medium text-[15px] text-[#e8ddd8] line-clamp-1 group-hover:text-[#4ade80] transition-colors">{link.title}</h3>
                  </div>
                  <button className="text-[#555] hover:text-[#e8ddd8] transition-colors p-1 -mr-2 relative z-20">
                    <IoEllipsisVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative z-0 flex items-baseline gap-1.5 mb-5 mt-1">
                  <span className="font-onest text-[24px] font-semibold text-[#e8ddd8] group-hover:scale-[1.02] transform origin-left transition-transform">{link.amount > 0 ? link.amount : "Any"}</span>
                  <span className="font-onest text-[12px] text-[#555] font-medium uppercase tracking-wide">{link.asset}</span>
                </div>

                <div className="relative z-0 flex justify-between items-center py-3.5 border-t border-b border-[#1a1a1a] mb-5 group-hover:border-[#222] transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-onest text-[11px] text-[#555] uppercase tracking-wide font-medium">Payments</span>
                    <span className="font-onest text-[14px] text-[#e8ddd8] font-medium">{link.payments}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-[#1a1a1a] group-hover:bg-[#222] transition-colors"></div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-onest text-[11px] text-[#555] uppercase tracking-wide font-medium">Revenue</span>
                    <span className="font-onest text-[14px] text-[#4ade80] font-medium">+{link.revenue} {link.asset}</span>
                  </div>
                </div>

                <div className="relative z-20 flex gap-2 mt-auto">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.clipboard.writeText(`${window.location.origin}/pay/${link.id}`);
                    toast.success("Link copied to clipboard!");
                  }} className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-[#121212] hover:bg-[#1a1a1a] border border-[#222] hover:border-[#333] rounded-xl font-onest text-[12px] font-medium text-[#ccc] hover:text-[#e8ddd8] transition-all">
                    <IoCopyOutline className="w-3.5 h-3.5" /> Copy
                  </button>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (navigator.share) {
                      navigator.share({
                        title: link.title,
                        url: `${window.location.origin}/pay/${link.id}`
                      }).catch(() => { });
                    } else {
                      navigator.clipboard.writeText(`${window.location.origin}/pay/${link.id}`);
                      toast.success("Link copied to clipboard!");
                    }
                  }} className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-[#121212] hover:bg-[#1a1a1a] border border-[#222] hover:border-[#333] rounded-xl font-onest text-[12px] font-medium text-[#ccc] hover:text-[#e8ddd8] transition-all">
                    <IoShareSocialOutline className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="flex flex-col mt-8 justify-center items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={catIcon} alt="catIcon" />
            </motion.div>
            {searchQuery ? (
              <p className="font-onest font-light text-[13px] text-[#888] text-center mt-2">
                No links match your search.
              </p>
            ) : (
              <Link href="/create">
                <p className="font-onest font-light text-[12px] text-[#e8ddd8] text-center">
                  <span className="text-primary underline">
                    Create a payment link{" "}
                  </span>{" "}
                  to start receiving payments
                </p>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
