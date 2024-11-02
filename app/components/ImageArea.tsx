import React, { useState } from "react";
import Collage from "./Collage";
import ImageViewer from "./ImageViewer";

interface ImageAreaProps {
  imageData: {
    output: string[];
  } | null;
  isLoading: boolean;
}

const ImageArea: React.FC<ImageAreaProps> = ({ imageData, isLoading }) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openImageViewer = (index: number) => setViewerIndex(index);
  const closeImageViewer = () => setViewerIndex(null);

  return (
    <div className="w-full lg:w-3/5 flex flex-col gap-5 md:gap-10 items-center">
      <div className="w-[350px] h-[350px] md:w-[650px] md:h-[650px] border-[1px] border-dashed border-yellow-500 rounded-3xl flex items-center justify-center">
        {isLoading ? (
          <div className="loader">
            {" "}
            {/* Add loader CSS here */}
            <span className="animate-spin w-10 h-10 border-4 border-t-transparent border-white rounded-full"></span>
          </div>
        ) : imageData ? (
          <Collage images={imageData.output} onImageClick={openImageViewer} />
        ) : (
          <p className="text-white/60 font-titleFont text-center">
            Describe the image you want to create...
          </p>
        )}
      </div>
      {viewerIndex !== null && (
        <ImageViewer
          images={imageData?.output || []}
          currentIndex={viewerIndex}
          onClose={closeImageViewer}
          onNavigate={setViewerIndex}
        />
      )}
    </div>
  );
};

export default ImageArea;
