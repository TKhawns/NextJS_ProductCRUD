"use client";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

const serverAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
  // },
});

export default serverAxiosInstance;
