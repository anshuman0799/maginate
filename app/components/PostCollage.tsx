import React, { useState } from "react";
import ImageViewer from "./ImageViewer";

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
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <div
          key={image._id}
          className="relative overflow-hidden cursor-pointer"
          onClick={() => openImageViewer(index)} // Use the index of the image
        >
          <img
            src={image.postUrl}
            alt={image.prompt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="text-center">
              <h2 className="font-bold">{image.creator}</h2>
              <p>{image.prompt}</p>
            </div>
          </div>
        </div>
      ))}
      {viewerIndex !== null && (
        <ImageViewer
          images={images.map((img) => img.postUrl)} // Assuming postUrl contains the image URLs
          currentIndex={viewerIndex}
          onClose={closeImageViewer}
          onNavigate={setViewerIndex}
        />
      )}
    </div>
  );
};

export default PostCollage;
