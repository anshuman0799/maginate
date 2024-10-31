import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa"; // Import FaUser icon
import { LuText } from "react-icons/lu"; // Import LuText icon
import useBodyScrollLock from "../hooks/useBodyScrollLock";

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  creator: string; // New prop for creator name
  prompt: string; // New prop for prompt
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  creator, // Destructure creator prop
  prompt, // Destructure prompt prop
}) => {
  useBodyScrollLock(); // Disable background scrolling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowRight" && images.length > 1) {
      handleNext();
    } else if (event.key === "ArrowLeft" && images.length > 1) {
      handlePrev();
    }
  };

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    // Determine swipe threshold
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) {
      handleNext();
    } else if (swipeDistance < -swipeThreshold) {
      handlePrev();
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        style={{ zIndex: 100 }}
        className="absolute top-[18%] right-[10%] md:top-[10%] md:right-[21%] text-white text-4xl hover:text-5xl hover:text-designColor transition-all duration-300"
        onClick={onClose}
      >
        <IoClose />
      </button>
      <div className="relative w-[80%] md:w-[60%] h-[80%] flex items-center justify-center">
        {images.length > 1 && (
          <button
            className="absolute left-5 text-white text-3xl hover:text-5xl hover:text-designColor transition-all duration-300"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
        )}
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full rounded-md"
        />
        {images.length > 1 && (
          <button
            className="absolute right-5 text-white text-3xl hover:text-4xl hover:text-designColor transition-all duration-300"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        )}
        {/* Display creator and prompt with icons at bottom left */}
        <div className="absolute bottom-20 lg:bottom-0 left-25 bg-black bg-opacity-60 p-2 rounded-md flex flex-col w-[90%] lg:w-[70%] overflow-hidden justify-center">
          <div className="flex gap-1 items-center text-white">
            <FaUser className="mr-1" />
            <h2 className="text-xs lg:text-sm">{creator}</h2>
          </div>
          <div className="flex items-center text-white mt-1">
            <p className="text-xs lg:text-sm">{prompt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
