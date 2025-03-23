import React, { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

function AddStudentForm({ onAddStudent, onImportCSV }) {
    const [newStudent, setNewStudent] = useState({
        email: "",
        prenom: "",
        nom: "",
    });

    const [csvFile, setCsvFile] = useState(null);
    const [studentErrors, setStudentErrors] = useState({});

    // Validate student input
    const validateStudentInput = () => {
        const errors = {};

        if (!newStudent.email) {
            errors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStudent.email)) {
            errors.email = "Format d'email invalide";
        }

        if (!newStudent.prenom) {
            errors.prenom = "Le prénom est requis";
        }

        if (!newStudent.nom) {
            errors.nom = "Le nom est requis";
        }

        setStudentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Add student handler
    const handleAddStudent = () => {
        if (!validateStudentInput()) {
            return;
        }

        onAddStudent({ ...newStudent });

        // Reset input fields
        setNewStudent({
            email: "",
            prenom: "",
            nom: "",
        });
    };

    // Handle CSV file input change
    const handleCsvFileChange = (event) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            setCsvFile(file);
            onImportCSV(file);
        } else {
            setCsvFile(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* CSV File Upload */}
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
                            onClick={() => {
                                setCsvFile(null);
                                event.target.value = '';
                            }}
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

            {/* Manual Student Addition */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Ajouter un élève manuellement</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                    <div>
                        <Input
                            placeholder="Email"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                            className={studentErrors.email ? "border-destructive" : ""}
                        />
                        {studentErrors.email && (
                            <p className="text-xs text-destructive mt-1">{studentErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            placeholder="Prénom"
                            value={newStudent.prenom}
                            onChange={(e) => setNewStudent({...newStudent, prenom: e.target.value})}
                            className={studentErrors.prenom ? "border-destructive" : ""}
                        />
                        {studentErrors.prenom && (
                            <p className="text-xs text-destructive mt-1">{studentErrors.prenom}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            placeholder="Nom"
                            value={newStudent.nom}
                            onChange={(e) => setNewStudent({...newStudent, nom: e.target.value})}
                            className={studentErrors.nom ? "border-destructive" : ""}
                        />
                        {studentErrors.nom && (
                            <p className="text-xs text-destructive mt-1">{studentErrors.nom}</p>
                        )}
                    </div>
                </div>
                <Button
                    type="button"
                    onClick={handleAddStudent}
                    className="w-full sm:w-auto mt-1"
                >
                    <Plus className="h-4 w-4 mr-1" /> Ajouter
                </Button>
            </div>
        </div>
    );
}

export default AddStudentForm;