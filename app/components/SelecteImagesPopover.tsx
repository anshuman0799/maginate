import React, { useState } from "react";

interface SelectImagesPopoverProps {
  images: string[];
  creator: string;
  setCreator: (name: string) => void;
  onClose: () => void;
  onPost: (selectedImages: string[]) => void;
}

const SelectImagesPopover: React.FC<SelectImagesPopoverProps> = ({
  images,
  creator,
  setCreator,
  onClose,
  onPost,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelect = (image: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(image)
        ? prevSelected.filter((img) => img !== image)
        : [...prevSelected, image]
    );
  };

  const handlePostClick = () => {
    const imagesToPost = images.length === 1 ? images : selectedImages;
    onPost(imagesToPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="popover-container bg-bodyColor rounded-lg p-6 shadow-lg w-[90%] md:w-[600px] lg:w-[700px]">
        {" "}
        {/* Responsive width */}
        <h2 className="text-2xl font-titleFont mb-4 text-center">
          {images.length === 1 ? "Create a Post" : "Select Your Images"}
        </h2>
        <div
          className={`image-grid grid gap-3 mb-5 ${
            images.length > 1
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
              : "flex justify-center"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden" // Responsive height
            >
              <img
                src={image}
                alt={`Generated image ${index + 1}`}
                className={`w-full h-full object-cover rounded-md cursor-pointer ${
                  images.length > 1 && selectedImages.includes(image)
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => images.length > 1 && handleImageSelect(image)}
              />
              {images.length > 1 && (
                <input
                  type="checkbox"
                  className="absolute top-2 left-2"
                  checked={selectedImages.includes(image)}
                  onChange={() => handleImageSelect(image)}
                />
              )}
            </div>
          ))}
        </div>
        {/* Creator Name Text-area */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="creatorName"
              className="text-xs font-medium text-white/90"
            >
              Creator's Name
            </label>
            <textarea
              id="creatorName"
              rows={1}
              maxLength={10}
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="Enter your name..."
              className="p-3 text-sm font-bodyFont text-white bg-bodyColor rounded-md resize-none border-[0.5px] border-gray-300 focus:border-designColor focus:outline-none"
            />
            <p className="text-xs text-gray-400">
              {creator.length}/{10} characters
            </p>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btnPost px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            onClick={handlePostClick}
            disabled={
              (images.length > 1 && !selectedImages.length) || !creator.trim()
            }
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectImagesPopover;
