import React from "react";

interface CollageProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const Collage: React.FC<CollageProps> = ({ images, onImageClick }) => {
  return (
    <div className="w-full h-full grid gap-2 p-2 border-[1px] border-dashed border-yellow-500 rounded-3xl cursor-pointer">
      {images.length === 1 && (
        // Single Image - fills the entire container
        <div
          className="w-full h-full bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${images[0]})` }}
          onClick={() => onImageClick(0)}
        />
      )}

      {images.length === 2 && (
        // Two Images - stacked vertically (top and bottom)
        <div className="grid grid-rows-2 gap-2 h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="bg-cover bg-center rounded-md h-full"
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      )}

      {images.length === 3 && (
        // Three Images - first two side-by-side at the top, third image fills the bottom
        <div className="grid grid-rows-2 gap-2 h-full">
          <div className="grid grid-cols-2 gap-2">
            <div
              className="bg-cover bg-center rounded-md h-full"
              style={{ backgroundImage: `url(${images[0]})` }}
              onClick={() => onImageClick(0)}
            />
            <div
              className="bg-cover bg-center rounded-md h-full"
              style={{ backgroundImage: `url(${images[1]})` }}
              onClick={() => onImageClick(1)}
            />
          </div>
          <div
            className="bg-cover bg-center rounded-md h-full"
            style={{ backgroundImage: `url(${images[2]})` }}
            onClick={() => onImageClick(2)}
          />
        </div>
      )}

      {images.length === 4 && (
        // Four Images - 2x2 grid
        <div className="grid grid-cols-2 gap-2 h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collage;
