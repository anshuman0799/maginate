import React, { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

// Define the prop types
interface AdvancedModeProps {
  setSelectedRatio: (ratio: string) => void;
  setNumImages: (num: number) => void;
  setImgQuality: (quality: number) => void;
  setImgFormat: (format: string) => void;
  toggleAdvancedMode: () => void;
  isOpen: boolean;
  initialNumImages?: number;
}

const AdvancedMode: React.FC<AdvancedModeProps> = ({
  setSelectedRatio,
  setNumImages,
  setImgQuality,
  setImgFormat,
  toggleAdvancedMode,
  isOpen,
  initialNumImages = 1,
}) => {
  const [selectedSize, setSelectedSize] = useState("Square");
  const [imgQualityLocal, setImgQualityLocal] = useState(10);
  const [imgFormatLocal, setImgFormatLocal] = useState("jpg");
  const [selectedRatio, setSelectedRatioLocal] = useState("1:1");
  const [numImages, setNumImagesLocal] = useState(initialNumImages);

  const handleImageQualityChange = (value: number) => {
    setImgQualityLocal(value);
    setImgQuality(value);
  };

  const handleImageFormatChange = (format: string) => {
    setImgFormatLocal(format);
    setImgFormat(format);
  };

  const renderSubButtons = () => {
    switch (selectedSize) {
      case "Portrait":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedRatio("3:4");
                setSelectedRatioLocal("3:4");
              }}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "3:4"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              3:4
            </button>
            <button
              onClick={() => {
                setSelectedRatio("9:16");
                setSelectedRatioLocal("9:16");
              }}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "9:16"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              9:16
            </button>
          </div>
        );
      case "Landscape":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedRatio("4:3");
                setSelectedRatioLocal("4:3");
              }}
              className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                selectedRatio === "4:3"
                  ? "border-designColor"
                  : "border-gray-300"
              }`}
            >
              4:3
            </button>
            <button
              onClick={() => {
                setSelectedRatio("16:9");
                setSelectedRatioLocal("16:9");
              }}
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
            onClick={() => {
              setSelectedRatio("1:1");
              setSelectedRatioLocal("1:1");
            }}
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
    <div className="w-full flex flex-col gap-5 bg-bodyColor p-1 border-[0.5px] border-gray-300 rounded-md cursor-pointer">
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
          className={`flex flex-col mt-3 transition-all duration-500 ease-in-out overflow-hidden`}
        >
          {/* Image Format Selection */}
          <div className="flex flex-col gap-2 p-4 pt-0">
            <label className="text-xs font-medium text-white/90">
              Image Format
            </label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleImageFormatChange("jpg")}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  imgFormatLocal === "jpg"
                    ? "border-designColor"
                    : "border-gray-300"
                }`}
              >
                JPEG
              </button>
              <button
                onClick={() => handleImageFormatChange("png")}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  imgFormatLocal === "png"
                    ? "border-designColor"
                    : "border-gray-300"
                }`}
              >
                PNG
              </button>
              <button
                onClick={() => handleImageFormatChange("webp")}
                className={`py-1 px-3 border rounded-md text-sm md:text-md ${
                  imgFormatLocal === "webp"
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
                  setSelectedRatioLocal("1:1");
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
                  setSelectedRatioLocal("3:4");
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
                  setSelectedRatioLocal("4:3");
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

          <div className="flex flex-col gap-6 p-4">
            {/* Number of Images */}
            <div className="flex ">
              <div className="flex flex-col w-1/2 gap-2">
                {" "}
                <label className="text-xs font-medium text-white/90">
                  Number of Images
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={numImages}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setNumImagesLocal(value); // Update local state
                    setNumImages(value); // Pass to the parent
                  }}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none 
                  focus:outline-none accent-designColor mt-2"
                  style={{
                    background: `linear-gradient(to right, #388E3C 0%, #388E3C ${
                      ((numImages - 1) / 3) * 100
                    }%, #4A4A4A ${((numImages - 1) / 3) * 100}%, #4A4A4A 100%)`,
                  }}
                />
              </div>

              <span className="text-sm pt-5 pl-6 text-gray-200 text-start">
                Quantity: {numImages}
              </span>
            </div>

            {/* Image Quality */}
            <div className="flex">
              <div className="flex flex-col w-1/2 gap-2 ">
                <label className="text-xs font-medium text-white/90">
                  Image Quality
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={imgQualityLocal}
                  onChange={(e) =>
                    handleImageQualityChange(Number(e.target.value))
                  }
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none 
                  focus:outline-none accent-designColor mt-2"
                  style={{
                    background: `linear-gradient(to right, #388E3C 0%, #388E3C ${
                      ((imgQualityLocal - 1) / 9) * 100
                    }%, #4A4A4A ${
                      ((imgQualityLocal - 1) / 9) * 100
                    }%, #4A4A4A 100%)`,
                  }}
                />
              </div>
              <span className="text-sm pt-5 pl-6 text-gray-200 text-start">
                Quality: {imgQualityLocal * 10} %
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedMode;
