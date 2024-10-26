import React, { useState } from "react";
import Collage from "./Collage";
import ImageViewer from "./ImageViewer";

interface ImageAreaProps {
  imageData: {
    output: string[];
  } | null;
}

const ImageArea: React.FC<ImageAreaProps> = ({ imageData }) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openImageViewer = (index: number) => setViewerIndex(index);
  const closeImageViewer = () => setViewerIndex(null);

  return (
    <div className="w-full lg:w-3/5 flex flex-col gap-5 md:gap-10 items-center">
      {imageData ? (
        <div className="w-[350px] h-[350px] md:w-[650px] md:h-[650px] border-[1px] border-dashed border-yellow-500 rounded-3xl flex items-center justify-center">
          <Collage images={imageData.output} onImageClick={openImageViewer} />
        </div>
      ) : (
        <div className="w-[350px] h-[350px] md:w-[650px] md:h-[650px] border-[1px] border-dashed border-yellow-500 rounded-3xl flex items-center justify-center">
          <p className="text-white/60 font-titleFont text-center">
            Write your prompt to generate your image...
          </p>
        </div>
      )}
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
