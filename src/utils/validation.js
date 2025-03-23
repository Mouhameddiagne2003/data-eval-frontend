// src/utils/validation.js
import { z } from "zod";

// Student schema
export const studentSchema = z.object({
    email: z.string().email({ message: "Adresse email invalide" }),
    prenom: z.string().min(1, { message: "Prénom requis" }),
    nom: z.string().min(1, { message: "Nom requis" }),
});

// Define schema for form validation
export const examFormSchema = z.object({
    title: z.string().min(3, { message: "Le titre doit contenir au moins 3 caractères" }),
    content: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
    gradingCriteria: z.string().min(5, { message: "Les critères d'évaluation doivent contenir au moins 5 caractères" }),
    deadline: z.date({
        required_error: "Veuillez sélectionner une date limite",
    }),
    students: z.array(studentSchema),
    file: z.any().optional(),
});