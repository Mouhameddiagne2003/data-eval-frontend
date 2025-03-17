import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            login: (userData, token) => {
                localStorage.setItem("user", JSON.stringify(userData));
                set({ user: userData, token });
            },

            logout: () => {
                localStorage.removeItem("user");
                set({ user: null, token: null });
            },
        }),
        {
            name: "auth-storage",
            getStorage: () => localStorage, // Stocke `user` mais pas `token` (car il est dans les cookies)
        }
    )
);
