"use client";

import { motion, type Variants } from "framer-motion";
import { TransactionDetails } from "@/constants";
import { arrowLeft } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const detailRowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

export default function TransactionDetailPage() {
  const params = useParams();
  const txn = TransactionDetails.find((t) => t.id === params.id);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadReceipt = async () => {
    const element = document.getElementById("receipt-card");
    if (!element) return;

    setIsDownloading(true);
    try {
      const htmlToImage = await import("html-to-image");

      const jsPDFModule = await import("jspdf");
      const JsPDF = jsPDFModule.jsPDF || jsPDFModule.default || (jsPDFModule as any);

      // Capture the element using html-to-image
      const imgData = await htmlToImage.toPng(element, {
        pixelRatio: 2,
        backgroundColor: "#141414",
        filter: (node) => {
          if (node?.classList && node.classList.contains("hide-on-pdf")) {
            return false;
          }
          return true;
        }
      });
      const pdf = new JsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      // We need element dimensions to scale PDF exactly
      const elWidth = element.offsetWidth * 2;
      const elHeight = element.offsetHeight * 2;

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (elHeight * pdfWidth) / elWidth;

      pdf.setFillColor(20, 20, 20); // matching #141414 hex
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`Obverse_Receipt_${txn?.id || "download"}.pdf`);
      toast.success("Receipt downloaded successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to generate receipt: ${error?.message || "Verify logs"}`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!txn) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col w-full pt-6 items-center justify-center min-h-[60vh]"
      >
        <p className="text-[#666] font-onest text-[14px]">Transaction not found</p>
        <Link href="/transactions" className="mt-4">
          <Button variant="normal" size="normal" className="text-primary font-onest text-[13px] bg-transparent border-none">
            ← Back to transactions
          </Button>
        </Link>
      </motion.section>
    );
  }

  return (
    <section id="receipt-card" className="flex flex-col w-full pt-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-6 hide-on-pdf"
      >
        <div className="flex items-center gap-3">
          <Link href="/transactions">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="default" size="icon" className="bg-[#0a0a0a] border border-[#1e1e1e] p-2 rounded-xl hover:border-[#2a2a2a] transition-colors">
                <Image src={arrowLeft} alt="Back" className="w-4 h-4" />
              </Button>
            </motion.div>
          </Link>
          <h2 className="text-[#e8ddd8] text-[16px] font-onest font-semibold flex-1">
            Transaction Details
          </h2>
        </div>
        <Button onClick={downloadReceipt} disabled={isDownloading} className="bg-[#222] hover:bg-[#333] text-[#e8ddd8] border border-[#333] rounded-lg text-[11px] font-onest px-3 py-1.5 transition-all outline-none h-fit">
          {isDownloading ? "Generating..." : "Download PDF"}
        </Button>
      </motion.div>

      {/* Wrapper for PDF Export */}
      <div className="bg-[#141414] pt-8 pb-4 px-2 sm:px-6 rounded-3xl flex flex-col items-center w-full">
        {/* Subtle Branding visible mostly when capturing standalone */}
        <h1 className="text-[#e8ddd8] font-onest font-black text-2xl tracking-tighter mb-8 w-full text-center">OBVERSE<span className="text-[#FF7849]">.</span></h1>

        <div className="w-full flex-1">

          {/* Amount Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-5 flex flex-col items-center gap-2"
          >
            <p className="text-[#666] font-onest text-[12px] font-light">Amount Received</p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
              className="text-[#e8ddd8] font-onest text-[28px] font-bold"
            >
              +{txn.net} {txn.asset}
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 400, damping: 20 }}
              className={`text-[11px] font-onest font-medium px-3 py-1 rounded-full ${txn.status === "completed"
                ? "bg-[#4ade80]/10 text-[#4ade80]"
                : txn.status === "pending"
                  ? "bg-[#facc15]/10 text-[#facc15]"
                  : "bg-[#f87171]/10 text-[#f87171]"
                }`}
            >
              {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
            </motion.span>
          </motion.div>

          {/* Details List */}
          <motion.div
            className="flex flex-col mt-5 gap-0.5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <DetailRow label="From" value={txn.label} />
            <DetailRow label="Amount" value={`${txn.net} ${txn.asset}`} />
            <DetailRow label="Asset" value={txn.asset} />
            <DetailRow label="Chain" value={txn.chain} />
            <DetailRow label="Date" value={txn.date} />
            <DetailRow label="Transaction Hash" value={`0x${txn.id.split('-')[1] || "019a"}98d...3f9c`} />
            <DetailRow label="Transaction ID" value={txn.id} isLast />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) {
  return (
    <motion.div
      variants={detailRowVariants}
      className={`flex justify-between items-center px-4 py-3.5 bg-[#0a0a0a] ${!isLast ? "border-b border-[#1e1e1e]" : ""} first:rounded-t-2xl last:rounded-b-2xl`}
    >
      <p className="font-onest text-[12px] text-[#666] font-light">{label}</p>
      <p className="font-onest text-[13px] text-[#e8ddd8] font-medium">{value}</p>
    </motion.div>
  );
}
