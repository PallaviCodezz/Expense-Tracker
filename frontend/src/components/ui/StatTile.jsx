import React from "react";
import { motion } from "framer-motion";

const StatTile = ({
  icon,
  label,
  value,
  helper,
  accent = "border-cyan-400",
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`bg-[#0f1c33]/95 rounded-xl p-5 shadow-sm border border-cyan-900/40 border-l-4 ${accent} ${className}`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-cyan-100/70">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-cyan-50">{value}</p>
      {helper ? <div className="mt-2 text-xs text-cyan-100/70">{helper}</div> : null}
    </motion.div>
  );
};

export default StatTile;
