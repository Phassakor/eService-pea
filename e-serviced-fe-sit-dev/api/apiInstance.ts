import api from "../service/interceptor";
import { AxiosRequestConfig, AxiosResponse } from "axios";
interface ConfigResponse {
  status: boolean;
  data: any | null;
  message: string;
}

interface ApiResponse {
  is_success: boolean;
  message: string;
  response_data: string;
  sysid: string;
  data?: any; // Optional if the data is present
}

// Define the possible methods that can be used
type ApiMethods = "get" | "post" | "put" | "delete" | "patch";

const apiInstance = async (
  url: string,
  method: ApiMethods,
  data: any = null,
  timeCancel: number | null = null
): Promise<any> => {
  if (method) {
    let res: AxiosResponse<any>;
    try {
      if (data === null) {
        switch (method) {
          case "get":
            res = await api.get(url);
            break;
          case "delete":
            res = await api.delete(url);
            break;
          default:
            throw new Error(`Method ${method} is not supported without data`);
        }
      } else {
        switch (method) {
          case "post":
            res = await api.post(url, data);
            break;
          case "put":
            res = await api.put(url, data);
            break;
          case "patch":
            res = await api.patch(url, data);
            break;
          default:
            throw new Error(`Method ${method} is not supported with data`);
        }
      }

      return res.data ?? null;
    } catch (error: any) {
      console.log(error);
      const msg = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return {
        status: false,
        data: null,
        message: msg,
      };
    }
  } 
  return null; // Return null if method is not provided
};

export default apiInstance;
