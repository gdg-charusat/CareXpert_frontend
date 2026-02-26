// src/lib/api.ts
import axios from "axios";
import { useAuthStore } from "@/store/authstore";
import { toast } from "sonner";

const rawBaseUrl =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.replace(/\/+$/, "") ||
  "";
const baseURL = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true, // This ensures cookies/sessions are always sent
});

// Flag to prevent multiple simultaneous 401 handlers
let isHandlingUnauthorized = false;

// Interceptor to handle global responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401 Unauthorized, the session expired
    if (error.response?.status === 401) {
      // Deduplicate: only handle the first 401 in a batch
      if (!isHandlingUnauthorized) {
        isHandlingUnauthorized = true;

        toast.error('Session expired. Please log in again.');
        useAuthStore.getState().handleSessionExpiry('api_unauthorized');
        window.location.href = '/auth/login';

        // Reset flag after a short delay to absorb rapid-fire 401s
        setTimeout(() => {
          isHandlingUnauthorized = false;
        }, 2000);
      }
    }
    return Promise.reject(error);
  },
);
