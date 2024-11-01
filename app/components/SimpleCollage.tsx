import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { LuText } from "react-icons/lu";
import ImageViewer from "./ImageViewerPost";

interface ImageData {
  _id: string;
  creator: string;
  prompt: string;
  postUrl: string;
}

interface SimpleCollageProps {
  images: ImageData[];
}

const SimpleCollage: React.FC<SimpleCollageProps> = ({ images }) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openImageViewer = (index: number) => {
    setViewerIndex(index);
  };

  const closeImageViewer = () => {
    setViewerIndex(null);
  };

  return (
    <div className="p-4">
      {images.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image._id}
              className="relative overflow-hidden cursor-pointer group rounded-lg aspect-square"
              onClick={() => openImageViewer(index)}
            >
              <img
                src={image.postUrl}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:opacity-40 rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-0 flex flex-col text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-left">
                  <div className="inline-flex items-center justify-left w-6 h-6">
                    <FaUser style={{ fontSize: "0.75rem" }} />
                  </div>
                  <h2 className="text-xs lg:text-sm font-bold">
                    {image.creator}
                  </h2>
                </div>
                <div className="flex items-center text-left">
                  <div className="inline-flex items-center justify-left w-6 h-6">
                    <LuText style={{ fontSize: "0.75rem" }} />
                  </div>
                  <p className="text-xs lg:text-sm font-bold truncate ml-3">
                    {image.prompt}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {viewerIndex !== null && (
            <ImageViewer
              images={images.map((img) => img.postUrl)}
              currentIndex={viewerIndex}
              onClose={closeImageViewer}
              onNavigate={setViewerIndex}
              creator={images[viewerIndex]?.creator || ""}
              prompt={images[viewerIndex]?.prompt || ""}
            />
          )}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          <p className="text-lg font-semibold">
            No images were found for your search.
          </p>
          <p>Try adjusting your search terms to find results.</p>
        </div>
      )}
    </div>
  );
};

export default SimpleCollage;
