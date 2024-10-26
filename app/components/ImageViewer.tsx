import React, { useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { IoClose } from "react-icons/io5";

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
  const downloadImage = async () => {
    const imageUrl = images[currentIndex];

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob(); // Get the image as a Blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob); // Create a URL for the Blob
      link.download = `image-${currentIndex + 1}.png`; // Name of the downloaded file
      document.body.appendChild(link); // Append the link to the body
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Remove the link from the document

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
      onClose(); // Close on Escape
    } else if (event.key === "ArrowRight") {
      handleNext(); // Navigate right on ArrowRight
    } else if (event.key === "ArrowLeft") {
      handlePrev(); // Navigate left on ArrowLeft
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]); // Reattach listener if currentIndex changes

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button
        style={{ zIndex: 100 }} // Inline z-index for testing
        className="absolute top-[18%] right-[10%] md:top-[10%] md:right-[21%] text-white text-4xl hover:text-5xl hover:text-designColor transition-all duration-300"
        onClick={onClose}
      >
        <IoClose />
      </button>
      <div className="relative w-[80%] md:w-[60%] h-[80%] flex items-center justify-center">
        <button
          className="absolute left-5 text-white text-3xl hover:text-5xl hover:text-designColor transition-all duration-300"
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full rounded-md"
        />
        <button
          className="absolute right-5 text-white text-3xl hover:text-4xl hover:text-designColor transition-all duration-300"
          onClick={handleNext}
        >
          <FaArrowRight />
        </button>
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
