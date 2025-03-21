import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExamFilters from './ExamFilters';
import ExamTable from './ExamTable';
import ExamDetails from './ExamDetails';
import { toast } from 'sonner';

// Le fetchExams devrait être dans un fichier services séparé en production
const fetchExams = async () => {
    // Dans une app réelle, appel à l'API
    // Retourne la structure de données d'examens
};

const ProfessorExamsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedExam, setSelectedExam] = useState(null);

    // Récupération des données d'examens
    const { data: exams = [], isLoading, refetch } = useQuery({
        queryKey: ['professorExams'],
        queryFn: fetchExams,
    });

    // Gestion du changement de statut d'un examen
    const handleStatusChange = (examId, newStatus) => {
        // Dans une vraie app, mise à jour du statut via l'API
        toast.success(`Statut de l'examen mis à jour: ${newStatus === 'active' ? 'Ouvert' : 'Fermé'}`);
    };

    // Gestion de la suppression d'un examen
    const handleDeleteExam = (examId) => {
        // Dans une vraie app, suppression via l'API
        toast.success('Examen supprimé avec succès');
    };

    // Filtrage des examens selon le terme de recherche et le filtre de statut
    const filteredExams = exams.filter(exam => {
        const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Mes Examens</h1>
                <Button onClick={() => refetch()} variant="outline" className="gap-2">
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
                onStatusChange={handleStatusChange}
                onDeleteExam={handleDeleteExam}
                onSelectExam={setSelectedExam}
                onResetFilter={() => setSearchTerm('')}
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