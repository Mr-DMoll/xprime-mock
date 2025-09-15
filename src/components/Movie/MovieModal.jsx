import React from "react";

export default function MovieModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl w-[90%] md:w-[60%] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-purple-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
