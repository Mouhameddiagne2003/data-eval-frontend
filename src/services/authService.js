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

export const logout = async () => {
    try {
        const response = await api.get("/auth/logout");
        if (response) {
            localStorage.removeItem("user");
            window.location.href = "/login"; // Redirection après déconnexion
        }
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }

};

export const registerUser = async (userData) => {
    try {
        const response = await api.post(`/auth/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Une erreur est survenue lors de l\'inscription' };
    }
};
