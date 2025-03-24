import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Active l'envoi des cookies avec chaque requête
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur pour ajouter automatiquement le token à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized, logging out...");
            Cookies.remove("access_token");
            localStorage.removeItem("user");
            window.location.href = "/login"; // Redirection vers la connexion
        }
        return Promise.reject(error);
    }
);

export default api;
