import React, { useState } from 'react';
import { format } from 'date-fns';
import { Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToastContainer, toast } from 'react-toastify';
import GradeEditor from './GradeEditor';

const ExamSubmissions = ({
                             exam,
                             onViewSubmission,
                             onViewModelAnswer,
                             editingSubmission,
                             setEditingSubmission
                         }) => {
    const [newGrade, setNewGrade] = useState('');

    // Gérer la sauvegarde d'une note modifiée
    const handleSaveGrade = (submissionId) => {
        if (newGrade && !isNaN(Number(newGrade))) {
            // Dans une vraie app, mise à jour via l'API
            toast.success('Note mise à jour avec succès');
            setEditingSubmission(null);
            setNewGrade('');
        } else {
            toast.error('Veuillez entrer une note valide');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            {exam.submissions.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 flex justify-center">
                        <p className="text-muted-foreground">Aucune soumission pour cet examen.</p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Soumissions des étudiants</CardTitle>
                        <CardDescription>
                            {exam.submissionsCount} soumissions sur {exam.totalStudents} étudiants
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                                Cliquez sur "Voir la copie" pour consulter la soumission d'un étudiant
                            </p>
                            <Button
                                variant="outline"
                                onClick={onViewModelAnswer}
                            >
                                <BookOpen className="mr-2 h-4 w-4" />
                                Voir la correction modèle
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Étudiant</TableHead>
                                    <TableHead>Date de soumission</TableHead>
                                    <TableHead className="text-center">Note</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exam.submissions.map((submission) => (
                                    <TableRow key={submission.id}>
                                        <TableCell>{submission.studentName}</TableCell>
                                        <TableCell>
                                            {format(submission.submittedAt, 'dd/MM/yyyy')}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {editingSubmission === submission.id ? (
                                                <GradeEditor
                                                    initialGrade={submission.grade.toString()}
                                                    onSave={(grade) => {
                                                        setNewGrade(grade);
                                                        handleSaveGrade(submission.id);
                                                    }}
                                                    onCancel={() => setEditingSubmission(null)}
                                                />
                                            ) : (
                                                <span>{submission.grade}/20</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {editingSubmission === submission.id ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditingSubmission(null)}
                                                    >
                                                        Annuler
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleSaveGrade(submission.id)}
                                                    >
                                                        Enregistrer
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setEditingSubmission(submission.id);
                                                            setNewGrade(submission.grade.toString());
                                                        }}
                                                    >
                                                        Modifier la note
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => onViewSubmission(submission.id)}
                                                    >
                                                        <Eye className="mr-1 h-4 w-4" />
                                                        Voir la copie
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default ExamSubmissions;