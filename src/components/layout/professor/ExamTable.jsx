import {useEffect, useState} from "react"
import { Eye, Pencil, Trash2, CheckCircle2, Clock, Ban } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer, toast } from "react-toastify"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import submissionService from "../../../services/submissionService.js"

const ExamTable = ({ exams, isLoading, onDeleteExam, onSelectExam, onResetFilter, onSubmissionsLoaded }) => {
    const [examToDelete, setExamToDelete] = useState(null)
    const [examSubmissions, setExamSubmissions] = useState({})
    const [loadingSubmissions, setLoadingSubmissions] = useState({})

    // Fonction pour formater la date si nécessaire
    const formatDate = (dateString) => {
        // Si la date est déjà au format dd/MM/yyyy, on la retourne telle quelle
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
            return dateString
        }
        // Sinon, on essaie de la formater
        try {
            const date = new Date(dateString)
            return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
        } catch (e) {
            return dateString
        }
    }

    // Fonction pour obtenir le statut formaté en fonction des soumissions
    const getStatusBadge = (exam) => {
        // Sinon, on détermine le statut en fonction des soumissions
        const submissions = examSubmissions[exam.id];
        if (!submissions) {
            return (
                <Badge variant="outline" className="gap-1 border-[#d1e3ea] text-[#054257] bg-[#f5f8fa]">
                    <Clock className="h-3 w-3" />
                    En attente
                </Badge>
            );
        }

        const totalSubmissions = submissions.length;
        const completedSubmissions = submissions.filter(s => s.status === "graded").length;

        // Si aucune soumission n'est complétée => en attente
        if (completedSubmissions === 0) {
            return (
                <Badge variant="outline" className="gap-1 border-[#d1e3ea] text-[#054257] bg-[#f5f8fa]">
                    <Clock className="h-3 w-3" />
                    En attente
                </Badge>
            );
        }

        // Si toutes les soumissions sont complétées => terminé
        if (completedSubmissions === totalSubmissions) {
            return (
                <Badge className="gap-1 bg-[#0a6e8a] text-white hover:bg-[#0a6e8a]/90 border-none">
                    <Ban className="h-3 w-3" />
                    Terminé
                </Badge>
            );
        }

        // Si certaines soumissions sont complétées mais pas toutes => en cours
        return (
            <Badge className="gap-1 bg-green-500 text-white hover:bg-green-500/90 border-none">
                <CheckCircle2 className="h-3 w-3" />
                En cours
            </Badge>
        );
    }

    // Fonction pour confirmer la suppression
    const handleDeleteConfirm = () => {
        if (examToDelete) {
            onDeleteExam(examToDelete)
            setExamToDelete(null)
            toast.success("Examen supprimé avec succès")
        }
    }
    // Fonction pour charger les soumissions d'un examen
    const fetchExamSubmissions = async (examId) => {
        if (examSubmissions[examId]) return // Ne pas recharger si on a déjà les données

        setLoadingSubmissions(prev => ({ ...prev, [examId]: true }))
        try {
            const submissions = await submissionService.getExamSubmissions(examId)
            setExamSubmissions(prev => {
                const updated = { ...prev, [examId]: submissions };
                // Informer le composant parent de toutes les soumissions chargées
                if (onSubmissionsLoaded) {
                    onSubmissionsLoaded(updated);
                }
                return updated;
            })

        } catch (error) {
            console.error(`Erreur lors du chargement des soumissions pour l'examen ${examId}:`, error)
            toast.error("Erreur lors du chargement des soumissions")
        } finally {
            setLoadingSubmissions(prev => ({ ...prev, [examId]: false }))
        }
    }

    // Pré-charger les soumissions pour tous les examens au chargement initial
    useEffect(() => {
        if (!isLoading && exams.length > 0) {
            exams.forEach(exam => {
                fetchExamSubmissions(exam.id)
            })
        }
    }, [exams, isLoading])

    // Fonction pour afficher le nombre de soumissions
    const renderSubmissionsCount = (exam) => {
        const submissions = examSubmissions[exam.id]

        if (loadingSubmissions[exam.id]) {
            return <span className="text-[#054257]/70">Chargement...</span>
        }

        if (submissions) {
            const submittedCount = submissions.filter(s => s.status === "graded").length
            const totalCount = submissions.length
            return `${submittedCount}/${totalCount}`
        }

        return `0/0`
    }

    // Fonction pour sélectionner un examen avec ses soumissions
    const handleSelectExam = (exam) => {
        // Si on a déjà chargé les soumissions, on les inclut dans l'objet exam
        if (examSubmissions[exam.id]) {
            const examWithSubmissions = {
                ...exam,
                submissions: examSubmissions[exam.id]
            }
            onSelectExam(examWithSubmissions)
        } else {
            // Sinon on charge les soumissions puis on sélectionne l'examen
            setLoadingSubmissions(prev => ({ ...prev, [exam.id]: true }))
            submissionService.getExamSubmissions(exam.id)
                .then(submissions => {
                    setExamSubmissions(prev => ({ ...prev, [exam.id]: submissions }))
                    onSelectExam({
                        ...exam,
                        submissions
                    })
                })
                .catch(error => {
                    console.error(`Erreur lors du chargement des soumissions:`, error)
                    toast.error("Erreur lors du chargement des soumissions")
                    onSelectExam(exam) // On sélectionne l'examen quand même, sans les soumissions
                })
                .finally(() => {
                    setLoadingSubmissions(prev => ({ ...prev, [exam.id]: false }))
                })
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Boîte de dialogue de confirmation de suppression */}
            <AlertDialog open={examToDelete !== null} onOpenChange={(open) => !open && setExamToDelete(null)}>
                <AlertDialogContent className="bg-[#ffffff] border-[#d1e3ea]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#054257]">Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription className="text-[#054257]/70">
                            Êtes-vous sûr de vouloir supprimer cet examen ? Cette action ne peut pas être annulée.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-[#d1e3ea] text-[#054257] hover:bg-[#f5f8fa]">
                            Annuler
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-[#d93939] text-white hover:bg-[#d93939]/90">
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <p className="text-[#054257]/70">Chargement des examens...</p>
                </div>
            ) : exams.length === 0 ? (
                <Card className="border-[#d1e3ea] bg-[#ffffff]">
                    <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-[#054257]/70">Aucun examen trouvé.</p>
                        <Button
                            variant="outline"
                            className="mt-4 border-[#0a6e8a] text-[#0a6e8a] hover:bg-[#0a6e8a]/10"
                            onClick={onResetFilter}
                        >
                            Réinitialiser les filtres
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="border-collapse w-full">
                        <TableHeader>
                            <TableRow className="border-b border-[#d1e3ea]">
                                <TableHead className="text-[#054257] font-semibold">Examen</TableHead>
                                <TableHead className="hidden md:!table-cell text-[#054257] font-semibold">Date de création</TableHead>
                                <TableHead className="text-[#054257] font-semibold">Statut</TableHead>
                                <TableHead className="text-center text-[#054257] font-semibold">Soumissions</TableHead>
                                <TableHead className="text-right text-[#054257] font-semibold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {exams.map((exam) => (
                                <TableRow
                                    key={exam.id}
                                    className="cursor-pointer hover:bg-[#f5f8fa] border-b border-[#d1e3ea]"
                                    onClick={() => handleSelectExam(exam)}
                                >
                                    <TableCell className="font-medium text-[#0a6e8a]">{exam.title}</TableCell>
                                    <TableCell className="hidden md:!table-cell text-[#054257]">
                                        {formatDate(exam.createdAt)}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(exam)}</TableCell>
                                    <TableCell className="text-center text-[#054257]">
                                        {renderSubmissionsCount(exam)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                                            {/* Bouton de suppression - uniquement pour les examens terminés ou en attente */}
                                            {(exam.status === "terminé" || exam.status === "en attente") && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setExamToDelete(exam.id)
                                                    }}
                                                    title="Supprimer l'examen"
                                                    className="text-[#d93939] hover:bg-[#d93939]/10 hover:text-[#d93939]"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            )}

                                            {/* Bouton de visualisation - pour tous les examens */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleSelectExam(exam)
                                                }}
                                                title="Voir les détails"
                                                className="text-[#0a6e8a] hover:bg-[#0a6e8a]/10 hover:text-[#0a6e8a]"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </Button>

                                            {/* Bouton de modification - uniquement pour les examens en attente */}
                                            {exam.status === "en attente" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        toast.info("Redirection vers l'édition de l'examen")
                                                    }}
                                                    title="Modifier l'examen"
                                                    className="text-[#4ab7cd] hover:bg-[#4ab7cd]/10 hover:text-[#4ab7cd]"
                                                >
                                                    <Pencil className="h-5 w-5" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    )
}

export default ExamTable

