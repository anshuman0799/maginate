import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useBodyScrollLock(); // Disable background scrolling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const downloadImage = async () => {
    const imageUrl = images[currentIndex];

    // Ensure imageUrl is defined
    if (!imageUrl) {
      console.error("Image URL is undefined");
      return;
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // Extract the file extension from the URL
      const fileExtension = imageUrl.split(".").pop()?.split("?")[0] || "jpg"; // Fallback to 'jpg' if undefined
      link.download = `maginate-${currentIndex + 1}.${fileExtension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the object URL after download
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

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
        <button
          className="absolute bottom-5 text-white bg-gray-800 px-4 py-2 rounded-md flex gap-2"
          onClick={downloadImage}
        >
          <span className="font-medium">Download</span>
          <MdFileDownload className="text-xl mt-1" />
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
