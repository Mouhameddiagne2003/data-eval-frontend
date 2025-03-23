"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import socket  from "@/config/socket.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Download, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import submissionService from "@/services/submissionService";
import ExamDetails from "@/components/layout/student/ExamDetails.jsx"; // Import the ExamDetails component

const ExamResults = () => {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    // 🔥 Charger les résultats de l'étudiant depuis l'API
    useEffect(() => {
        async function fetchSubmittedExams() {
            setIsLoading(true);
            try {
                const fetchedExams = await submissionService.getSubmittedExams();
                setExams(fetchedExams);
                setSubmissions(fetchedExams.map(e => ({
                    submissionId: e.submissionId,
                    examId: e.examId,
                    status: e.status
                })));
            } catch (error) {
                console.error("❌ Erreur récupération résultats :", error);
                toast.error("Impossible de charger les résultats.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchSubmittedExams();

        // ✅ Écoute les mises à jour des soumissions en temps réel
        socket.on("submissionUpdated", ({ submissionId, status }) => {
            setSubmissions(prevSubmissions => {
                const updatedSubmissions = prevSubmissions.map(sub =>
                    sub.submissionId === submissionId ? { ...sub, status } : sub
                );

                // ✅ Mettre à jour `exams` après modification de `submissions`
                setExams(prevExams =>
                    prevExams.map(exam => {
                        const matchingSubmission = updatedSubmissions.find(sub => sub.examId === exam.id);
                        return matchingSubmission ? { ...exam, status: matchingSubmission.status } : exam;
                    })
                );

                return updatedSubmissions;
            });
        });

        return () => {
            socket.off("submissionUpdated");
        };


    }, []);

    // 📥 Télécharger un fichier (soumission ou version corrigée)
    // const handleDownload = (fileUrl, title) => {
    //     if (!fileUrl) {
    //         toast.error("Fichier non disponible.");
    //         return;
    //     }
    //     toast.success(`Téléchargement de ${title} en cours...`);
    //     window.open(fileUrl, "_blank");
    // };

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

    // 🏷️ Définition des statuts des examens
    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-yellow-500 text-white">En correction</Badge>;
            case "graded":
                return <Badge className="bg-green-500 text-white">Corrigé</Badge>;
            case "rejected":
                return <Badge className="bg-red-500 text-white">Rejeté</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white">Inconnu</Badge>;
        }
    };

    // 🏷️ Icônes pour le statut
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <Clock className="h-5 w-5 text-data-light-blue" />;
            case "correction":
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case "graded":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "rejected":
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            default:
                return <FileText className="h-5 w-5 text-gray-500" />;
        }
    };

    // Handle back button from exam details
    const handleBackToList = () => {
        setSelectedExam(null);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <ToastContainer position="top-right" autoClose={5000} />

            {selectedExam ? (
                // Use the ExamDetails component for viewing exam details
                <ExamDetails exam={selectedExam} onBack={handleBackToList} />
            ) : (
                // 📋 Liste des résultats
                <>
                    <h1 className="text-2xl font-bold text-data-blue mb-6">📊 Mes résultats</h1>

                    {isLoading ? (
                        <p className="text-center">Chargement des résultats...</p>
                    ) : exams.length > 0 ? (
                        <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-4">
                            {exams.map((exam) => (
                                <Card
                                    key={exam.id}
                                    className="border border-border-light bg-bg-light hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => setSelectedExam(exam)}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-data-blue">{exam.title}</CardTitle>
                                            {getStatusBadge(exam.status)}
                                        </div>
                                        <CardDescription>
                                            Soumis le {formatDate(exam.submissionDate)}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-600 text-center max-w-md mx-auto">
                            Aucun résultat disponible pour l'instant.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default ExamResults;