import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExamFilters from '@/components/layout/professor/ExamFilters.jsx';
import ExamTable from '@/components/layout/professor/ExamTable.jsx';
import ExamDetails from '@/components/layout/professor/ExamDetails.jsx';
import examService from '../../services/examService.js';

const ProfessorExamsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedExam, setSelectedExam] = useState(null);
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [examSubmissions, setExamSubmissions] = useState({});

    // Fonction pour mettre à jour les soumissions des examens
    const handleSubmissionsLoaded = (submissions) => {
        setExamSubmissions(submissions);
    }

    // Fonction pour déterminer le statut d'un examen en fonction de ses soumissions
    const getExamStatus = (exam) => {

        // Sinon, on détermine le statut en fonction des soumissions
        const submissions = examSubmissions[exam.id];
        if (!submissions) {
            return "en attente";
        }

        const totalSubmissions = submissions.length;
        const completedSubmissions = submissions.filter(s => s.status === "graded").length;

        // Si aucune soumission n'est complétée => en attente
        if (completedSubmissions === 0) {
            return "en attente";
        }

        // Si toutes les soumissions sont complétées => terminé
        if (completedSubmissions === totalSubmissions) {
            return "terminé";
        }

        // Si certaines soumissions sont complétées mais pas toutes => en cours
        return "en cours";
    }

    // Fonction pour charger les examens
    const loadExams = async () => {
        setIsLoading(true);
        try {
            const data = await examService.fetchProfessorExams();
            setExams(data);
        } catch (error) {
            toast.error('Erreur lors du chargement des examens');
            console.error('Erreur de chargement:', error);
        } finally {
            setIsLoading(false);
        }
    };
    console.log("tetstt")
    console.log(exams)

    // Chargement initial des examens
    useEffect(() => {
        loadExams();
    }, []);

    console.log(exams)

    // Gestion de la suppression d'un examen
    const handleDeleteExam = async (examId) => {
        try {
            await examService.deleteExam(examId);
            toast.success('Examen supprimé avec succès');
            loadExams(); // Rechargement des examens après la suppression
        } catch (error) {
            toast.error('Erreur lors de la suppression de l\'examen');
            console.error('Erreur de suppression:', error);
        }
    };

    // Filtrage des examens selon le terme de recherche et le filtre de statut
    const filteredExams = exams.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
        const examStatus = getExamStatus(exam);
        const matchesStatus = statusFilter === 'all' || examStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Mes Examens</h1>
                <Button onClick={loadExams} variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Rafraîchir
                </Button>
            </div>

            <ExamFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <ExamTable
                exams={filteredExams}
                isLoading={isLoading}
                onDeleteExam={handleDeleteExam}
                onSelectExam={setSelectedExam}
                onResetFilter={() => setSearchTerm('')}
                onSubmissionsLoaded={handleSubmissionsLoaded}
            />

            {selectedExam && (
                <ExamDetails
                    exam={selectedExam}
                    open={Boolean(selectedExam)}
                    onOpenChange={(open) => !open && setSelectedExam(null)}
                />
            )}
        </div>
    );
};

export default ProfessorExamsPage;