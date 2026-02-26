import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "@/services/endpoints/api";
import { disconnectSocket } from "@/sockets/socket";
import type { User } from "@/services/types/api";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  sessionExpiredAt: number | null;
  setUser: (user: User) => void;
  logout: () => void;
  handleSessionExpiry: (reason?: string) => void;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  initCrossTabSync: () => () => void;
}

/**
 * Authentication Store using Zustand
 * Manages user authentication state with persistent storage
 * Uses centralized API service for all HTTP requests
 */
// BroadcastChannel for cross-tab logout synchronization
const LOGOUT_CHANNEL_NAME = 'carexpert-logout';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      sessionExpiredAt: null,


      /**
       * Logout user and clean up
       */
      logout: () => {
        set({ user: null });
      },

      setUser: (user) => set({ user, sessionExpiredAt: null }),

      handleSessionExpiry: (_reason?: string) => {
        const currentUser = get().user;
        // Prevent duplicate session expiry handling
        if (!currentUser) return;

        // Clear state
        set({ user: null, sessionExpiredAt: Date.now() });
        disconnectSocket();
        localStorage.removeItem("auth-storage");
      },

      /**
       * Login user with email and password
       * Uses centralized authAPI.login() from API service
       */

      login: async (email: string, password: string) => {
        set({ isLoading: true, sessionExpiredAt: null });
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

      initCrossTabSync: () => {
        let channel: BroadcastChannel | null = null;

        // Primary: BroadcastChannel for cross-tab sync
        try {
          channel = new BroadcastChannel(LOGOUT_CHANNEL_NAME);
          channel.onmessage = (event) => {
            if (event.data?.type === 'logout') {
              const currentUser = get().user;
              if (currentUser) {
                set({ user: null, sessionExpiredAt: Date.now() });
                disconnectSocket();
                localStorage.removeItem('auth-storage');
                // Redirect to login
                window.location.href = '/auth/login';
              }
            }
          };
        } catch {
          // BroadcastChannel not supported, fallback below
        }

        // Fallback: storage event for older browsers
        const handleStorageEvent = (event: StorageEvent) => {
          if (event.key === 'carexpert-logout-event') {
            const currentUser = get().user;
            if (currentUser) {
              set({ user: null, sessionExpiredAt: Date.now() });
              disconnectSocket();
              localStorage.removeItem('auth-storage');
              window.location.href = '/auth/login';
            }
          }
          // Also detect if auth-storage was removed externally
          if (event.key === 'auth-storage' && event.newValue === null) {
            const currentUser = get().user;
            if (currentUser) {
              set({ user: null, sessionExpiredAt: Date.now() });
              disconnectSocket();
              window.location.href = '/auth/login';
            }
          }
        };
        window.addEventListener('storage', handleStorageEvent);

        // Return cleanup function
        return () => {
          channel?.close();
          window.removeEventListener('storage', handleStorageEvent);
        };
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
