"use client";

import { motion } from "framer-motion";
import { TransactionDetails } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { IoSearch, IoChevronBack, IoChevronForward } from "react-icons/io5";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assetFilter, setAssetFilter] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTransactions = useMemo(() => {
    return TransactionDetails.filter((item) => {
      const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.asset.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesAsset = assetFilter === "all" || item.asset.toLowerCase() === assetFilter.toLowerCase();
      const matchesChain = chainFilter === "all" || item.chain?.toLowerCase() === chainFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesAsset && matchesChain;
    });
  }, [searchQuery, statusFilter, assetFilter, chainFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;

  const currentTransactions = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const groupedByDate = useMemo(() => {
    return currentTransactions.reduce(
      (acc, item) => {
        if (!acc[item.date]) acc[item.date] = [];
        acc[item.date].push(item);
        return acc;
      },
      {} as Record<string, typeof TransactionDetails>
    );
  }, [currentTransactions]);

  // Reset to page 1 on search or filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="flex flex-col w-full pt-6">
      <div className="flex flex-col gap-4">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#e8ddd8] text-[17px] font-onest font-semibold"
        >
          Transactions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col gap-3 w-full"
        >
          <div className="relative w-full">
            <IoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555] w-[18px] h-[18px]" />
            <input
              type="text"
              placeholder="Search by name or asset..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 text-[#e8ddd8] font-onest text-[13px] bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl focus:outline-none focus:border-[#4ade80]/40 placeholder:text-[#444] transition-colors"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-2 text-[12px] font-onest">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 py-2 bg-[#0a0a0a] border border-[#1e1e1e] text-[#e8ddd8] rounded-xl focus:outline-none cursor-pointer hover:border-[#333] transition-colors appearance-none capitalize w-full"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#555]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={chainFilter}
                onChange={(e) => { setChainFilter(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 py-2 bg-[#0a0a0a] border border-[#1e1e1e] text-[#e8ddd8] rounded-xl focus:outline-none cursor-pointer hover:border-[#333] transition-colors appearance-none capitalize w-full"
              >
                <option value="all">All Chains</option>
                <option value="solana">Solana</option>
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="base">Base</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#555]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={assetFilter}
                onChange={(e) => { setAssetFilter(e.target.value); setCurrentPage(1); }}
                className="pl-3 pr-8 py-2 bg-[#0a0a0a] border border-[#1e1e1e] text-[#e8ddd8] rounded-xl focus:outline-none cursor-pointer hover:border-[#333] transition-colors appearance-none capitalize w-full"
              >
                <option value="all">All Assets</option>
                <option value="usdc">USDC</option>
                <option value="usdt">USDT</option>
                <option value="sol">SOL</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#555]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
            </div>
          </div>
        </motion.div>

        {Object.entries(groupedByDate).map(([date, items], groupIndex) => (
          <motion.div
            key={date}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="flex flex-col gap-3 mt-2"
          >
            <motion.h3
              variants={cardVariants}
              className="font-onest text-[#555] text-[11px] uppercase tracking-wider font-medium"
            >
              {date}
            </motion.h3>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <motion.div key={item.id} variants={cardVariants}>
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
                            {item.asset} · paid ${item.amount}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                        <p className="text-[#4ade80] font-onest text-[13px] font-semibold">
                          +{item.net} {item.asset}
                        </p>
                        <span className={`text-[9px] font-onest font-medium px-1.5 py-0.5 rounded-full ${item.status === "completed"
                          ? "bg-[#4ade80]/10 text-[#4ade80]"
                          : item.status === "pending"
                            ? "bg-[#facc15]/10 text-[#facc15]"
                            : "bg-[#f87171]/10 text-[#f87171]"
                          }`}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {filteredTransactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col mt-16 justify-center items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex flex-col justify-center items-center">
              <IoSearch className="text-[#444] w-5 h-5" />
            </div>
            <p className="font-onest font-medium text-[14px] text-[#777]">
              No transactions found
            </p>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mt-6 pt-6 border-t border-[#1e1e1e]"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-[#888] font-onest text-[12px] hover:bg-[#1a1a1a] hover:text-[#e8ddd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoChevronBack className="w-3.5 h-3.5" />
              Prev
            </button>
            <span className="font-onest text-[12px] text-[#555]">
              Page <span className="text-[#e8ddd8]">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-[#888] font-onest text-[12px] hover:bg-[#1a1a1a] hover:text-[#e8ddd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <IoChevronForward className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
