import { Users, GraduationCap, FileText, Clock, CheckSquare, TimerReset, ArrowRight, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const statCards = [
    {
        title: "Total Utilisateurs",
        value: "246",
        change: "+12%",
        icon: Users,
        bgColor: "bg-[var(--color-data-teal)]/10",
        textColor: "text-[var(--color-data-teal)]",
    },
    {
        title: "Professeurs",
        value: "38",
        change: "+5%",
        icon: GraduationCap,
        bgColor: "bg-[var(--color-data-light-blue)]/10",
        textColor: "text-[var(--color-data-light-blue)]",
    },
    {
        title: "Étudiants",
        value: "208",
        change: "+18%",
        icon: Users,
        bgColor: "bg-[var(--color-accent)]/10",
        textColor: "text-[var(--color-accent)]",
    },
    {
        title: "Examens créés",
        value: "127",
        change: "+24%",
        icon: FileText,
        bgColor: "bg-[var(--color-data-blue)]/10",
        textColor: "text-[var(--color-data-blue)]",
    },
]

const activityItems = [
    {
        icon: Users,
        title: "Nouvel utilisateur inscrit",
        description: "Un nouveau professeur s'est inscrit sur la plateforme.",
        time: "Il y a 2 heures",
        color: "text-[var(--color-data-teal)]",
        bgColor: "bg-[var(--color-data-teal)]/10",
    },
    {
        icon: FileText,
        title: "Nouvel examen créé",
        description: "Un professeur a créé un nouvel examen de SQL Avancé.",
        time: "Il y a 5 heures",
        color: "text-[var(--color-data-light-blue)]",
        bgColor: "bg-[var(--color-data-light-blue)]/10",
    },
    {
        icon: CheckSquare,
        title: "Soumission corrigée",
        description: "Une soumission a été corrigée avec une note de 18/20.",
        time: "Il y a 12 heures",
        color: "text-[var(--color-accent)]",
        bgColor: "bg-[var(--color-accent)]/10",
    },
    {
        icon: TimerReset,
        title: "Examen terminé",
        description: 'L\'examen "Bases de données" est maintenant terminé.',
        time: "Il y a 1 jour",
        color: "text-[var(--color-data-blue)]",
        bgColor: "bg-[var(--color-data-blue)]/10",
    },
]

// Chart data
const examSubmissionsData = [
    { name: "Jan", Python: 12, SQL: 19, Java: 8 },
    { name: "Fév", Python: 15, SQL: 21, Java: 12 },
    { name: "Mar", Python: 18, SQL: 25, Java: 15 },
    { name: "Avr", Python: 20, SQL: 30, Java: 18 },
    { name: "Mai", Python: 22, SQL: 35, Java: 22 },
    { name: "Juin", Python: 25, SQL: 38, Java: 25 },
]

const successRateData = [
    { name: "Python", rate: 75 },
    { name: "SQL", rate: 82 },
    { name: "Java", rate: 68 },
    { name: "C++", rate: 65 },
    { name: "JavaScript", rate: 72 },
]

const AdminHome = () => {
    return (
        <div className="space-y-6 p-6 md:!p-8">
            <div className="flex flex-col md:!flex-row md:!items-center md:!justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-data-blue)]">Tableau de bord</h2>
                    <p className="text-sm text-[var(--color-data-blue)]/70">Vue d'ensemble de la plateforme d'évaluation</p>
                </div>
                <Tabs defaultValue="week" className="w-full md:!w-auto">
                    <TabsList className="grid w-full md:!w-auto grid-cols-3">
                        <TabsTrigger value="week">Cette semaine</TabsTrigger>
                        <TabsTrigger value="month">Ce mois</TabsTrigger>
                        <TabsTrigger value="year">Cette année</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 gap-4 md:!gap-6">
                {statCards.map((card, index) => (
                    <Card key={index} className="border-[var(--color-border-light)] overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[var(--color-data-blue)]/70">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-3xl font-bold text-[var(--color-data-blue)]">{card.value}</div>
                                    <p className="text-xs mt-1">
                                        <span className="text-green-500 font-medium">{card.change}</span>
                                        <span className="text-[var(--color-data-blue)]/60"> depuis le mois dernier</span>
                                    </p>
                                </div>
                                <div
                                    className={`h-12 w-12 rounded-full ${card.bgColor} ${card.textColor} flex items-center justify-center`}
                                >
                                    <card.icon className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:!grid-cols-7 gap-4 md:!gap-6">
                <Card className="border-[var(--color-border-light)] lg:!col-span-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-[var(--color-data-blue)]">Soumissions par matière</CardTitle>
                        <CardDescription className="text-[var(--color-data-blue)]/70">
                            Nombre d'examens soumis par matière
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={examSubmissionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPython" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-data-teal)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--color-data-teal)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorSQL" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-data-light-blue)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--color-data-light-blue)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorJava" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "var(--color-data-blue)", opacity: 0.7 }}
                                        axisLine={{ stroke: "var(--color-border-light)" }}
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--color-data-blue)", opacity: 0.7 }}
                                        axisLine={{ stroke: "var(--color-border-light)" }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--color-bg-light)",
                                            borderColor: "var(--color-border-light)",
                                            color: "var(--color-data-blue)",
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="Python"
                                        stroke="var(--color-data-teal)"
                                        fillOpacity={1}
                                        fill="url(#colorPython)"
                                        stackId="1"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="SQL"
                                        stroke="var(--color-data-light-blue)"
                                        fillOpacity={1}
                                        fill="url(#colorSQL)"
                                        stackId="1"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Java"
                                        stroke="var(--color-accent)"
                                        fillOpacity={1}
                                        fill="url(#colorJava)"
                                        stackId="1"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-[var(--color-border-light)] lg:!col-span-3">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-[var(--color-data-blue)]">
                            Taux de réussite par matière
                        </CardTitle>
                        <CardDescription className="text-[var(--color-data-blue)]/70">
                            Pourcentage des étudiants ayant réussi l'examen
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={successRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "var(--color-data-blue)", opacity: 0.7 }}
                                        axisLine={{ stroke: "var(--color-border-light)" }}
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--color-data-blue)", opacity: 0.7 }}
                                        axisLine={{ stroke: "var(--color-border-light)" }}
                                        domain={[0, 100]}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--color-bg-light)",
                                            borderColor: "var(--color-border-light)",
                                            color: "var(--color-data-blue)",
                                        }}
                                        formatter={(value) => [`${value}%`, "Taux de réussite"]}
                                    />
                                    <Bar
                                        dataKey="rate"
                                        fill="var(--color-data-light-blue)"
                                        radius={[4, 4, 0, 0]}
                                        name="Taux de réussite"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:!grid-cols-2 gap-4 md:!gap-6">
                {/* Recent Activity */}
                <Card className="border-[var(--color-border-light)]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg font-bold text-[var(--color-data-blue)]">Activité Récente</CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Vue d'ensemble des actions récentes sur la plateforme
                            </CardDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-[var(--color-data-teal)] hover:text-[var(--color-data-teal)]/80 hover:bg-[var(--color-data-teal)]/10"
                        >
                            Voir tout <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {activityItems.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div
                                        className={`h-10 w-10 rounded-full ${item.bgColor} ${item.color} flex items-center justify-center shrink-0 mt-0.5`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-[var(--color-data-blue)]">{item.title}</p>
                                        <p className="text-sm text-[var(--color-data-blue)]/70">{item.description}</p>
                                        <p className="text-xs text-[var(--color-data-blue)]/60">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-4">
                        <Button variant="outline" size="sm" className="w-full text-[var(--color-data-teal)]">
                            Voir toutes les activités
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pending Actions Card */}
                <Card className="border-[var(--color-border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold text-[var(--color-data-blue)]">Actions en attente</CardTitle>
                        <CardDescription className="text-[var(--color-data-blue)]/70">
                            Actions nécessitant votre attention
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-amber-800">2 professeurs en attente de validation</p>
                                            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                                                Nouveau
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-amber-700">Inscriptions des dernières 24h</p>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                                    Vérifier
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-blue-800">15 soumissions en attente de correction</p>
                                        <p className="text-sm text-blue-700">Examens "Bases de données avancées"</p>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Voir
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-red-800">3 signalements de problèmes</p>
                                            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                                                Urgent
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-red-700">Problèmes techniques signalés par les utilisateurs</p>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                    Résoudre
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-4">
                        <Button variant="outline" size="sm" className="w-full text-[var(--color-data-teal)]">
                            Voir toutes les actions
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AdminHome

