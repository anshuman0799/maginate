import axios from "axios";

const BASE_URL = "http://localhost:8080/";
const API_URL = BASE_URL + "api/images/generate-image";
const POST_IMAGE_URL = BASE_URL + "api/images/post-image";
const FETCH_IMAGES_URL = BASE_URL + "api/images";

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
    console.log(response.data);
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

// New method for posting images
export const postImage = async (data) => {
  try {
    const response = await axios.post(POST_IMAGE_URL, {
      id: data.id,
      creator: data.creator,
      input: {
        prompt: data.input.prompt,
        go_fast: true,
        num_outputs: data.input.num_outputs,
        aspect_ratio: data.input.aspect_ratio,
        output_format: data.input.output_format,
        output_quality: data.input.output_quality,
      },
      output: data.output,
    });
    console.log(response.data);
    return response.data; // Return the response data to the calling function
  } catch (error) {
    // Check if the error is an Axios error and has a response
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Error posting image",
      };
    } else {
      throw new Error("Network Error: " + error.message);
    }
  }
};

// fetching images with pagination
export const fetchImages = async (page, size) => {
  try {
    const response = await axios.get(
      `${FETCH_IMAGES_URL}?page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data; // Return the response data to the calling function
  } catch (error) {
    // Check if the error is an Axios error and has a response
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Error fetching images",
      };
    } else {
      throw new Error("Network Error: " + error.message);
    }
  }
};
