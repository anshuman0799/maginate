// src/services/imageService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/images/generate-image";

export const generateImage = async (data) => {
  try {
    const response = await axios.post(API_URL, {
      input: {
        prompt: data.prompt,
        go_fast: true,
        num_outputs: data.numImages,
        aspect_ratio: data.selectedRatio,
        output_format: data.imgFormat,
        output_quality: data.imgQuality * 10,
      },
    });
    return response.data; // Return the response data to the calling function
  } catch (error) {
    // Check if the error is an Axios error and has a response
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Error generating image",
      };
    } else {
      throw new Error("Network Error: " + error.message);
    }
  }
};
