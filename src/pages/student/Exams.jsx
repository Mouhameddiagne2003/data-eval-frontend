"use client";

import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase.js"; // Assure-toi d'importer ta config Firebas
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Download, Upload, ArrowLeft, FileText, CheckCircle, Hourglass, Clock, AlertCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import examService from "@/services/examService"; // API pour récupérer les examens
import userService from "@/services/userService";
import { jsPDF } from "jspdf";





const Exams = () => {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    // 🔥 Charger les examens disponibles depuis l'API
    useEffect(() => {
        async function fetchExamsAndUser() {
            setIsLoading(true);
            try {
                const userData = await userService.getCurrentUser();
                setUser(userData);

                const fetchedExams = await examService.getAvailableExams();
                setExams(fetchedExams);

            } catch (error) {
                console.error("❌ Erreur récupération examens :", error);
                toast.error("Impossible de charger les examens.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchExamsAndUser();
    }, []);

    // 📤 Gestion de la soumission
    const handleSubmit = async () => {
        if (!selectedFile) {
            toast.error("Veuillez sélectionner un fichier PDF.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("examId", selectedExam.id);
            formData.append("file", selectedFile);

            await examService.submitExam(formData); // 🔥 Envoi API

            toast.success("Votre réponse a été soumise avec succès !");
            setExams((prevExams) =>
                prevExams.map((exam) =>
                    exam.id === selectedExam.id ? { ...exam, status: "submitted" } : exam
                )
            );
            setSelectedFile(null);
            setSelectedExam(null);
        } catch (error) {
            console.error("❌ Erreur soumission :", error);
            toast.error("Échec de la soumission.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async (fileUrl, title) => {
        try {
            const result = await examService.downloadFile(fileUrl, title);
            toast.success(result.message);
        } catch (error) {
            toast.error("Échec du téléchargement.");
        }
    };

    // 🔄 Retour à la liste des examens
    const handleBack = () => {
        setSelectedExam(null);
        setSelectedFile(null);
    };

    // Formatage des dates
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

    // Badges pour le statut des examens
    const getStatusBadge = (status) => {
        switch (status) {
            case "available":
            case undefined:
                return <Badge className="bg-blue-500 text-white">À faire</Badge>;
            case "submitted":
                return <Badge className="bg-purple-500 hover:bg-purple-600">Terminé</Badge>;
            case "expired":
                return <Badge className="bg-gray-500 hover:bg-gray-600">Expiré</Badge>;
            case "correction":
                return <Badge className="bg-yellow-500 hover:bg-yellow-600">En correction</Badge>;
            case "graded":
                return <Badge className="bg-green-500 hover:bg-green-600">Corrigé</Badge>;
            case "rejected":
                return <Badge className="bg-red-500 hover:bg-red-600">Rejeté</Badge>;
            default:
                return <Badge>Inconnu</Badge>;
        }
    };

    // Icônes pour le statut des examens
    const getStatusIcon = (status) => {
        switch (status) {
            case "available":
            case undefined:
                return <FileText className="h-4 w-4" />;
            case "submitted":
                return <CheckCircle className="h-4 w-4" />;
            case "expired":
                return <AlertCircle className="h-4 w-4" />;
            case "correction":
                return <Clock className="h-4 w-4" />;
            case "graded":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "rejected":
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-data-blue mb-4"></div>
                <p className="text-data-blue font-medium">Chargement des examens...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <ToastContainer position="top-right" autoClose={5000} />

            {/* 📝 Page de détails d'un examen sélectionné */}
            {selectedExam ? (
                <div className="max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="flex items-center text-data-blue hover:text-data-light-blue hover:bg-blue-50 mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                    </Button>

                    <Card className="border border-border-light bg-bg-light shadow-sm">
                        <CardHeader className="flex flex-col md:!flex-row md:!justify-between md:!items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-data-blue">{selectedExam.title}</CardTitle>
                                    {getStatusBadge(selectedExam.status)}
                                </div>
                                <CardDescription className="text-zinc-600 mt-1">
                                    Disponible jusqu'au {selectedExam.deadline ? formatDate(selectedExam.deadline) : "N/A"}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-2">Description du sujet</h3>
                                <p className="text-zinc-600 mb-4">
                                    {selectedExam.content}
                                </p>
                                <h3 className="text-lg font-medium mb-2">Instructions</h3>
                                <p className="text-zinc-600">
                                    Veuillez télécharger le sujet ci-dessous, réaliser l'examen, puis soumettre votre réponse au format PDF.
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => handleDownload(selectedExam.fileUrl, selectedExam.title)}

                                className="border-data-blue text-data-blue hover:bg-data-light-blue/10 cursor-pointer flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Télécharger le sujet
                            </Button>

                            {/* 📤 Soumission de la réponse */}
                            <div className="space-y-4 border border-border-light rounded-md p-4 bg-white/50">
                                <h3 className="text-lg font-medium">Soumettre ma réponse</h3>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="pdfFile">Fichier PDF</Label>
                                    <Input
                                        id="pdfFile"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        className="flex h-10 w-full rounded-md border border-border-light bg-muted-light px-3 py-2 text-sm cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium"
                                    />
                                    {selectedFile && <p className="text-sm text-zinc-500">Fichier sélectionné: {selectedFile.name}</p>}
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="bg-data-teal hover:bg-data-blue text-white cursor-pointer flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    {isLoading ? "Envoi..." : "Confirmer le dépôt"}
                                </Button>
                            </div>

                            {selectedExam.status === "submitted" && (
                                <div className="border rounded-md p-4 space-y-4 bg-white/50">
                                    <h3 className="text-lg font-medium">Informations de soumission</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Date de soumission:</span> {formatDate(new Date().toISOString())}</p>
                                        <p><span className="font-medium">Statut:</span> En attente de correction</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                // 📋 Liste des examens disponibles
                <div className="p-6">
                    {user && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-8">
                            <h2 className="text-xl font-bold text-data-blue mb-2">
                                Bienvenue cher étudiant(e) {user.prenom} {user.nom} !
                            </h2>
                            <p className="text-zinc-700">
                                Voici la liste de vos examens disponibles. Cliquez sur "Commencer" pour voir les détails de l'examen et soumettre votre réponse.
                            </p>
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-data-blue mb-6">Examens disponibles</h1>
                    {
                        exams.length > 0 ? (
                            <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-4">
                                {exams.map((exam) => (
                                    <Card key={exam.id} className="border border-border-light bg-bg-light hover:shadow-md transition-shadow">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                            <div>
                                                <CardTitle className="text-data-blue flex items-center gap-2">
                                                    {getStatusIcon(exam.status)}
                                                    {exam.title}
                                                </CardTitle>
                                                <CardDescription className="text-zinc-600">
                                                    Disponible jusqu'au {exam.deadline ? formatDate(exam.deadline) : "N/A"}
                                                </CardDescription>
                                            </div>
                                            {getStatusBadge(exam.status)}
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <p className="text-zinc-600 line-clamp-3">{exam.content}</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between gap-3 pt-2">
                                            <Button
                                                onClick={() => setSelectedExam(exam)}
                                                className="bg-data-teal hover:!bg-data-blue text-white cursor-pointer flex-1"
                                            >
                                                {"Commencer"}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ): (
                            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="text-5xl mb-4">📚</div>
                                <h3 className="text-xl font-medium text-data-blue mb-2">Aucun examen disponible</h3>
                                <p className="text-zinc-600 text-center max-w-md">
                                    Vous n'avez actuellement pas d'examens disponibles. Les nouveaux examens apparaîtront ici dès qu'ils seront assignés.
                                </p>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default Exams;