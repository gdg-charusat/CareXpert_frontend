// src/lib/api.ts
import axios from "axios";
import { useAuthStore } from "@/store/authstore";
import { notify } from "@/lib/toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Something went wrong";

    if (status === 401) {
      notify.error("Session expired. Please log in again.");
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    if (status >= 400) {
      notify.error(message);
    }

    return Promise.reject(error);
  }
);