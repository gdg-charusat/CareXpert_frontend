import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "@/services/endpoints/api";
import { disconnectSocket } from "@/sockets/socket";
import type { User } from "@/services/types/api";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Authentication Store using Zustand
 * Manages user authentication state with persistent storage
 * Uses centralized API service for all HTTP requests
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,

      /**
       * Set user manually (used when updating profile)
       */
      setUser: (user) => set({ user }),

      /**
       * Logout user and clean up
       */
      logout: () => {
        set({ user: null });
        disconnectSocket();
        localStorage.removeItem("auth-storage");
      },

      /**
       * Login user with email and password
       * Uses centralized authAPI.login() from API service
       */
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const loginResponse = await authAPI.login(email, password);

          const userData: User = {
            id: loginResponse.id,
            name: loginResponse.name,
            email: loginResponse.email,
            profilePicture: loginResponse.profilePicture,
            role:
              (loginResponse.role as
                | "PATIENT"
                | "DOCTOR"
                | "ADMIN") || "PATIENT",
            refreshToken: loginResponse.refreshToken,
          };

          set({ user: userData, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
          if (err instanceof Error) {
            throw new Error(err.message || "Login failed");
          }
          throw new Error("Unknown error occurred");
        }
      },

      /**
       * Check authentication status
       * With Zustand persist, user is rehydrated from localStorage synchronously
       */
      checkAuth: async () => {
        set({ isLoading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
