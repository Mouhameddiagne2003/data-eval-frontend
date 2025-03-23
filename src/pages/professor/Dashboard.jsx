import React from 'react';
import {Link} from 'react-router-dom';
import {
    BarChart3,
    PlusCircle,
    ChevronRight,
    FileText,
    Users,
    Clock,
    Percent,
    BarChart,
    PieChart,
    LineChart,
} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart as RechartsBarChart,
    Bar,
    PieChart as RechartsPieChart,
    Pie,
    Cell
} from 'recharts';

import {statsData} from "@/lib/constant.js";
import {useAuthStore } from "@/store/auth";


const barChartData = [
    {name: 'SQL Avancé', note: 14.5},
    {name: 'Théorie BDD', note: 12.8},
    {name: 'NoSQL', note: 15.2},
    {name: 'Normalisation', note: 11.5},
    {name: 'Transactions', note: 13.7},
];

const lineChartData = [
    {month: 'Jan', moyenne: 12.3},
    {month: 'Fév', moyenne: 13.1},
    {month: 'Mar', moyenne: 14.2},
    {month: 'Avr', moyenne: 13.5},
    {month: 'Mai', moyenne: 14.8},
    {month: 'Juin', moyenne: 15.2},
];

const pieChartData = [
    {name: 'Excellent (>16)', value: 12},
    {name: 'Bien (13-16)', value: 18},
    {name: 'Moyen (10-13)', value: 8},
    {name: 'Faible (<10)', value: 4},
];

const COLORS = ['#0A6E8A', '#4AB7CD', '#054257', '#D93939'];

