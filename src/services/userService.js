// userService.js
import api from "./api";

const userService = {
    /**
     * Récupère les détails de l'utilisateur courant (connecté)
     * @returns {Promise} - La promesse de la requête API
     */
    getCurrentUser: async () => {
        try {
            // Récupérer l'utilisateur depuis le localStorage (stocké sous forme de chaîne JSON)
            const userJson = localStorage.getItem('user');

            if (!userJson) {
                throw new Error("Utilisateur non connecté");
            }
            // Parser la chaîne JSON en objet
            const user = JSON.parse(userJson);

            if (!user || !user.id) {
                throw new Error("Données utilisateur invalides");
            }

            // Utiliser l'ID pour récupérer les détails de l'utilisateur
            return await userService.getUserById(user.id);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur courant:", error);
            throw error;
        }
    },

    /**
     * Récupère les détails d'un utilisateur par son ID
     * @param {string} userId - L'ID de l'utilisateur à récupérer
     * @returns {Promise} - La promesse de la requête API
     */
    getUserById: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur (ID: ${userId}):`, error);
            throw error;
        }
    },

    /**
     * Récupère les examens associés à l'étudiant courant
     * @returns {Promise} - La promesse de la requête API
     */
    getExamsByStudent: async () => {
        try {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                throw new Error("Utilisateur non connecté");
            }

            const response = await api.get(`/exams/student/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des examens de l'étudiant:", error);
            throw error;
        }
    }
};

export default userService;