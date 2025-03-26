import { create } from "zustand";
import { persist } from "zustand/middleware";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            firstSessionRole: null,

            login: (userData, token) => {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken?.role;

                // Si pas de session active, définir la première
                if (!get().firstSessionRole) {
                    set({
                        user: userData,
                        token,
                        firstSessionRole: userRole
                    });
                    return true;
                }

                // Si même utilisateur, mettre à jour
                if (get().user?.id === userData.id) {
                    set({ user: userData, token });
                    return true;
                }

                // Session différente
                return false;
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    firstSessionRole: null
                });
            }
        }),
        {
            name: "auth-storage"
        }
    )
);

// Fonction de gestion de connexion
export const handleLoginAttempt = (userData, token, navigate) => {
    const { login, firstSessionRole } = useAuthStore.getState();
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken?.role;

    const canProceed = login(userData, token);

    if (!canProceed) {
        if (firstSessionRole) {
            navigate(`/${firstSessionRole}`);
            return false;
        }
    }

    navigate(`/${userRole}`);
    return true;
};