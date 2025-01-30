"use client";
import { AxiosRequestConfig } from "axios";
import Axios from "./base";
interface SuccessFileUploadResponse {
  url: string;
}
export async function upload(body: FormData, config: AxiosRequestConfig) {
  const res = await Axios.post<SuccessFileUploadResponse>(
    "/images",
    body,
    config
  );
  return res;
}
