import React, { useState } from 'react';
import { format } from 'date-fns';
import { FileText, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import PDFViewer from './PDFViewer';
import ExamSubmissions from './ExamSubmissions';
import ExamStatistics from './ExamStatistics';

const ExamDetails = ({ exam, open, onOpenChange }) => {
    const [detailTab, setDetailTab] = useState('details');
    const [examPreviewOpen, setExamPreviewOpen] = useState(false);
    const [modelAnswerPreviewOpen, setModelAnswerPreviewOpen] = useState(false);
    const [viewingSubmission, setViewingSubmission] = useState(null);
    const [editingSubmission, setEditingSubmission] = useState(null);

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{exam.name}</DialogTitle>
                        <DialogDescription>
                            Créé le {format(exam.createdAt, 'dd/MM/yyyy')} |
                            {exam.status === 'active' && <Badge variant="success" className="ml-2">En cours</Badge>}
                            {exam.status === 'ended' && <Badge variant="secondary" className="ml-2">Terminé</Badge>}
                            {exam.status === 'pending' && <Badge variant="outline" className="ml-2">En attente</Badge>}
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs value={detailTab} onValueChange={setDetailTab} className="mt-4">
                        <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="details">Détails</TabsTrigger>
                            <TabsTrigger value="submissions">Soumissions</TabsTrigger>
                            <TabsTrigger value="stats">Statistiques</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4">
                            <Card className="bg-white">
                                <CardHeader>
                                    <CardTitle className="text-lg">Sujet de l'examen</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{exam.subject}</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => setExamPreviewOpen(true)}
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        Prévisualiser le sujet complet
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="bg-white">
                                <CardHeader>
                                    <CardTitle className="text-lg">Barème</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{exam.scoringSystem}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="submissions">
                            <ExamSubmissions
                                exam={exam}
                                onViewSubmission={setViewingSubmission}
                                onViewModelAnswer={() => setModelAnswerPreviewOpen(true)}
                                editingSubmission={editingSubmission}
                                setEditingSubmission={setEditingSubmission}
                            />
                        </TabsContent>

                        <TabsContent value="stats">
                            <ExamStatistics exam={exam} />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

            {/* PDF Viewer pour le sujet d'examen */}
            {examPreviewOpen && (
                <Dialog open={examPreviewOpen} onOpenChange={setExamPreviewOpen}>
                    <DialogContent className="max-w-4xl p-0 bg-white">
                        <PDFViewer
                            title={`Sujet de l'examen : ${exam.name}`}
                            pdfUrl={exam.subjectContent} // Dans une vraie app, ce serait l'URL du PDF
                            allowDownload={true}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* PDF Viewer pour la correction modèle */}
            {modelAnswerPreviewOpen && (
                <Dialog open={modelAnswerPreviewOpen} onOpenChange={setModelAnswerPreviewOpen}>
                    <DialogContent className="max-w-4xl p-0 bg-white">
                        <PDFViewer
                            title={`Correction modèle : ${exam.name}`}
                            pdfUrl={exam.modelAnswerContent} // Dans une vraie app, ce serait l'URL du PDF
                            allowDownload={true}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* PDF Viewer pour la soumission d'étudiant */}
            {viewingSubmission && (
                <Dialog
                    open={Boolean(viewingSubmission)}
                    onOpenChange={(open) => !open && setViewingSubmission(null)}
                >
                    <DialogContent className="max-w-4xl p-0 bg-white">
                        <PDFViewer
                            title={`Copie de ${exam.submissions.find(s => s.id === viewingSubmission)?.studentName} - Note: ${exam.submissions.find(s => s.id === viewingSubmission)?.grade}/20`}
                            pdfUrl={exam.submissions.find(s => s.id === viewingSubmission)?.content} // Dans une vraie app, ce serait l'URL du PDF
                            allowDownload={true}
                        />
                        <div className="p-4 border-t flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setViewingSubmission(null)}
                            >
                                Fermer
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditingSubmission(viewingSubmission);
                                    setViewingSubmission(null);
                                }}
                            >
                                Modifier la note
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default ExamDetails;