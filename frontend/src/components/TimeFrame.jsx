import React from "react";

const TimeFrameSelector = ({ 
  timeFrame, 
  setTimeFrame, 
  options, 
  color = "teal",
  style = "default"
}) => {
  const colorClass = {
    teal: "bg-teal-500",
    orange: "bg-orange-500",
    cyan: "bg-cyan-500"
  }[color];
  
  const styleClass = {
    default: "flex gap-2 bg-[#0f1c33] p-1 -mx-11 lg:-mx-0 md:-mx-0 rounded-xl border border-cyan-900/50",
    minimal: "flex gap-2"
  }[style];
  
  return (
    <div className={styleClass}>
      {options.map((frame) => (
        <button 
          key={frame}
          onClick={() => setTimeFrame(frame)}
          className={`px-2  py-2 text-sm rounded-lg transition-all ${
            timeFrame === frame 
              ? `${colorClass} text-white` 
              : 'text-cyan-100/75 hover:bg-[#1a2f4a]'
          }`}
        >
          {frame.charAt(0).toUpperCase() + frame.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;
