import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-food-ordering.onrender.com";

export const S3_BASE_URL =
  import.meta.env.VITE_S3_URL ||
  "https://foods-.s3.us-east-1.amazonaws.com/foods";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
