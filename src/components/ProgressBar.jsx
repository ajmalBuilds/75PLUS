import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ percentage }) => {
  const getColor = (percentage) => {
    if (percentage >= 75) return "#4CAF50"; // Green
    if (percentage >= 65) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  return (
    <div className="relative w-full max-w-md bg-gray-200 rounded-full h-6 overflow-hidden shadow-lg mt-5 mb-5">
      <motion.div
        className="h-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          background: `linear-gradient(90deg, ${getColor(percentage)} 0%, #2196F3 100%)`,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center font-semibold text-white text-sm">
        {percentage}%
      </span>
    </div>
  );
};

export default ProgressBar;
