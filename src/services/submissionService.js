import api from "./api";

const submissionService = {
    // 📌 Récupérer les examens soumis (status: completed ou graded)
    getSubmittedExams: async () => {
        try {
            const response = await api.get("/submission/student-results");
            return response.data;
        } catch (error) {
            console.error("❌ Erreur récupération des résultats :", error);
            throw error;
        }
    },
    // New function to fetch all submissions for a specific exam
    getExamSubmissions: async (examId) => {
        try {
            const response = await api.get(`/submission/exam/${examId}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Erreur récupération des soumissions pour l'examen ${examId} :`, error);
            throw error;
        }
    }
};

export default submissionService;