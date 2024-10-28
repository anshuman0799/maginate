import React from "react";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

interface PopoverProps {
  message: string;
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ message, onClose }) => {
  useBodyScrollLock();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-bodyColor p-5 rounded-lg shadow-lg z-10">
        <p className="text-white font-medium">{message}</p>
        <button onClick={onClose} className="mt-4 text-designColor">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popover;
