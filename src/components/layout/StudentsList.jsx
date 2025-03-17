import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";

function StudentsList({ students, onRemoveStudent }) {
    return (
        <div className="mt-4">
            <div className="flex justify-between mb-2">
                <FormLabel>Liste des élèves</FormLabel>
                <span className="text-sm text-muted-foreground">
          {students?.length || 0} élèves
        </span>
            </div>

            {students?.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted px-3 py-2 text-sm font-medium grid grid-cols-12">
                        <div className="col-span-5">Email</div>
                        <div className="col-span-3">Prénom</div>
                        <div className="col-span-3">Nom</div>
                        <div className="col-span-1"></div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {students.map((student, index) => (
                            <div
                                key={index}
                                className="px-3 py-2 text-sm border-t grid grid-cols-12 items-center"
                            >
                                <div className="col-span-5 truncate">{student.email}</div>
                                <div className="col-span-3 truncate">{student.prenom}</div>
                                <div className="col-span-3 truncate">{student.nom}</div>
                                <div className="col-span-1 text-right">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onRemoveStudent(index)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-6 border rounded-md text-muted-foreground">
                    Aucun élève ajouté pour cet examen
                </div>
            )}
            <FormMessage />
        </div>
    );
}

export default StudentsList;