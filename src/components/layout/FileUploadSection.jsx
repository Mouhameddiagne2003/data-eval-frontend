import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.js";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Loader2 } from "lucide-react"; // 🔥 Spinner ShadCN

function FileUploadSection({ onFileUpload, forFormat }) {
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    // Fonction pour détecter le format du fichier
    const detectFileFormat = (file) => {
        if (!file) return "application/pdf"; // Par défaut

        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.pdf')) return "application/pdf";
        if (fileName.endsWith('.txt')) return "text/plain";
        if (fileName.endsWith('.md')) return "markdown";
        if (fileName.endsWith('.tex')) return "latex";
        if (fileName.endsWith('.docx')) return "docx";

        return "application/pdf"; // Par défaut si non détecté
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0] || null;
        if (!file) return;

        setUploading(true); // 🔥 Active le spinner
        const format = detectFileFormat(file);
        const storageRef = ref(storage, `uploads/documents/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progression de l'upload (optionnel)
            },
            (error) => {
                console.error("Erreur d'upload :", error);
                setUploading(false);
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                setFileUrl(url);
                onFileUpload(url); // 🔥 Envoie l’URL au parent (CreateExam)
                forFormat(format)
                setUploading(false);
            }
        );
    };

    return (
        <FormItem>
            <FormLabel>Fichier d'examen</FormLabel>
            <div className="flex items-center gap-2">
                <Input
                    type="file"
                    accept=".pdf,.txt,.md,.tex"
                    onChange={handleFileChange}
                    className="flex h-10 bg-muted-light dark:bg-muted-dark"
                />
                {uploading && <Loader2 className="animate-spin text-data-teal h-8 w-8" />} {/* 🔥 Spinner */}
            </div>
            {fileUrl && (
                <p className="text-green-500 text-sm">
                    Fichier téléversé avec succès !{" "}
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        Voir le fichier
                    </a>
                </p>
            )}
            <FormDescription>
                Téléchargez un fichier PDF, LaTeX, Markdown ou texte.
            </FormDescription>
        </FormItem>
    );
}

export default FileUploadSection;
