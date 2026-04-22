import React from "react";
import { motion } from "framer-motion";

const PageHeader = ({
  title,
  subtitle,
  rightContent,
  bottomContent,
  className = "",
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`glass-panel rounded-2xl p-5 md:p-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-cyan-50">{title}</h1>
          {subtitle ? <p className="text-cyan-100/70 mt-1">{subtitle}</p> : null}
        </div>
        {rightContent}
      </div>
      {bottomContent ? <div className="mt-4">{bottomContent}</div> : null}
    </motion.section>
  );
};

export default PageHeader;
