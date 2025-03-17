import api from "./api";


const examService = {
    /**
     * Crée un nouvel examen avec des détails, des élèves et éventuellement un fichier joint
     * @param {Object} examData - Les données de l'examen
     * @returns {Promise} - La promesse de la requête API
     */
    createExam: async (examData) => {

        // Créer FormData pour l'envoi de fichiers
        const formData = new FormData();

        // Ajouter les champs de base
        formData.append('title', examData.title);
        formData.append('content', examData.content);
        formData.append('gradingCriteria', examData.gradingCriteria);
        // formData.append('format', examData.format);
        console.log("HELLO");
        formData.append('deadline', examData.deadline);
        console.log("HELLO");

        // Ajouter les élèves
        if (examData.students && examData.students.length > 0) {
            // Convertir la liste des élèves en JSON et l'envoyer comme une chaîne
            // Note: Certains backends préfèrent cette approche plutôt que plusieurs champs
            formData.append('students', JSON.stringify(examData.students));

            // Alternative: Si l'API attend des champs individuels pour chaque élève
            // examData.students.forEach((student, index) => {
            //   formData.append(`students[${index}][email]`, student.email);
            //   formData.append(`students[${index}][prenom]`, student.prenom);
            //   formData.append(`students[${index}][nom]`, student.nom);
            //   formData.append(`students[${index}][role]`, 'student');
            //   formData.append(`students[${index}][status]`, 'active');
            // });
        }

        // Ajouter le fichier s'il existe
        if (examData.file) {
            formData.append('file', examData.file);
        }

        console.log("🚀 Appel de createExam avec :", formData);

        try {
            const response = await api.post('/exam/', formData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'examen:', error);
            throw error;
        }
    },

    /**
     * Récupère tous les examens d'un professeur
     * @returns {Promise} - La promesse de la requête API
     */
    // getProfessorExams: async () => {
    //     try {
    //         const response = await apiClient.get('/exams/professor');
    //         return response.data;
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des examens:', error);
    //         throw error;
    //     }
    // },
    //
    // /**
    //  * Récupère les détails d'un examen spécifique
    //  * @param {string} examId - L'identifiant de l'examen
    //  * @returns {Promise} - La promesse de la requête API
    //  */
    // getExamById: async (examId) => {
    //     try {
    //         const response = await apiClient.get(`/exams/${examId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Erreur lors de la récupération de l'examen ${examId}:`, error);
    //         throw error;
    //     }
    // },
    //
    // /**
    //  * Met à jour un examen existant
    //  * @param {string} examId - L'identifiant de l'examen
    //  * @param {Object} examData - Les données mises à jour
    //  * @returns {Promise} - La promesse de la requête API
    //  */
    // updateExam: async (examId, examData) => {
    //     const formData = new FormData();
    //
    //     // Ajouter les champs à mettre à jour
    //     if (examData.title) formData.append('title', examData.title);
    //     if (examData.content) formData.append('content', examData.content);
    //     if (examData.gradingCriteria) formData.append('gradingCriteria', examData.gradingCriteria);
    //     if (examData.deadline) formData.append('deadline', examData.deadline.toISOString());
    //
    //     // Ajouter les élèves si présents
    //     if (examData.students) {
    //         formData.append('students', JSON.stringify(examData.students));
    //     }
    //
    //     // Ajouter le fichier s'il existe
    //     if (examData.file) {
    //         formData.append('file', examData.file);
    //     }
    //
    //     try {
    //         const response = await apiClient.put(`/exams/${examId}`, formData);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Erreur lors de la mise à jour de l'examen ${examId}:`, error);
    //         throw error;
    //     }
    // },
    //
    // /**
    //  * Supprime un examen
    //  * @param {string} examId - L'identifiant de l'examen
    //  * @returns {Promise} - La promesse de la requête API
    //  */
    // deleteExam: async (examId) => {
    //     try {
    //         const response = await apiClient.delete(`/exams/${examId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error(`Erreur lors de la suppression de l'examen ${examId}:`, error);
    //         throw error;
    //     }
    // }
};

export default examService;