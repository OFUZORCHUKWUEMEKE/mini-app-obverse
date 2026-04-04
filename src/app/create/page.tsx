"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { arrowDown2, arrowLeft, plus } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import CreateModal from "@/components/CreateModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

const page = () => {
  const coins = ["USDT", "USDC", "DAI"];

  const [selectedCoin, setSelectedCoin] = useState("Select asset type");
  const [expirationDate, setExpirationDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic fields state
  const [dynamicFields, setDynamicFields] = useState<
    { id: string; label: string; value: string }[]
  >([]);

  const handleAddField = (fieldName: string) => {
    // Avoid exact duplicates
    if (dynamicFields.some((f) => f.label.toLowerCase() === fieldName.toLowerCase())) {
      return;
    }
    setDynamicFields([
      ...dynamicFields,
      { id: Date.now().toString(), label: fieldName, value: "" },
    ]);
  };

  const handleRemoveField = (id: string) => {
    setDynamicFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpdateFieldValue = (id: string, value: string) => {
    setDynamicFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  return (
    <motion.section
      className="bg-[#141414] w-[92%] max-w-[600px] mx-auto py-5 min-h-screen relative pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-3">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="default" size="icon" className="bg-[#111010] p-2 hover:bg-[#1a1a1a] transition-colors rounded-xl">
                <Image src={arrowLeft} alt="Arrow Left" />
              </Button>
            </motion.div>
          </Link>
          <h2 className="text-[#FFF3EF] font-onest text-[15px] sm:text-[17px] font-medium">
            Create Payment Link
          </h2>
          <div className="w-10"></div> {/* Spacer for centering */}
        </motion.div>

        <motion.form variants={itemVariants} className="flex gap-5 sm:justify-center flex-col w-full mt-2">
          <p className="text-[#888] font-onest text-[13px] font-light">
            Fill out the fields below to generate your payment link.
          </p>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="block font-medium text-[12px] font-onest text-[#e8ddd8] ml-1"
            >
              Link Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Jendol Supermarket Checkout"
              className="w-full p-3.5 bg-[#0a0a0a] border text-[#FFF3EF] font-onest border-[#1e1e1e] rounded-xl focus:outline-none focus:border-primary/50 placeholder:text-[#555] transition-colors text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="coin"
              className="block font-medium text-[12px] font-onest text-[#e8ddd8] ml-1"
            >
              Stablecoin
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full flex justify-between items-center p-3.5 bg-[#0a0a0a] border text-[#FFF3EF] font-onest border-[#1e1e1e] rounded-xl cursor-pointer hover:border-[#2a2a2a] transition-colors">
                  <p className="text-[#e8ddd8] text-[14px]">{selectedCoin}</p>
                  <Image src={arrowDown2} alt="Arrow down" className="opacity-50" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[calc(92vw-2rem)] max-w-[560px] bg-[#0a0a0a] text-[#FFF3EF] border border-[#1e1e1e] font-onest rounded-xl">
                <DropdownMenuLabel className="text-[11px] text-[#666] tracking-wider uppercase font-medium">Select Coin</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1e1e1e]" />
                {coins.map((coin) => (
                  <DropdownMenuItem
                    key={coin}
                    onClick={() => setSelectedCoin(coin)}
                    className="focus:bg-[#141414] cursor-pointer rounded-lg mx-1"
                  >
                    {coin}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="expiration"
              className="block font-medium text-[12px] font-onest text-[#e8ddd8] ml-1"
            >
              Expiration Time
            </label>
            {/* Using a native datetime-local input for the calendar picker requirement */}
            <input
              type="datetime-local"
              id="expiration"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full p-3.5 bg-[#0a0a0a] border text-[#FFF3EF] font-onest border-[#1e1e1e] rounded-xl focus:outline-none focus:border-primary/50 text-[14px] transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.8] cursor-pointer"
            />
          </div>

          {/* Dynamic Fields */}
          <div className="flex flex-col gap-4 mt-2">
            <AnimatePresence>
              {dynamicFields.map((field) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <div className="flex justify-between items-center ml-1">
                    <label className="block font-medium text-[12px] font-onest text-[#e8ddd8]">
                      {field.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="text-[#666] hover:text-red-400 text-[11px] font-onest transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full p-3.5 bg-[#0a0a0a] border text-[#FFF3EF] font-onest border-[#1e1e1e] rounded-xl focus:outline-none focus:border-primary/50 placeholder:text-[#555] transition-colors text-[14px]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 justify-center items-center mt-3 p-4 border border-dashed border-[#2a2a2a] rounded-xl hover:bg-[#0a0a0a] cursor-pointer transition-colors"
          >
            <h2 className="font-medium text-[13px] font-onest text-primary">
              Add More Fields
            </h2>
            <Image src={plus} alt="Plus" className="w-3.5 h-3.5" />
          </motion.div>

          <div className="fixed bottom-5 left-0 right-0 flex justify-center z-40">
            <motion.div
              className="w-[92%] max-w-[600px]"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="normal"
                size="normal"
                className="border-none font-onest font-semibold text-[15px] py-4 w-full rounded-2xl shadow-lg shadow-black/50"
                type="submit"
                onClick={(e) => e.preventDefault()}
              >
                Create Payment Link
              </Button>
            </motion.div>
          </div>
        </motion.form>
      </div>

      {/* Modal */}
      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddField={handleAddField}
      />
    </motion.section>
  );
};

export default page;
