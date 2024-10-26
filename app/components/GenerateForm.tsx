"use client";
import React, { useState } from "react";
import AdvancedMode from "./AdvanceMode";
import { RiPencilFill } from "react-icons/ri";
import { FaMagic } from "react-icons/fa";
import { generateImage } from "../service/imageService";

const GenerateForm: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [selectedRatio, setSelectedRatio] = useState<string>("1:1");
  const [numImages, setNumImages] = useState<number>(1);
  const [imgQuality, setImgQuality] = useState<number>(10);
  const [imgFormat, setImgFormat] = useState<string>("jpg");
  const [isAdvancedModeOpen, setIsAdvancedModeOpen] = useState(false);

  const handleGenerate = async () => {
    const data = {
      prompt,
      selectedRatio,
      numImages,
      imgQuality,
      imgFormat,
    };

    try {
      const result = await generateImage(data);
      console.log("Image generation result:", result);
      // Handle the result, e.g., display the image
    } catch (error) {
      console.error(error);
      // Optionally, show an error message to the user
    }
  };

  const handlePost = () => {};

  const toggleAdvancedMode = () => {
    setIsAdvancedModeOpen((prev) => !prev);
  };

  return (
    <div className="w-full lg:w-2/5 flex flex-col gap-5 md:gap-10">
      {/* Heading Area */}
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
            placeholder="Describe the image you want to create..."
            className="p-3 text-sm font-bodyFont text-white bg-bodyColor rounded-md resize-none border-[0.5px] border-gray-300 focus:border-designColor focus:outline-none"
          />
          <p className="text-xs text-gray-400">
            {prompt.length}/{300} characters
          </p>
        </div>

        {/* Author text-area */}
        {/* <div className="flex flex-col gap-2">
          <label htmlFor="author" className="text-xs font-medium text-white/90">
            Author{" "}
          </label>
          <textarea
            id="author"
            rows={1}
            maxLength={10}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Type your name..."
            className="p-3 text-sm font-bodyFont text-white bg-bodyColor rounded-md resize-none border-[0.5px] border-gray-300 focus:border-designColor focus:outline-none"
          />
          <p className="text-xs text-gray-400">
            {author.length}/{10} characters
          </p>
        </div> */}
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
            !prompt.trim() ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            handleGenerate();
            toggleAdvancedMode();
          }}
          disabled={!prompt.trim()} // Disable button if prompt is empty
        >
          <FaMagic />
          <span>Create Image</span>
        </button>
        <button className="btnPost" onClick={handlePost}>
          <RiPencilFill />
          <span>Post Image</span>
        </button>
      </div>
    </div>
  );
};

export default GenerateForm;
