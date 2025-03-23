import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FileText, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import PDFViewer from './PDFViewer';
import ExamSubmissions from './ExamSubmissions';
import ExamStatistics from './ExamStatistics';

// Hook personnalisé pour détecter la taille de l'écran
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Appel initial pour définir la taille correcte
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

const ExamDetails = ({ exam, open, onOpenChange }) => {
    const [detailTab, setDetailTab] = useState('details');
    const [examPreviewOpen, setExamPreviewOpen] = useState(false);
    const [modelAnswerPreviewOpen, setModelAnswerPreviewOpen] = useState(false);
    const [viewingSubmission, setViewingSubmission] = useState(null);
    const [editingSubmission, setEditingSubmission] = useState(null);
    const { width } = useWindowSize();

    // Détermine si l'écran est petit (mobile)
    const isMobile = width < 640;
    console.log(exam)

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-[70vw] bg-white max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-lg sm:text-xl text-center sm:text-left">{exam.title}</DialogTitle>
                        <DialogDescription className="text-sm text-center sm:text-left">
                            Créé le {format(exam.createdAt, 'dd/MM/yyyy')}
                            {/* Badges de statut conditionnels */}
                            {/*{exam.submissions && exam.submissions[0]?.status === 'active' &&
                                <Badge variant="success" className="ml-2">En cours</Badge>}
                            {exam.submissions && exam.submissions[0]?.status === 'graded' &&
                                <Badge variant="secondary" className="ml-2">Terminé</Badge>}
                            {exam.submissions && exam.submissions[0]?.status === 'pending' &&
                                <Badge variant="outline" className="ml-2">En attente</Badge>}*/}
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs value={detailTab} onValueChange={setDetailTab} className="mt-4 w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                            <TabsTrigger value="details" className="text-xs sm:text-sm">Détails</TabsTrigger>
                            <TabsTrigger value="submissions" className="text-xs sm:text-sm">Soumissions</TabsTrigger>
                            <TabsTrigger value="stats" className="text-xs sm:text-sm">Statistiques</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4">
                            <Card className="bg-white">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base sm:text-lg">Sujet de l'examen</CardTitle>
                                </CardHeader>
                                <CardContent className="max-h-[30vh] sm:max-h-[50vh] overflow-y-auto">
                                    <p className="text-sm sm:text-base">{exam.fileUrl}</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4 w-full sm:w-auto text-xs sm:text-sm"
                                        onClick={() => setExamPreviewOpen(true)}
                                    >
                                        <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        Prévisualiser le sujet complet
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="bg-white">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base sm:text-lg">Barème</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm sm:text-base">{exam.gradingCriteria}</p>
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
                                isMobile={isMobile}
                            />
                        </TabsContent>

                        <TabsContent value="stats">
                            <ExamStatistics exam={exam} isMobile={isMobile} />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

            {/* PDF Viewer pour le sujet d'examen */}
            {examPreviewOpen && (
                <Dialog open={examPreviewOpen} onOpenChange={setExamPreviewOpen}>
                    <DialogContent className="w-[95vw] max-w-4xl p-0 bg-white overflow-hidden">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle className="text-sm sm:!text-base">Sujet de l'examen : {exam.title}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-[70vh] overflow-hidden">
                            <PDFViewer
                                title={`Sujet de l'examen : ${exam.title}`}
                                fileUrl={exam.fileUrl}
                                allowDownload={true}
                                className="w-full h-full"
                            />
                        </div>
                        <DialogFooter className="p-3 border-t">
                            <Button
                                variant="outline"
                                size={isMobile ? "sm" : "default"}
                                onClick={() => setExamPreviewOpen(false)}
                            >
                                Fermer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* PDF Viewer pour la correction modèle */}
            {modelAnswerPreviewOpen && (
                <Dialog open={modelAnswerPreviewOpen} onOpenChange={setModelAnswerPreviewOpen}>
                    <DialogContent className="w-[95vw] max-w-4xl p-0 bg-white max-h-[90vh] overflow-hidden">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle className="text-sm sm:text-base">Correction modèle : {exam.title}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-[70vh] overflow-hidden">
                            <PDFViewer
                                title={`Correction modèle : ${exam.title}`}
                                fileUrl={exam.correction.content}
                                allowDownload={true}
                                className="w-full h-full"
                            />
                        </div>
                        <DialogFooter className="p-3 border-t">
                            <Button
                                variant="outline"
                                size={isMobile ? "sm" : "default"}
                                onClick={() => setModelAnswerPreviewOpen(false)}
                            >
                                Fermer
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* PDF Viewer pour la soumission d'étudiant */}
            {viewingSubmission && (
                <Dialog
                    open={Boolean(viewingSubmission)}
                    onOpenChange={(open) => !open && setViewingSubmission(null)}
                >
                    <DialogContent className="w-[95vw] max-w-4xl p-0 bg-white max-h-[90vh] overflow-hidden">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle className="text-sm sm:text-base break-words">
                                Copie de {exam.submissions.find(s => s.id === viewingSubmission)?.student.prenom} -
                                Note: {exam.submissions.find(s => s.id === viewingSubmission)?.grade.score}/20
                            </DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-[65vh] overflow-hidden">
                            <PDFViewer
                                title={`Copie de ${exam.submissions.find(s => s.id === viewingSubmission)?.student.prenom}`}
                                fileUrl={exam.submissions.find(s => s.id === viewingSubmission)?.content}
                                allowDownload={true}
                                className="w-full h-full"
                            />
                        </div>
                        <div className="p-3 border-t flex justify-end gap-2 flex-wrap sm:flex-nowrap">
                            <Button
                                variant="outline"
                                size={isMobile ? "sm" : "default"}
                                className="w-full sm:w-auto"
                                onClick={() => setViewingSubmission(null)}
                            >
                                Fermer
                            </Button>
                            <Button
                                size={isMobile ? "sm" : "default"}
                                className="w-full sm:w-auto"
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