import React from "react";

const ActionBar = ({ left, right, className = "" }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

export default ActionBar;
