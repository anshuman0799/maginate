"use client";
import React, { useState } from "react";
import GenerateForm from "./components/GenerateForm";
import ImageArea from "./components/ImageArea";
import { generateImage, postImage } from "./service/imageService";

interface GeneratedImageData {
  id: string;
  creator: string;
  output: any[];
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [numImages, setNumImages] = useState(1);
  const [imgQuality, setImgQuality] = useState(10);
  const [imgFormat, setImgFormat] = useState("jpg");
  const [isAdvancedModeOpen, setIsAdvancedModeOpen] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState<string | null>(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isLoading, setIsLoading] = useState({ generate: false, post: false });
  const [generatedImageData, setGeneratedImageData] =
    useState<GeneratedImageData | null>(null);
  const [isImageGenerated, setIsImageGenerated] = useState(false); // New state for tracking image generation success

  const handleGenerate = async () => {
    setIsLoading((prev) => ({ ...prev, generate: true }));
    setIsImageGenerated(false); // Reset the success state when generating a new image

    if (isAdvancedModeOpen) setIsAdvancedModeOpen(false);

    setTimeout(() => {
      const scrollPosition = window.matchMedia("(min-width: 1024px)").matches
        ? 0
        : 310;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }, 100);

    try {
      const data = { prompt, selectedRatio, numImages, imgQuality, imgFormat };
      const result = await generateImage(data);
      setGeneratedImageData(result);
      setIsImageGenerated(true); // Set success state to true after successful image generation
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, generate: false }));
    }
  };

  const handlePost = async () => {
    setIsLoading((prev) => ({ ...prev, post: true }));
    try {
      const postData = {
        id: generatedImageData?.id || "default-id",
        creator: generatedImageData?.creator || "default-creator",
        input: {
          prompt: prompt,
          go_fast: true,
          num_outputs: numImages,
          aspect_ratio: selectedRatio,
          output_format: imgFormat,
          output_quality: imgQuality * 10,
        },
        output: generatedImageData?.output || [],
      };

      const response = await postImage(postData);
      console.log("Post Image response:", response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, post: false }));
    }
  };

  const handleError = (error: unknown) => {
    console.error("Error object:", error);
    if (typeof error === "object" && error !== null && "status" in error) {
      const apiError = error as { status?: number; message?: string };
      setPopoverMessage(
        apiError.status === 400
          ? "NSFW words detected in your prompt, please modify it."
          : "Something went wrong, please try again later."
      );
    } else {
      setPopoverMessage("Something went wrong, please try again later.");
    }
    setIsPopoverVisible(true);
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedModeOpen((prev) => !prev);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
    setPopoverMessage(null);
  };

  return (
    <section className="w-full pt-10 md:pt-20 flex flex-col gap-10 lg:flex-row pl-5 pr-5">
      <GenerateForm
        prompt={prompt}
        setPrompt={setPrompt}
        selectedRatio={selectedRatio}
        setSelectedRatio={setSelectedRatio}
        numImages={numImages}
        setNumImages={setNumImages}
        imgQuality={imgQuality}
        setImgQuality={setImgQuality}
        imgFormat={imgFormat}
        setImgFormat={setImgFormat}
        isAdvancedModeOpen={isAdvancedModeOpen}
        toggleAdvancedMode={toggleAdvancedMode}
        isLoading={isLoading}
        handleGenerate={handleGenerate}
        handlePost={handlePost}
        isPopoverVisible={isPopoverVisible}
        popoverMessage={popoverMessage}
        closePopover={closePopover}
        isImageGenerated={isImageGenerated} // Pass the new state to GenerateForm
      />
      <ImageArea
        imageData={generatedImageData}
        isLoading={isLoading.generate}
      />
    </section>
  );
}
