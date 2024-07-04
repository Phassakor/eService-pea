import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_REQUEST_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" ,"apiKey":`${process.env.NEXT_PUBLIC_API_KEY}`},
});
export default axiosInstance;