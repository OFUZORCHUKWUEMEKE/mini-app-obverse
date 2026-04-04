import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface OtherFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (fieldName: string) => void;
}

const OtherFieldModal: React.FC<OtherFieldModalProps> = ({
  isOpen,
  onClose,
  onAddField,
}) => {
  const [fieldName, setFieldName] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFieldName("");
        onClose();
      }
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fieldName.trim()) {
      onAddField(fieldName.trim());
      setFieldName("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm bg-black/40"
          onClick={() => {
            setFieldName("");
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-[#0a0a0a] text-white p-6 rounded-[16px] border border-[#1e1e1e] shadow-2xl w-[92%] max-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[#e8ddd8] font-onest text-[16px] font-medium">
                Enter field name
              </h1>
              <button onClick={() => { setFieldName(""); onClose(); }} className="text-[#666] hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
              <input
                type="text"
                id="name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="e.g. Discord Handle"
                className="w-full p-3.5 bg-[#141414] border text-[#FFF3EF] font-onest border-[#1e1e1e] rounded-xl focus:outline-none focus:border-primary/50 placeholder:text-[#555] transition-colors"
                autoFocus
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="normal"
                  size="normal"
                  className="border-none font-onest font-semibold text-[14px] py-3.5 w-full rounded-xl"
                  type="submit"
                >
                  Add Custom Field
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OtherFieldModal;
