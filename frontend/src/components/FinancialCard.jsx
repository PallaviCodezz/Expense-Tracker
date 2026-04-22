import React from "react";

const FinancialCard = ({ icon, label, value, additionalContent, borderColor = "" }) => {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${borderColor}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {additionalContent}
    </div>
  );
};

export default FinancialCard;
