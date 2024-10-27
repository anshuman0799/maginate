import React from "react";
import AdvancedMode from "./AdvanceMode";
import Popover from "./Popover";
import { RiPencilFill } from "react-icons/ri";
import { FaMagic } from "react-icons/fa";

interface GenerateFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  selectedRatio: string;
  setSelectedRatio: (value: string) => void;
  numImages: number;
  setNumImages: (value: number) => void;
  imgQuality: number;
  setImgQuality: (value: number) => void;
  imgFormat: string;
  setImgFormat: (value: string) => void;
  isAdvancedModeOpen: boolean;
  toggleAdvancedMode: () => void;
  isLoading: { generate: boolean; post: boolean };
  handleGenerate: () => void;
  handleOpenPostPopover: () => void;
  isPopoverVisible: boolean;
  popoverMessage: string | null;
  closePopover: () => void;
  isImageGenerated: boolean;
}

const GenerateForm: React.FC<GenerateFormProps> = ({
  prompt,
  setPrompt,
  selectedRatio,
  setSelectedRatio,
  numImages,
  setNumImages,
  imgQuality,
  setImgQuality,
  imgFormat,
  setImgFormat,
  isAdvancedModeOpen,
  toggleAdvancedMode,
  isLoading,
  handleGenerate,
  handleOpenPostPopover,
  isPopoverVisible,
  popoverMessage,
  closePopover,
  isImageGenerated,
}) => {
  return (
    <div className="w-full lg:w-2/5 flex flex-col gap-5 md:gap-10">
      <div className="flex flex-col gap-3 lgl:gap-8">
        <h1 className="text-2xl md:text-3xl font-titleFont text-left leading-6">
          Craft Stunning Visuals
        </h1>
        <h1 className="text-2xl md:text-3xl font-titleFont text-left leading-6">
          From Your Imagination
        </h1>
        <h1 className="text-2xl md:text-3xl font-titleFont text-left leading-6">
          With
          <span className="text-designColor font-bold capitalize">
            {" "}
            Artificial Intelligence.
          </span>
        </h1>
        <p className="text-sm md:text-lg text-left font-bodyFont text-white/90 leading-6 tracking-wide py-5">
          Guide the Magic: Write Your Prompt for the Image You Want
        </p>
      </div>
      {/* Text-area */}
      <div className="flex flex-col gap-5">
        {/* Prompt Text-area */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="imagePrompt"
            className="text-xs font-medium text-white/90"
          >
            Image Prompt
          </label>
          <textarea
            id="imagePrompt"
            rows={6}
            maxLength={300}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A tiny pokemon hatching from an egg"
            className="p-3 text-sm font-bodyFont text-white bg-bodyColor rounded-md resize-none border-[0.5px] border-gray-300 focus:border-designColor focus:outline-none"
          />
          <p className="text-xs text-gray-400">
            {prompt.length}/{300} characters
          </p>
        </div>
      </div>
      {/* Advanced Mode Settings */}
      <AdvancedMode
        setSelectedRatio={setSelectedRatio}
        setNumImages={setNumImages}
        setImgQuality={setImgQuality}
        setImgFormat={setImgFormat}
        isOpen={isAdvancedModeOpen}
        toggleAdvancedMode={toggleAdvancedMode}
      />

      {/* Submit buttons */}
      <div className="flex gap-4 mt-4">
        <button
          className={`btnGenerate ${
            !prompt.trim() || isLoading.generate
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading.generate}
        >
          <FaMagic />
          <span>{isLoading.generate ? "Generating..." : "Create Image"}</span>
        </button>
        <button
          className={`btnPost ${
            isLoading.post || !isImageGenerated
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
          onClick={handleOpenPostPopover}
          disabled={isLoading.post || !isImageGenerated}
        >
          <RiPencilFill />
          <span>{isLoading.post ? "Posting..." : "Post Image"}</span>
        </button>
      </div>
      {/* Show Popover */}
      {isPopoverVisible && (
        <Popover message={popoverMessage!} onClose={closePopover} />
      )}
    </div>
  );
};

export default GenerateForm;
