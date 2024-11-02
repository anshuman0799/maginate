import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { LuText } from "react-icons/lu";
import ImageViewer from "./ImageViewerPost";

interface ImageData {
  _id: string;
  creator: string;
  prompt: string;
  postUrl: string;
  imageRatio: string;
}

interface PostCollageProps {
  images: ImageData[];
}

const PostCollage: React.FC<PostCollageProps> = ({ images }) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openImageViewer = (index: number) => {
    setViewerIndex(index);
  };

  const closeImageViewer = () => {
    setViewerIndex(null);
  };

  return (
    <div className="grid grid-cols-5 gap-2 p-2 lg:gap-4 lg:p-4">
      {images.map((image, index) => {
        const isLargeImage = index % 10 < 5 ? index % 5 === 0 : index % 5 === 4;

        return (
          <div
            key={image._id}
            className={`relative overflow-hidden cursor-pointer group rounded-lg aspect-square ${
              isLargeImage ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
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
        );
      })}
      {viewerIndex !== null && (
        <ImageViewer
          images={images.map((img) => img.postUrl)}
          currentIndex={viewerIndex}
          onClose={closeImageViewer}
          onNavigate={setViewerIndex}
          creator={images[viewerIndex]?.creator || ""} // Pass creator name
          prompt={images[viewerIndex]?.prompt || ""} // Pass prompt
        />
      )}
    </div>
  );
};

export default PostCollage;
