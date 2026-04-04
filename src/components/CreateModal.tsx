import React, { useEffect, useState } from "react";
import OtherFieldModal from "./ui/OtherFiledModal";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (fieldName: string) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onAddField }) => {
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSelectField = (field: string) => {
    onAddField(field);
    onClose();
  };

  const handleOtherFieldAdded = (field: string) => {
    onAddField(field);
    setIsOtherModalOpen(false);
    onClose();
  };

  const predefinedFields = [
    "Name",
    "Email Address",
    "Phone Number",
    "Home Address"
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
            onClick={onClose}
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
                  Select the field you want to add
                </h1>
                <button onClick={onClose} className="text-[#666] hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              <div className="flex flex-col w-full gap-3">
                {predefinedFields.map((field) => (
                  <motion.div
                    key={field}
                    whileHover={{ scale: 1.02, backgroundColor: "#141414" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectField(field)}
                    className="flex w-full p-3.5 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-xl cursor-pointer transition-colors"
                  >
                    <p className="text-[#e8ddd8] font-onest text-[14px] font-medium">
                      {field}
                    </p>
                  </motion.div>
                ))}

                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "#141414" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOtherModalOpen(true)}
                  className="flex w-full p-3.5 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-primary/40 rounded-xl cursor-pointer transition-colors"
                >
                  <p className="text-primary font-onest text-[14px] font-medium">
                    + Custom Field
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <OtherFieldModal
        isOpen={isOtherModalOpen}
        onClose={() => setIsOtherModalOpen(false)}
        onAddField={handleOtherFieldAdded}
      />
    </>
  );
};

export default CreateModal;
