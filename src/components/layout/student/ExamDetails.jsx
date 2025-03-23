import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExamDetails({ exam, onBack }) {
    // If no exam is provided, use mock data for display
    const examData = exam ;

    // 📥 Télécharger un fichier (soumission ou version corrigée)
    const handleDownload = (fileUrl, title) => {
        if (!fileUrl) {
            toast.error("Fichier non disponible.");
            return;
        }
        toast.success(`Téléchargement de ${title} en cours...`);
        window.open(fileUrl, "_blank");
    };

    // 🕒 Formatage de la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <ToastContainer position="top-right" autoClose={5000} />

            <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center text-data-blue hover:text-data-light-blue hover:bg-blue-50 mb-4"
            >
                <ArrowLeft className="h-5 w-5 mr-1" /> Retour
            </Button>

            <Card className="border border-border-light bg-bg-light shadow-sm">
                <CardHeader>
                    <CardTitle className="text-data-blue">{examData.title}</CardTitle>
                    <CardDescription className="text-data-light-blue">
                        {examData.examPeriod}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Description section */}
                    <div>
                        <h3 className="text-lg font-medium">Description du sujet</h3>
                        <p className="text-zinc-600">{examData.content}</p>
                    </div>

                    {/* Instructions section */}
                    <div>
                        <h3 className="text-lg font-medium">Instructions</h3>
                        <p className="text-zinc-600 mb-4">
                            Vous avez déjà soumis votre réponse pour cet examen. Vous pouvez consulter les détails ci-dessous.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => handleDownload(examData.examUrl, "Sujet d'examen")}
                            className="border-data-blue text-data-blue hover:bg-data-light-blue/10"
                        >
                            <Download className="h-4 w-4 mr-1" /> Télécharger le sujet
                        </Button>
                    </div>

                    {/* Submission information */}
                    <Card className="border border-border-light bg-bg-light/50">
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-medium mb-4">Informations de soumission</h3>

                            <div className="space-y-3">
                                <p><span className="font-medium">Date de soumission:</span> {formatDate(examData.submissionDate)}</p>
                                <p>
                                    <span className="font-medium">Statut:</span>{" "}
                                    {
                                        examData.status === "completed" ? <Badge className="bg-yellow-500 text-white">En correction</Badge> : <Badge className="bg-green-500 text-white">Corrigé</Badge>
                                    }

                                </p>
                                {examData.status === "graded" && (
                                    <>
                                        <p><span className="font-medium">Note:</span> {examData.grade}/20</p>
                                        <p><span className="font-medium">Feedback:</span> {examData.feedback}</p>
                                    </>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-2 pt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => handleDownload(examData.submissionUrl, "Ma réponse")}
                                    className="border-data-blue text-data-blue hover:bg-data-light-blue/10"
                                >
                                    <Download className="h-4 w-4 mr-1" /> Ma réponse
                                </Button>

                                {examData.status === "graded" && examData.annotatedUrl && (
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDownload(examData.annotatedUrl, "Version annotée")}
                                        className="border-green-500 text-green-500 hover:bg-green-50"
                                    >
                                        <Download className="h-4 w-4 mr-1" /> Version annotée
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}