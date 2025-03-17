import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });

        const { token, user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));

        return { user, token };
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirection après déconnexion
};
