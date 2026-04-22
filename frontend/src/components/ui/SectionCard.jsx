import React from "react";
import { motion } from "framer-motion";

const SectionCard = ({ children, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`glass-panel rounded-2xl p-4 md:p-6 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionCard;
