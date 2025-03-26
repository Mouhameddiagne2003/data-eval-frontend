import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus, Save, User, X, Plus, Loader2, CheckCircle, FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import StudentsList from "@/components/layout/StudentsList";
import AddStudentForm from "@/components/layout/AddStudentForm.jsx";
import FileUploadSection from "@/components/layout/FileUploadSection.jsx";
import DeadlineField from "@/components/layout/DeadlineField.jsx";


import { examFormSchema } from "@/utils/validation";
import examService from "@/services/examService.js";
import socket  from "@/config/socket.js";
import {useAuthStore } from "@/store/auth";

function CreateExam() {
    const [fileFormat, setFileFormat] = useState("text/plain"); // Default file format

    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});
    const [csvFile, setCsvFile] = useState(null);
    // Add state for view management
    const [viewState, setViewState] = useState("CREATE"); // CREATE, LOADING, CORRECTION
    const [createdExamData, setCreatedExamData] = useState(null);
    const [modelCorrection, setModelCorrection] = useState("");
    const { user } = useAuthStore();

    // Listen for correction updates via WebSocket
    useEffect(() => {
        if (!socket || !createdExamData) return;

        const userId = user.id; // Implement this function to get the logged-in user ID


        // Listen for the correction pending event
        socket.on(`correctionPending:${userId}`, (data) => {
            let correction = data.correction.replace(/###/g, '')
                .replace(/\*\*/g, '')
                .replace(/```json|```/g, '')
                .trim();
            if (data.examId === createdExamData.exam.id) {
                setModelCorrection(correction);
                setViewState("CORRECTION");
                setIsSubmitting(false);
            }
        })

        return () => {
            socket.off(`correctionPending:${userId}`);
        };
    }, [socket, createdExamData]);


    // Initialize form with default values
    const form = useForm({
        resolver: zodResolver(examFormSchema),
        defaultValues: {
            title: "",
            content: "",
            gradingCriteria: "",
            deadline: new Date(), // Default: 1 week from now
            students: [],
            format: "pdf",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setViewState("LOADING");  // Switch to loading view

        try {
            const payload = {
                title: data.title,
                content: data.content,
                gradingCriteria: data.gradingCriteria,
                deadline: new Date(data.deadline).toISOString(),
                students: data.students,
            };
            console.log(selectedFile)
            if (selectedFile) {
                payload.file = selectedFile;
                payload.format = fileFormat;
            }
            const result = await examService.createExam(payload);

            // Store created exam data for correction view
            setCreatedExamData({
                ...result,
                deadline: result.exam.deadline
            });

        } catch (error) {
            console.error('Error creating exam:', error);
            toast.error("Échec de la création de l'examen. Veuillez réessayer.");
            setViewState("CREATE");  // Return to create view on error
            setIsSubmitting(false);
        }
    };

    // Detect file format based on file extension
    const detectFileFormat = (file) => {
        if (!file) return "pdf"; // Default

        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.pdf')) return "application/pdf";
        if (fileName.endsWith('.txt')) return "plain/text";
        if (fileName.endsWith('.md')) return "markdown";
        if (fileName.endsWith('.tex')) return "latex";

        return "application/pdf"; // Default fallback
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const format = detectFileFormat(file);
            setFileFormat(format);
            form.setValue("format", format);
        }
    };

    // Save exam with correction
    // const saveExamWithCorrection = async () => {
    //     setIsSubmitting(true);
    //     try {
    //         // Update with the actual API call to update the correction
    //         await examService.updateExamCorrection(createdExamData.exam.id, {
    //             content: modelCorrection,
    //             status: "final" // Change from "draft" to "final"
    //         });
    //
    //         toast.success(`L'examen "${createdExamData.title}" a été finalisé avec succès.`);
    //         navigate('/professor');
    //     } catch (error) {
    //         console.error('Error finalizing exam:', error);
    //         toast.error("Échec de la finalisation de l'examen. Veuillez réessayer.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
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


    // Handle CSV file change
    const handleCsvFileChange = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
        if (file) {
            parseCSV(file);
        }
    };

    // Handle correction update
    const handleCorrectionUpdate = (value) => {
        setModelCorrection(value);
    };

    // Save exam with correction
    const saveExamWithCorrection = async () => {
        setIsSubmitting(true);
        try {
            // This would be your API call to save the correction
            await examService.createExamCorrection(createdExamData.exam.id, modelCorrection);

            toast.success(`L'examen "${createdExamData.exam.title}" a été finalisé avec succès.`);
            navigate('/professor');
        } catch (error) {
            console.error('Error finalizing exam:', error);
            toast.error("Échec de la finalisation de l'examen. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render function for create view
    const renderCreateView = () => (
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
                            <FormItem className={isMobile ? "col-span-1" : "col-span-1"}>
                                <FileUploadSection
                                     onFileUpload={setSelectedFile}
                                     forFormat={setFileFormat}
                                />
                                {/*<FormLabel>Fichier d'examen</FormLabel>*/}
                                {/*<div className="flex items-center gap-2">*/}
                                {/*    <Input*/}
                                {/*        type="file"*/}
                                {/*        accept=".pdf,.txt,.md,.tex"*/}
                                {/*        onChange={handleFileChange}*/}
                                {/*        className="flex h-10 bg-muted-light dark:bg-muted-dark"*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*<FormDescription>*/}
                                {/*    Téléchargez un fichier PDF, LaTeX, Markdown ou texte*/}
                                {/*</FormDescription>*/}
                            </FormItem>

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
                                    {/* CSV Import */}
                                    <div className="mb-4">
                                        <FormLabel className="block mb-2">Importer des élèves (CSV)</FormLabel>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Input
                                                type="file"
                                                accept=".csv"
                                                onChange={handleCsvFileChange}
                                                className="flex-1 h-10 bg-muted-light dark:bg-muted-dark"
                                            />
                                            {csvFile && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCsvFile(null)}
                                                    type="button"
                                                >
                                                    <X className="h-4 w-4 mr-1" /> Effacer
                                                </Button>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Format: email,prenom,nom
                                        </p>
                                    </div>

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
                                className="bg-data-teal hover:!bg-data-teal/90 cursor-pointer"
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
    );

    // Render function for loading view
    const renderLoadingView = () => (
        <Card className="bg-card border-border-light dark:border-border-dark">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-data-teal">
                    Génération de l'examen
                </CardTitle>
                <CardDescription>
                    Veuillez patienter pendant la création de l'examen et la génération de la correction modèle...
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8">
                <div className="flex flex-col items-center gap-6 w-full max-w-md">
                    <Loader2 className="h-16 w-16 text-data-teal animate-spin" />
                    <div className="space-y-4 w-full">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Création de l'examen</span>
                            </div>
                            <div className="flex items-center">
                                <Loader2 className="h-5 w-5 text-data-teal animate-spin mr-2" />
                                <span>Génération de la correction modèle avec DeepSeek AI</span>
                            </div>
                        </div>

                        <div className="space-y-2 mt-6">
                            <p className="text-sm text-muted-foreground text-center">
                                DeepSeek AI est en train de générer une correction modèle pour cet examen.
                                Cette opération peut prendre quelques minutes en fonction de la taille du document.
                            </p>
                        </div>

                        <div className="space-y-2 w-full mt-4">
                            <p className="text-sm font-medium">Traitement en cours...</p>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-data-teal h-2 rounded-full animate-pulse w-3/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Render function for correction view
    const renderCorrectionView = () => (
        <Card className="bg-card border-border-light dark:border-border-dark">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-data-teal">
                    <FileText className="h-6 w-6" /> Correction Modèle
                </CardTitle>
                <CardDescription>
                    Vérifiez et modifiez la correction modèle générée par l'IA avant de finaliser l'examen
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="border rounded-md p-4 bg-muted/20">
                        <h3 className="font-medium text-lg mb-2">{createdExamData?.exam.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Date limite:</p>
                                <p>{createdExamData?.exam.deadline ? format(createdExamData.deadline, "PPP") : ""}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="modelCorrection">Correction Modèle</Label>
                            <div className="text-sm text-muted-foreground">
                                Généré par IA
                            </div>
                        </div>
                        <Textarea
                            id="modelCorrection"
                            className="min-h-[400px] font-mono"
                            value={modelCorrection}
                            onChange={(e) => handleCorrectionUpdate(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                            Vous pouvez modifier cette correction modèle avant de finaliser l'examen
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
                <Button
                    variant="outline"
                    onClick={() => setViewState("CREATE")}
                >
                    Revenir à l'édition
                </Button>
                <Button
                    className="bg-data-teal hover:bg-data-teal/90"
                    onClick={saveExamWithCorrection}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Finalisation...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Finaliser l'examen
                        </span>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );

    // Render the appropriate view based on current state
    const renderView = () => {
        switch (viewState) {
            case "LOADING":
                return renderLoadingView();
            case "CORRECTION":
                return renderCorrectionView();
            case "CREATE":
            default:
                return renderCreateView();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <ToastContainer position="top-right" autoClose={5000} />
            {renderView()}
        </div>
    );
}

export default CreateExam;