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

    getAvailableExams: async () => {
        try {
            const response = await api.get("/submission/assigned/"); // 🔥 Nouvelle route API
            return response.data; // Renvoie la liste des examens où l'étudiant a une soumission en attente
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des examens disponibles :", error);
            throw error;
        }
    },

    getExamById: async (examId) => {
        try {
            const response = await api.get(`/exam/${examId}`); // Route API backend
            return response.data;
        } catch (error) {
            console.error(`❌ Erreur récupération examen ${examId} :`, error);
            throw error;
        }
    },

    downloadFile: async (fileUrl, title) => {
        try {
            // Extraire le nom du fichier à partir de l'URL Firebase
            const fileName = decodeURIComponent(fileUrl)
                .split('/')
                .pop()
                .split('?')[0];

            // Faire la requête via l'instance API
            const response = await api.get(`/exam/download/${fileName}`, {
                responseType: 'blob', // Important pour récupérer le fichier comme un blob
            });

            // Créer une URL pour le blob
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            // Créer un élément <a> pour le téléchargement
            const a = document.createElement("a");
            a.href = url;

            // Utiliser le titre fourni ou le nom du fichier original
            // Conserver l'extension originale du fichier
            const extension = fileName.split('.').pop();
            const fileNameDownload = title ?
                `${title.replace(/\s+/g, "_")}.${extension}` :
                fileName;

            a.download = fileNameDownload;

            // Déclencher le téléchargement
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            return { success: true, message: "Téléchargement réussi !" };
        } catch (error) {
            console.error("❌ Erreur lors du téléchargement :", error);
            throw error;
        }
    }

};



export default examService;