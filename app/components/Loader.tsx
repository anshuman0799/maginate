import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bodyColor/80 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-designColor"></div>
    </div>
  );
};

export default Loader;
