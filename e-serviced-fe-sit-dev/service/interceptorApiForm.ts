import axiosInstance from "./apiServiceInstance";

axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   config.headers["Authorization"] = `Bearer ${token}`;
  // }
  return config;
},(error)=> {return Promise.reject(error)});

axiosInstance.interceptors.response.use((response)=> response,async (error)=>{
    const {config,response} = error;
    const originalRequest = config;
    return Promise.reject(error)
}
);
export default axiosInstance;