import React from "react";

const FinancialCard = ({ icon, label, value, additionalContent, borderColor = "" }) => {
  return (
    <div className={`bg-[#0f1c33]/95 rounded-2xl p-5 shadow-lg border border-cyan-900/40 ${borderColor}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-cyan-100/70 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-cyan-50">{value}</p>
      {additionalContent}
    </div>
  );
};

export default FinancialCard;
