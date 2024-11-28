import axios, { AxiosInstance } from "axios";
// import { getCookie } from "cookies-next";

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${getCookie("accessToken")}`,
  // },
});

export default clientAxiosInstance;
