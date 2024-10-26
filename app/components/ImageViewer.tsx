import React from "react";

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
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex];
    link.download = `image-${currentIndex + 1}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button className="absolute top-5 right-5 text-white" onClick={onClose}>
        Close
      </button>
      <div className="relative w-[80%] md:w-[60%] h-[80%] flex items-center justify-center">
        {hasPrev && (
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={() => onNavigate(currentIndex - 1)}
          >
            &#8592;
          </button>
        )}
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full rounded-md"
        />
        {hasNext && (
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={() => onNavigate(currentIndex + 1)}
          >
            &#8594;
          </button>
        )}
        <button
          className="absolute bottom-5 text-white bg-gray-800 px-4 py-2 rounded-md"
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
