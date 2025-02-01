import axios from "axios";
import { getAccessToken } from "../server-api/city";
const Axios = axios.create({
  baseURL: "http://localhost:8000",
});

Axios.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Axios;
