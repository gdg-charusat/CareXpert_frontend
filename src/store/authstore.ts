import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    role: "PATIENT" | "DOCTOR" | "ADMIN"; // updated to strict types
    refreshToken?: string;
}

interface AuthState {
    user: User | null;
    isHydrated: boolean; // added this
    setUser: (user: User | null) => void;
    logout: () => void;
    setHydrated: (state: boolean) => void; // added this
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isHydrated: false, // starts as false
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
            setHydrated: (state) => set({ isHydrated: state }),
        }),
        {
            name: 'auth-storage',
            // this function runs automatically after storage is loaded
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);