const Dashboard = () => {
    const { user } = useAuthStore();
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">Bonjour, {user.prenom} {user.nom}</h1>
                <p className="text-muted-foreground">Bienvenue sur votre tableau de bord</p>
            </div>

            <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Tableau de bord</h2>
                <p className="text-muted-foreground mb-4">Aperçu de vos examens, étudiants et autres ressources</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-4 gap-4 sm:gap-6">
                {statsData.map(({label, key, icon: Icon, bgColor, textColor, defaultValue}) => {

                    return (
                        <Card key={key}
                              className="border border-border-light dark:border-border-dark hover:!border-border-dark">
                            <CardContent className="p-4 sm:!p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`rounded-full p-2 ${bgColor}`}>
                                        <Icon className={`h-5 w-5 ${textColor}`}/>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">{label}</div>
                                <div className="text-2xl sm:!text-3xl font-bold mt-1">
                                    {defaultValue} {/* ✅ Affiche bien les nombres et pourcentages */}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Tools Section */}
            <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Démarrez avec ces outils utiles</h2>
                <p className="text-muted-foreground mb-4">Explorez nos outils pour créer des examens, analyser les
                    résultats et plus</p>

                <div className="grid grid-cols-1 md:!grid-cols-2 gap-4 sm:gap-6">
                    <Card className="border-border-light dark:border-border-dark">
                        <CardContent className="p-4 sm:p-6">
                            <h3 className="text-lg font-semibold mb-2">Démarrer un nouvel Examen</h3>
                            <p className="text-muted-foreground mb-4">Créez un examen facilement avec l'IA, entrez
                                simplement
                                une consigne et c'est parti !</p>

                            <div className="bg-muted-light dark:bg-muted-dark rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-center p-4">
                                    <div className="bg-bg-light dark:bg-bg-dark p-4 rounded-md border shadow-sm w-full">
                                        <div className="w-12 h-12 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-data-teal hover:bg-data-teal/90 text-white">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Créer un examen
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-border-light dark:border-border-dark">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">Analyser les résultats d'examen</h3>
                                <span
                                    className="bg-blue-100 dark:bg-blue-900 text-data-blue dark:text-blue-300 text-xs px-2 py-1 rounded-full">Nouvelle fonction</span>
                            </div>
                            <p className="text-muted-foreground mb-4">Analysez les résultats d'examen pour obtenir plus
                                de
                                données et de statistiques</p>

                            <div className="bg-muted-light dark:bg-muted-dark rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-center p-4">
                                    <div className="bg-bg-light dark:bg-bg-dark p-4 rounded-md border shadow-sm w-full">
                                        <div className="flex justify-between mb-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded"></div>
                                            <div className="w-12 h-12 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-data-teal hover:bg-data-teal/90 text-white">
                                <BarChart className="mr-2 h-4 w-4"/>
                                Analyser les résultats
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Exam History */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Historique des examens</h2>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                        Voir tout <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>

                <Card className="border-border-light dark:border-border-dark">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-border-light dark:border-border-dark">
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Titre</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Classe</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Code</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Participants</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Soumissions</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Planification</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                <tr>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">Base de
                                        données
                                        avancées
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">TECH-3A</td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-mono hidden md:table-cell">zf98xTGVu</td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-data-teal hidden sm:table-cell">34</td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                                        <div className="flex items-center">
                                            <span className="mr-2">23/34</span>
                                            <Progress value={67} className="h-2 w-20"/>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                                        <div className="flex flex-col">
                                            <span>14 Mars 2024</span>
                                            <span className="text-xs text-muted-foreground">17 Mars 2024</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className="px-2 py-1 text-xs rounded-full bg-data-light-blue/20 text-data-blue">En cours</span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-right">
                                        <Button variant="ghost" size="icon">
                                            <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path
                                                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Charts */}
            <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Analyse des performances</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Bar Chart */}
                    <Card className="border-border-light dark:border-border-dark">
                        <CardHeader>
                            <CardTitle className="text-base sm:text-lg">Notes moyennes par examen</CardTitle>
                            <CardDescription>Performance des étudiants par sujet</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-60 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsBarChart
                                        data={barChartData}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)"/>
                                        <XAxis dataKey="name" tick={{fontSize: 12}}/>
                                        <YAxis domain={[0, 20]} tick={{fontSize: 12}}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--color-bg-light)',
                                                color: 'var(--color-fg-light)',
                                                border: '1px solid var(--color-border-light)'
                                            }}
                                        />
                                        <Legend wrapperStyle={{fontSize: 12}}/>
                                        <Bar dataKey="note" fill="var(--color-data-light-blue)" radius={[4, 4, 0, 0]}/>
                                    </RechartsBarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Line Chart */}
                    <Card className="border-border-light dark:border-border-dark">
                        <CardHeader>
                            <CardTitle className="text-base sm:text-lg">Évolution des moyennes</CardTitle>
                            <CardDescription>Progression sur les 6 derniers mois</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-60 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsLineChart
                                        data={lineChartData}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)"/>
                                        <XAxis dataKey="month" tick={{fontSize: 12}}/>
                                        <YAxis domain={[8, 16]} tick={{fontSize: 12}}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--color-bg-light)',
                                                color: 'var(--color-fg-light)',
                                                border: '1px solid var(--color-border-light)'
                                            }}
                                        />
                                        <Legend wrapperStyle={{fontSize: 12}}/>
                                        <Line
                                            type="monotone"
                                            dataKey="moyenne"
                                            stroke="var(--color-data-teal)"
                                            activeDot={{r: 8}}
                                            strokeWidth={2}
                                        />
                                    </RechartsLineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pie Chart */}
                    <Card className="border-border-light dark:border-border-dark">
                        <CardHeader>
                            <CardTitle className="text-base sm:text-lg">Répartition des notes</CardTitle>
                            <CardDescription>Distribution par niveau</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-60 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--color-bg-light)',
                                                color: 'var(--color-fg-light)',
                                                border: '1px solid var(--color-border-light)'
                                            }}
                                        />
                                        <Legend wrapperStyle={{fontSize: 12}}/>
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity Card */}
                    <Card className="border-border-light dark:border-border-dark">
                        <CardHeader>
                            <CardTitle className="text-base sm:text-lg">Activité récente</CardTitle>
                            <CardDescription>Dernières actions sur la plateforme</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div
                                    className="flex items-start gap-4 border-b border-border-light dark:border-border-dark pb-4">
                                    <div
                                        className="h-8 w-8 rounded-full bg-data-light-blue/20 flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-4 w-4 text-data-blue"/>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Nouvel examen créé</p>
                                        <p className="text-sm text-muted-foreground">Base de données avancées</p>
                                        <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                                    </div>
                                </div>

                                <div
                                    className="flex items-start gap-4 border-b border-border-light dark:border-border-dark pb-4">
                                    <div
                                        className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                        <Users className="h-4 w-4 text-green-600 dark:text-green-400"/>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Étudiants ajoutés</p>
                                        <p className="text-sm text-muted-foreground">12 étudiants ajoutés à TECH-3A</p>
                                        <p className="text-xs text-muted-foreground">Hier</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                        <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Rapport généré</p>
                                        <p className="text-sm text-muted-foreground">Analyse de performance - SQL
                                            Avancé</p>
                                        <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;