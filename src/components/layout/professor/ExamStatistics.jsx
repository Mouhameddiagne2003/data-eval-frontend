import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Users, Clock, Award, BookOpen, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const ExamStatistics = ({
                            exam,
                            showStudentProgress = true,
                            showGradeDistribution = true,
                            showTimeAnalysis = false,
                            showAdvancedStats = false
                        }) => {
    // Calculate basic statistics
    const stats = useMemo(() => {
        if (!exam) return null;

        const submissions = exam.submissions || [];
        const totalSubmissions = submissions.length;
        const submissionRate = totalSubmissions / (exam.totalStudents || 1) * 100;

        // Calculate grades stats
        const grades = submissions.map(s => s.grade.score || 0);
        const averageGrade = grades.length ? grades.reduce((sum, g) => sum + g, 0) / grades.length : 0;
        const minGrade = grades.length ? Math.min(...grades) : 0;
        const maxGrade = grades.length ? Math.max(...grades) : 0;
        const medianGrade = grades.length ?
            [...grades].sort((a, b) => a - b)[Math.floor(grades.length / 2)] : 0;

        // Calculate pass rate (>= 10 out of 20)
        const passingGrades = grades.filter(g => g >= 10);
        const passRate = passingGrades.length / (grades.length || 1) * 100;

        // Calculate grade distribution
        const gradeDistribution = [
            { range: '0-5', count: grades.filter(g => g >= 0 && g <= 5).length },
            { range: '6-10', count: grades.filter(g => g > 5 && g <= 10).length },
            { range: '11-15', count: grades.filter(g => g > 10 && g <= 15).length },
            { range: '16-20', count: grades.filter(g => g > 15 && g <= 20).length }
        ];

        // Create grade distribution with percentages for pie chart
        const gradeDistributionPie = gradeDistribution.map(item => ({
            name: item.range,
            value: item.count,
            percentage: Math.round((item.count / (grades.length || 1)) * 100)
        }));

        return {
            totalSubmissions,
            submissionRate,
            averageGrade,
            minGrade,
            maxGrade,
            medianGrade,
            passRate,
            gradeDistribution,
            gradeDistributionPie
        };
    }, [exam]);

    if (!exam || !stats) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                        Données statistiques non disponibles
                    </p>
                </CardContent>
            </Card>
        );
    }

    // Custom tooltip for the pie chart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded shadow-sm text-sm">
                    <p>{`${payload[0].name}: ${payload[0].value} étudiant(s) (${payload[0].payload.percentage}%)`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Summary statistics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Taux de participation</p>
                                <p className="text-2xl font-bold">{Math.round(stats.submissionRate)}%</p>
                            </div>
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <Progress
                            value={stats.submissionRate}
                            className="h-2 mt-3"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            {stats.totalSubmissions} sur {exam.totalStudents} étudiants
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Note moyenne</p>
                                <p className="text-2xl font-bold">{stats.averageGrade.toFixed(1)}/20</p>
                            </div>
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Award className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                Min: {stats.minGrade} | Max: {stats.maxGrade} | Médiane: {stats.medianGrade}
              </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-muted-foreground">Taux de réussite</p>
                                <p className="text-2xl font-bold">{Math.round(stats.passRate)}%</p>
                            </div>
                            <div className={`p-2 rounded-full ${stats.passRate >= 70 ? 'bg-green-100' : stats.passRate >= 50 ? 'bg-amber-100' : 'bg-red-100'}`}>
                                {stats.passRate >= 70 ? (
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                ) : stats.passRate >= 50 ? (
                                    <Clock className="h-5 w-5 text-amber-600" />
                                ) : (
                                    <TrendingDown className="h-5 w-5 text-red-600" />
                                )}
                            </div>
                        </div>
                        <Progress
                            value={stats.passRate}
                            className={`h-2 mt-3 ${stats.passRate >= 70 ? 'bg-green-100' : stats.passRate >= 50 ? 'bg-amber-100' : 'bg-red-100'}`}
                            indicatorClassName={stats.passRate >= 70 ? 'bg-green-600' : stats.passRate >= 50 ? 'bg-amber-600' : 'bg-red-600'}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            {stats.passRate < 50 ?
                                "Moins de la moitié des étudiants ont réussi" :
                                stats.passRate >= 90 ?
                                    "Excellent taux de réussite" :
                                    "Taux de réussite acceptable"}
                        </p>
                    </CardContent>
                </Card>

                {showAdvancedStats && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-muted-foreground">Écarts de performance</p>
                                    <p className="text-2xl font-bold">{(stats.maxGrade - stats.minGrade).toFixed(1)}</p>
                                </div>
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <AlertTriangle className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <Badge variant={stats.maxGrade - stats.minGrade > 10 ? "destructive" : "outline"} className="text-xs">
                                    Écart important
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {stats.maxGrade - stats.minGrade > 10 ?
                                        "Grande variabilité dans les performances" :
                                        "Performances relativement homogènes"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Grade distribution */}
                {showGradeDistribution && (
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="text-lg">Distribution des notes</CardTitle>
                            <CardDescription>
                                Répartition des notes par tranche
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.gradeDistributionPie}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {stats.gradeDistributionPie.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {stats.gradeDistribution.map((item, index) => (
                                    <div key={item.range} className="text-center">
                                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        <p className="text-xs font-medium mt-1">{item.range}</p>
                                        <p className="text-sm">{item.count}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Submission progression over time */}
                {showStudentProgress && exam.submissionStats && exam.submissionStats.length > 0 && (
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="text-lg">Évolution des soumissions</CardTitle>
                            <CardDescription>
                                Progression des remises dans le temps
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={exam.submissionStats}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            name="Soumissions"
                                            stroke="#3B82F6"
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Additional analysis if enabled */}
            {showTimeAnalysis && exam.submissionTimeStats && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Analyse du temps de réponse</CardTitle>
                        <CardDescription>
                            Temps moyen passé par question
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={exam.submissionTimeStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="question" />
                                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="avgTime" name="Temps moyen (min)" fill="#10B981" />
                                    <Bar dataKey="expectedTime" name="Temps attendu (min)" fill="#6366F1" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ExamStatistics;