import React, { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const AdvancedMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Square");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [numImages, setNumImages] = useState(1);
  const [imgQuality, setImgQuaility] = useState(4);
  const [imgFormat, setImgFormat] = useState("jpg");

  const toggleAdvancedMode = () => {
    setIsOpen(!isOpen);
  };

  // Sub-buttons for each image size
  const renderSubButtons = () => {
    switch (selectedSize) {
      case "Portrait":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedRatio("3:4")}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "3:4"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              3:4
            </button>
            <button
              onClick={() => setSelectedRatio("9:6")}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "9:6"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              9:6
            </button>
          </div>
        );
      case "Landscape":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedRatio("4:3")}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "4:3"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              4:3
            </button>
            <button
              onClick={() => setSelectedRatio("16:9")}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "16:9"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              16:9
            </button>
          </div>
        );
      default:
        return (
          <button
            onClick={() => setSelectedRatio("1:1")}
            className={`py-1 px-3 border rounded-md text-sm md:text-md ${
              selectedRatio === "1:1" ? "border-designColor" : "border-gray-300"
            }`}
          >
            1:1
          </button>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 bg-bodyColor p-1 border-[0.5px] border-gray-300 rounded-md">
      <div
        onClick={toggleAdvancedMode}
        className="flex justify-between text-white font-medium text-sm md:text-md bg-bodyColor p-2 text-start space-x-2 "
      >
        <div className="flex gap-2">
          <LuSettings2 className="mt-[3px]" />
          <span> Advanced Settings </span>
        </div>

        {isOpen ? (
          <IoIosArrowUp className="text-lg" />
        ) : (
          <IoIosArrowDown className="text-lg" />
        )}
      </div>

      {isOpen && (
        <div
          className={`flex flex-col gap-5 mt-3 transition-all duration-500 ease-in-out overflow-hidden`}
        >
          {/* Image Format Selection */}
          <div className="flex flex-col gap-2 p-4 pt-0">
            <label className="text-xs font-medium text-white/90">
              Image Format
            </label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setImgFormat("jpg");
                }}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  imgFormat === "jpg" ? "border-designColor" : "border-gray-300"
                }`}
              >
                JPEG
              </button>
              <button
                onClick={() => {
                  setImgFormat("png");
                }}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  imgFormat === "png" ? "border-designColor" : "border-gray-300"
                }`}
              >
                PNG
              </button>
              <button
                onClick={() => {
                  setImgFormat("webp");
                }}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  imgFormat === "webp"
                    ? "border-designColor"
                    : "border-gray-300"
                }`}
              >
                WebP
              </button>
            </div>
          </div>

          {/* Image Size Selection */}
          <div className="flex flex-col gap-2 p-4">
            <label className="text-xs font-medium text-white/90">
              Image Size
            </label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setSelectedSize("Square");
                  setSelectedRatio("1:1");
                }}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  selectedSize === "Square"
                    ? "border-designColor"
                    : "border-gray-300"
                }`}
              >
                Square
              </button>
              <button
                onClick={() => {
                  setSelectedSize("Portrait");
                  setSelectedRatio("3:4");
                }}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  selectedSize === "Portrait"
                    ? "border-designColor"
                    : "border-gray-300"
                }`}
              >
                Portrait
              </button>
              <button
                onClick={() => {
                  setSelectedSize("Landscape");
                  setSelectedRatio("4:3");
                }}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  selectedSize === "Landscape"
                    ? "border-designColor"
                    : "border-gray-300"
                }`}
              >
                Landscape
              </button>
            </div>

            {/* Sub-buttons for the selected image size */}
            <div className="mt-2">{renderSubButtons()}</div>
          </div>

          {/* Number of Images */}
          <div className="flex gap-2 p-4">
            <div className="flex flex-col w-1/2 gap-2 ">
              {" "}
              <label className="text-xs font-medium text-white/90">
                Number of Images
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none focus:outline-none 
              accent-designColor mt-2" // Styling the track
                style={{
                  background: `linear-gradient(to right, #388E3C 0%, #388E3C ${
                    ((numImages - 1) / 4) * 100
                  }%, #4A4A4A ${((numImages - 1) / 4) * 100}%, #4A4A4A 100%)`,
                }} // Progress indicator
              />
            </div>

            <span className="text-sm font-medium text-white/90 mt-4 ml-5">
              {" "}
              {numImages} image{numImages > 1 ? "s" : ""}
            </span>

            <p></p>
          </div>

          {/* Image Quality */}
          <div className="flex gap-2 p-4">
            <div className="flex flex-col w-1/2 gap-2 ">
              {" "}
              <label className="text-xs font-medium text-white/90">
                Image Quality
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={imgQuality}
                onChange={(e) => setImgQuaility(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none focus:outline-none 
              accent-designColor mt-2" // Styling the track
                style={{
                  background: `linear-gradient(to right, #388E3C 0%, #388E3C ${
                    ((imgQuality - 1) / 4) * 100
                  }%, #4A4A4A ${((imgQuality - 1) / 4) * 100}%, #4A4A4A 100%)`,
                }} // Progress indicator
              />
            </div>

            <span className="text-sm font-medium text-white/90 mt-5 ml-5">
              {" "}
              {imgQuality * 20}%
            </span>

            <p></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedMode;
