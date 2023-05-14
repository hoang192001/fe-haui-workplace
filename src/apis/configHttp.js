import axios from "axios";
import { redirect } from "react-router-dom";
const accessToken = localStorage.getItem("accessToken");

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`,
  },
});

export const axiosFormData = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`,
  },
});

const refresh = async () => {
  const response = await axiosPrivate.post("/auth/refreshToken");
  return response.data.accessToken;
};

axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    // if (error?.response?.status === 500) {
    //   window.location.href = '/login';
    // }
    // const prevRequest = error?.config;
    // if (error?.response?.status === 400 && !prevRequest?.sent) {
    //   prevRequest.sent = true;
    //   const newAccessToken = await refresh();
    //   prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //   return axiosPrivate(prevRequest);
    // }
    return Promise.reject(error);
  }
);
