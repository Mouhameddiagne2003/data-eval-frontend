import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus, Save, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import StudentsList from "@/components/layout/StudentsList"
import AddStudentForm from "@/components/layout/AddStudentForm.jsx"
import FileUploadSection from "@/components/layout/FileUploadSection.jsx"
import DeadlineField from "@/components/layout/DeadlineField.jsx"


import { examFormSchema } from "@/utils/validation";
import examService from "@/services/examService.js";

function CreateExam() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [csvFile, setCsvFile] = useState(null);

    // Initialize form with default values
    const form = useForm({
        resolver: zodResolver(examFormSchema),
        defaultValues: {
            title: "",
            content: "",
            gradingCriteria: "",
            deadline: new Date(), // Default: 1 week from now
            students: [],
        },
    });

    // // Form submission handler
    // const onSubmit = async (data) => {
    //     setIsSubmitting(true);
    //
    //     try {
    //         // Create FormData for file upload
    //         const formData = new FormData();
    //         formData.append('title', data.title);
    //         formData.append('content', data.content);
    //         formData.append('gradingCriteria', data.gradingCriteria);
    //         console.log("Deadline received:", data.deadline);
    //         console.log("Deadline Type:", typeof data.deadline, data.deadline);
    //         if (!data.deadline) {
    //             console.error("🚨 Erreur : deadline est undefined !");
    //             return toast.error("Erreur : la date limite est manquante !");
    //         }
    //
    //         if (!(data.deadline instanceof Date)) {
    //             console.error("🚨 Erreur : deadline n'est pas une Date valide !");
    //             return toast.error("Erreur : la date limite n'est pas valide !");
    //         }
    //
    //         console.log("✅ Deadline finale :", data.deadline);
    //         console.log("📤 Envoi de deadline :", formData.get("deadline"));
    //
    //         formData.append("deadline", new Date(data.deadline).toISOString());
    //         console.log("📤 Après ajout dans FormData :", formData.get("deadline"));
    //
    //         // Add students data
    //         data.students.forEach((student, index) => {
    //             formData.append(`students[${index}][email]`, student.email);
    //             formData.append(`students[${index}][prenom]`, student.prenom);
    //             formData.append(`students[${index}][nom]`, student.nom);
    //             formData.append(`students[${index}][role]`, 'student');
    //             formData.append(`students[${index}][status]`, 'active');
    //         });
    //
    //         if (selectedFile) {
    //             formData.append('file', selectedFile);
    //         }
    //
    //         // Appeler le service API
    //         console.log("🚀 Envoi de la requête API...");
    //         const result = await examService.createExam(formData);
    //         console.log("✅ Réponse reçue :", result);
    //
    //         toast.success(`L'examen "${data.title}" a été créé avec succès avec ${data.students.length} élèves.`);
    //
    //         // Pour démo: simuler un appel API
    //         await new Promise(resolve => setTimeout(resolve, 1500));
    //
    //
    //         // Redirect back to professor dashboard
    //          navigate('/professor');
    //
    //     } catch (error) {
    //         console.error('Error creating exam:', error);
    //         toast.error("Échec de la création de l'examen. Veuillez réessayer.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const payload = {
                title: data.title,
                content: data.content,
                gradingCriteria: data.gradingCriteria,
                deadline: new Date(data.deadline).toISOString(),
                students: data.students,
                //format: selectedFile ? selectedFile.type : null, // Ajouter le format du fichier

            };

            if (selectedFile) {
                payload.file = selectedFile; // Si vous devez envoyer un fichier, utilisez FormData
            }

            console.log("🚀 Envoi de la requête API...");
            const result = await examService.createExam(payload);
            console.log("✅ Réponse reçue :", result);

            toast.success(`L'examen "${data.title}" a été créé avec succès avec ${data.students.length} élèves.`);
            navigate('/professor');
        } catch (error) {
            console.error('Error creating exam:', error);
            toast.error("Échec de la création de l'examen. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add a student manually
    const addStudent = (student) => {
        const currentStudents = form.getValues().students || [];

        // Check if email already exists
        if (currentStudents.some(s => s.email === student.email)) {
            toast.error("Un élève avec cette adresse email existe déjà dans la liste.");
            return;
        }

        form.setValue('students', [...currentStudents, { ...student }]);
    };

    // Remove a student
    const removeStudent = (index) => {
        const currentStudents = form.getValues().students || [];
        const updatedStudents = [...currentStudents];
        updatedStudents.splice(index, 1);
        form.setValue('students', updatedStudents);
    };

    // Parse CSV file and add students
    const parseCSV = async (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            const lines = content.split('\n');

            // Skip header if exists
            const startIndex = lines[0].toLowerCase().includes('email') ? 1 : 0;

            const newStudents = [];

            for (let i = startIndex; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                const fields = line.split(',');

                if (fields.length >= 3) {
                    const email = fields[0].trim();
                    const prenom = fields[1].trim();
                    const nom = fields[2].trim();

                    if (email && prenom && nom) {
                        newStudents.push({ email, prenom, nom });
                    }
                }
            }

            if (newStudents.length === 0) {
                toast.error("Aucun élève valide trouvé dans le fichier CSV. Le format doit être: email,prenom,nom");
                return;
            }

            // Add new students to form
            const currentStudents = form.getValues().students || [];
            form.setValue('students', [...currentStudents, ...newStudents]);

            toast.success(`${newStudents.length} élèves ont été importés avec succès.`);
        };

        reader.readAsText(file);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <ToastContainer position="top-right" autoClose={5000} />
            <Card className="bg-card border-border-light dark:border-border-dark">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-data-teal">
                        <FilePlus className="h-6 w-6" /> Créer un Nouvel Examen
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title field */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 md:col-span-2">
                                            <FormLabel>Titre de l'examen</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Entrez le titre de l'examen" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Content/Description field */}
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 md:col-span-2">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Entrez une description détaillée de l'examen"
                                                    className="min-h-32"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Grading Criteria field */}
                                <FormField
                                    control={form.control}
                                    name="gradingCriteria"
                                    render={({ field }) => (
                                        <FormItem className="col-span-1 md:col-span-2">
                                            <FormLabel>Critères d'évaluation</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Entrez les critères d'évaluation, détails du barème, etc."
                                                    className="min-h-32"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* File Upload */}
                                <FileUploadSection
                                    onFileUpload={setSelectedFile}
                                />

                                {/* Deadline field */}
                                <FormField
                                    control={form.control}
                                    name="deadline"
                                    render={({ field }) => (
                                        <DeadlineField field={field} />
                                    )}
                                />
                            </div>

                            {/* Students Management Section */}
                            <Card className="border border-border-light dark:border-border-dark">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <User className="h-5 w-5" /> Gestion des Élèves
                                    </CardTitle>
                                    <CardDescription>
                                        Ajoutez des élèves manuellement ou importez-les à partir d'un fichier CSV
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Add Student Form */}
                                        <AddStudentForm onAddStudent={addStudent} />

                                        {/* Students List */}
                                        <FormField
                                            control={form.control}
                                            name="students"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mt-4">
                                                        <div className="flex justify-between mb-2">
                                                            <FormLabel>Liste des élèves</FormLabel>
                                                            <span className="text-sm text-muted-foreground">
                                {form.getValues().students?.length || 0} élèves
                              </span>
                                                        </div>

                                                        <StudentsList
                                                            students={form.getValues().students || []}
                                                            onRemoveStudent={removeStudent}
                                                        />
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit button */}
                            <div className="flex justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/professor')}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-data-teal hover:bg-data-teal/90"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Enregistrement...
                    </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Créer l'examen
                    </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateExam;