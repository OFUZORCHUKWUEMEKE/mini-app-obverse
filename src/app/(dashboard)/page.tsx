"use client";
import { useState } from "react";
import { useFarcaster } from "@/providers/FarcasterProvider";
import { motion } from "framer-motion";

import {
  arrowDown2,
  arrowRight2,
  logoDark,
  logoTextDark,
  rightArrow,
  spotify,
  stashIcon,
} from "@/assets/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TransactionDetails } from "@/constants";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import SalesChart from "@/components/ui/SalesChart";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

export default function HomePage() {
  const { user } = useFarcaster();
  const displayName = user?.displayName ?? user?.username ?? "there";

  const chains = ["All-Chains", "Solana", "Base", "Arbitrum", "BNB"];
  const durations = [
    "All-Time",
    "This Week",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "Last Year",
  ];
  const [selectedChain, setSelectedChain] = useState(chains[0]);
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);

  return (
    <motion.section
      className="flex flex-col w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Nav */}
      <motion.nav variants={itemVariants} className="flex justify-between pt-6 pb-4 items-center w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Image src={logoDark} alt="logo" className="w-6 sm:w-7" />
            <Image src={logoTextDark} alt="logoText" className="w-20 sm:w-24" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="normal"
                size="normal"
                className="px-3 py-1.5 bg-[#0a0a0a] border border-[#1e1e1e] text-[#e8ddd8] font-onest text-[12px] font-light whitespace-nowrap flex gap-2 items-center rounded-xl hover:border-[#2a2a2a] transition-colors"
              >
                <p>{selectedChain}</p>
                <Image src={arrowDown2} alt="Arrow down" className="w-3 h-3 opacity-50" />
              </Button>
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
                  {chain}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.nav>

      {/* Welcome + Stats */}
      <div className="flex flex-col gap-5 mt-1">
        <motion.h2
          variants={itemVariants}
          className="text-[#e8ddd8] text-[16px] font-onest font-medium"
        >
          Welcome, {displayName}
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src={spotify} alt="payments Icon" className="w-4 h-4 opacity-70" />
            <p className="text-[#999] font-onest text-[12px] font-light">
              Total Payments Collected
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="normal"
                size="normal"
                className="p-0 bg-transparent border-transparent text-[#999] font-onest text-[11px] font-light whitespace-nowrap flex gap-1.5 items-center hover:text-[#e8ddd8] transition-colors"
              >
                <p>{selectedDuration}</p>
                <Image src={arrowDown2} alt="Arrow down" className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 bg-[#0a0a0a] text-[#e8ddd8] border border-[#1e1e1e] font-onest text-[13px] rounded-xl">
              <DropdownMenuLabel className="text-[11px] text-[#666] uppercase tracking-wider">Duration</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1e1e1e]" />
              {durations.map((duration) => (
                <DropdownMenuItem
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className="rounded-lg focus:bg-[#1a1a1a] cursor-pointer"
                >
                  {duration}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Sales Chart */}
        <motion.div variants={itemVariants}>
          <SalesChart />
        </motion.div>
      </div>

      {/* Links Created */}
      <div className="flex flex-col gap-3 w-full mt-6">
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Image src={stashIcon} alt="stash Icon" className="w-4 h-4 opacity-70" />
            <p className="text-[#999] font-onest text-[12px] font-light">
              Total Links Created
            </p>
          </div>
          <Link href="/links">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full justify-between items-center px-4 py-4 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl hover:border-[#2a2a2a] hover:bg-[#0d0d0d] transition-colors cursor-pointer"
            >
              <p className="text-[#e8ddd8] font-onest text-[15px] font-semibold">
                54 Links
              </p>
              <Image src={arrowRight2} alt="Arrow Right" className="w-4 h-4 opacity-40" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants} className="flex justify-between items-center pt-3 pb-1">
          <h2 className="text-[#e8ddd8] font-onest text-[14px] font-medium">
            Recent Transactions
          </h2>
          <Link href="/transactions" className="flex gap-1.5 items-center group">
            <p className="font-onest text-primary text-[12px] font-medium group-hover:opacity-80 transition-opacity">
              View all
            </p>
            <Image src={rightArrow} alt="right arrow" className="w-3 h-3" />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-2">
          {TransactionDetails.map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              custom={i}
            >
              <Link href={`/transactions/${item.id}`}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full justify-between items-center px-4 py-3.5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl hover:border-[#2a2a2a] hover:bg-[#0d0d0d] transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 items-center min-w-0 flex-1 mr-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <Image src={item.asseticon} alt="Asset Icon" className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="font-onest font-medium text-[13px] text-[#e8ddd8] truncate">
                        {item.label}
                      </p>
                      <p className="font-onest font-light text-[11px] text-[#666]">
                        {item.asset} · {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <p className="text-[#4ade80] font-onest text-[13px] font-semibold">
                      +{item.net} {item.asset}
                    </p>
                    <p className="font-onest text-[10px] text-[#666]">
                      ${item.amount}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
