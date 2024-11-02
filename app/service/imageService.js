import axios from "axios";

const BASE_URL =
  "http://ec2-3-149-233-160.us-east-2.compute.amazonaws.com:8081/";
const API_URL = BASE_URL + "api/images/generate-image";
const POST_IMAGE_URL = BASE_URL + "api/images/post-image";
const FETCH_IMAGES_URL = BASE_URL + "api/images";
const SEARCH_IMAGES_URL = BASE_URL + "api/images/search";

// Method to generate an image
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
    return response.data;
  } catch (error) {
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

// Method to post an image
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
    return response.data;
  } catch (error) {
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

// Method to fetch images with pagination
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
    return response.data;
  } catch (error) {
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

// Method to search images
export const searchImages = async (query) => {
  try {
    const response = await axios.get(`${SEARCH_IMAGES_URL}?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Error searching images",
      };
    } else {
      throw new Error("Network Error: " + error.message);
    }
  }
};
