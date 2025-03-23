import React, { useState } from 'react';
import { CheckCircle, XCircle, Save, Pencil, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { ToastContainer, toast } from 'react-toastify';

const GradeEditor = ({
                         submission,
                         maxGrade = 20,
                         onSave,
                         onCancel,
                         submissionCriteria = []
                     }) => {
    const [isEditing, setIsEditing] = useState(true); // Start in editing mode by default
    const [currentGrade, setCurrentGrade] = useState(submission?.grade?.score || 0);
    const [feedback, setFeedback] = useState(submission?.grade?.feedback || '');

    // If criteria are provided, initialize them with values from submission or zeros
    const [criteriaScores, setCriteriaScores] = useState(
        submissionCriteria.map(criteria => ({
            ...criteria,
            score: submission?.criteriaScores?.[criteria.id] || 0
        }))
    );

    const handleCriteriaChange = (criteriaId, value) => {
        setCriteriaScores(prev =>
            prev.map(c => c.id === criteriaId ? { ...c, score: value } : c)
        );

        // Update total grade based on criteria
        const total = criteriaScores
            .map(c => c.id === criteriaId ? value : c.score)
            .reduce((sum, current) => sum + current, 0);

        setCurrentGrade(Math.min(total, maxGrade));
    };

    const handleGradeChange = (value) => {
        setCurrentGrade(value);
    };

    const handleSave = () => {
        // In a real app, you would validate the grade before saving
        if (currentGrade < 0 || currentGrade > maxGrade) {
            toast.error(`La note doit être comprise entre 0 et ${maxGrade}`);
            return;
        }

        const updatedSubmission = {
            ...submission,
            grade: {
                score: parseFloat(currentGrade),
                feedback
            },
            criteriaScores: criteriaScores.reduce((obj, criteria) => {
                obj[criteria.id] = criteria.score;
                return obj;
            }, {})
        };

        onSave(updatedSubmission);
        setIsEditing(false);
        toast.success('Note enregistrée avec succès');
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            setIsEditing(false);
            // Reset to original values
            setCurrentGrade(submission?.grade?.score || 0);
            setFeedback(submission?.grade?.feedback || '');
        }
    };

    const getGradeColor = (grade) => {
        if (grade >= maxGrade * 0.7) return 'text-green-600';
        if (grade >= maxGrade * 0.5) return 'text-amber-600';
        return 'text-red-600';
    };

    const getPassFailIcon = (grade) => {
        return grade >= maxGrade / 2 ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
            <XCircle className="h-4 w-4 text-red-600" />
        );
    };

    return (
        <Card className="w-full">
            <ToastContainer position="top-right" autoClose={3000} />
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Évaluation</CardTitle>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Modifier
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Grade display or edit */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Note finale</span>
                        <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${getGradeColor(currentGrade)}`}>
                {currentGrade}/{maxGrade}
              </span>
                            {getPassFailIcon(currentGrade)}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex items-center gap-4">
                            <Input
                                type="number"
                                value={currentGrade}
                                onChange={(e) => handleGradeChange(parseFloat(e.target.value) || 0)}
                                min={0}
                                max={maxGrade}
                                step={0.5}
                                className="w-16 text-center"
                            />
                        </div>
                    )}
                </div>

                {/* Criteria scoring */}
                {submissionCriteria.length > 0 && (
                    <div className="space-y-3 pt-2">
                        <h3 className="text-sm font-medium">Critères d'évaluation</h3>

                        {criteriaScores.map((criteria) => (
                            <div key={criteria.id} className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">{criteria.name}</span>
                                    <span className="text-sm font-medium">
                    {criteria.score}/{criteria.maxScore}
                  </span>
                                </div>

                                {isEditing ? (
                                    <Slider
                                        value={[criteria.score]}
                                        max={criteria.maxScore}
                                        step={0.5}
                                        onValueChange={(value) => handleCriteriaChange(criteria.id, value[0])}
                                    />
                                ) : (
                                    <div className="h-2 bg-muted rounded-full">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${(criteria.score / criteria.maxScore) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Feedback section */}
                <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-medium">Commentaires</h3>

                    {isEditing ? (
                        <Textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Commentaires pour l'étudiant..."
                            rows={4}
                        />
                    ) : (
                        <div className="p-3 bg-muted/50 rounded-md text-sm min-h-[80px] whitespace-pre-wrap">
                            {feedback || "Aucun commentaire"}
                        </div>
                    )}
                </div>
            </CardContent>

            {isEditing && (
                <CardFooter className="flex justify-end space-x-2 pt-0">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                    >
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default GradeEditor;