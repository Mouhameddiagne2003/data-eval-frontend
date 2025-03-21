"use client"

import { useState } from "react"
import {
    Search,
    FileText,
    Filter,
    MoreHorizontal,
    Eye,
    Download,
    Trash2,
    CheckSquare,
    Clock,
    Calendar,
    ArrowUpDown,
    Plus,
    FileEdit,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for exams
const exams = [
    {
        id: 1,
        title: "Bases de données SQL",
        subject: "Informatique",
        professor: "Dr. Jean Bernard",
        status: "active",
        startDate: "2023-06-10T10:00:00",
        endDate: "2023-06-20T18:00:00",
        totalSubmissions: 45,
        pendingCorrections: 5,
    },
    {
        id: 2,
        title: "Algorithmes avancés",
        subject: "Informatique",
        professor: "Dr. Sophie Martin",
        status: "active",
        startDate: "2023-06-15T10:00:00",
        endDate: "2023-06-25T18:00:00",
        totalSubmissions: 32,
        pendingCorrections: 12,
    },
    {
        id: 3,
        title: "Statistiques descriptives",
        subject: "Mathématiques",
        professor: "Dr. Claire Moreau",
        status: "completed",
        startDate: "2023-05-20T10:00:00",
        endDate: "2023-06-05T18:00:00",
        totalSubmissions: 55,
        pendingCorrections: 0,
    },
    {
        id: 4,
        title: "Programmation Python",
        subject: "Informatique",
        professor: "Dr. Thomas Dubois",
        status: "active",
        startDate: "2023-06-05T10:00:00",
        endDate: "2023-06-15T18:00:00",
        totalSubmissions: 78,
        pendingCorrections: 23,
    },
    {
        id: 5,
        title: "Analyse numérique",
        subject: "Mathématiques",
        professor: "Dr. Philippe Leclerc",
        status: "draft",
        startDate: "2023-06-25T10:00:00",
        endDate: "2023-07-05T18:00:00",
        totalSubmissions: 0,
        pendingCorrections: 0,
    },
]

// Sample data for submissions
const submissions = [
    {
        id: 1,
        student: "Lucas Bernard",
        exam: "Bases de données SQL",
        submitDate: "2023-06-15T14:30:00",
        status: "corrected",
        grade: "16/20",
        professor: "Dr. Jean Bernard",
    },
    {
        id: 2,
        student: "Emma Rousseau",
        exam: "Bases de données SQL",
        submitDate: "2023-06-14T16:45:00",
        status: "corrected",
        grade: "18/20",
        professor: "Dr. Jean Bernard",
    },
    {
        id: 3,
        student: "Hugo Lefebvre",
        exam: "Algorithmes avancés",
        submitDate: "2023-06-16T09:20:00",
        status: "pending",
        grade: "",
        professor: "Dr. Sophie Martin",
    },
    {
        id: 4,
        student: "Léa Moreau",
        exam: "Algorithmes avancés",
        submitDate: "2023-06-15T11:10:00",
        status: "pending",
        grade: "",
        professor: "Dr. Sophie Martin",
    },
    {
        id: 5,
        student: "Arthur Dupont",
        exam: "Programmation Python",
        submitDate: "2023-06-10T10:30:00",
        status: "corrected",
        grade: "15/20",
        professor: "Dr. Thomas Dubois",
    },
]

const AdminExams = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [subjectFilter, setSubjectFilter] = useState("all")
    const [activeTab, setActiveTab] = useState("exams")

    // Filter exams
    const filteredExams = exams.filter((exam) => {
        // Search filter
        const matchesSearch =
            exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.subject.toLowerCase().includes(searchTerm.toLowerCase())

        // Status filter
        const matchesStatus = statusFilter === "all" || exam.status === statusFilter

        // Subject filter
        const matchesSubject = subjectFilter === "all" || exam.subject === subjectFilter

        return matchesSearch && matchesStatus && matchesSubject
    })

    // Filter submissions
    const filteredSubmissions = submissions.filter(
        (submission) =>
            submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.professor.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">En cours</Badge>
            case "completed":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Terminé</Badge>
            case "draft":
                return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Brouillon</Badge>
            case "corrected":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Corrigé</Badge>
            case "pending":
                return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">En attente</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="space-y-6 p-6 md:!p-8">
            <div className="flex flex-col md:!flex-row md:!items-center md:!justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-data-blue)]">Examens & Soumissions</h2>
                    <p className="text-sm text-[var(--color-data-blue)]/70 mt-1">
                        Gérer tous les examens et soumissions des étudiants
                    </p>
                </div>
                <Button className="gap-2 bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)]">
                    <Plus className="h-4 w-4" /> Créer un examen
                </Button>
            </div>

            <Tabs defaultValue="exams" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-2 bg-[var(--color-muted-light)]">
                    <TabsTrigger
                        value="exams"
                        className="flex gap-2 data-[state=active]:bg-white data-[state=active]:text-[var(--color-data-blue)] data-[state=active]:shadow-none"
                    >
                        <FileText className="h-4 w-4" /> Examens
                    </TabsTrigger>
                    <TabsTrigger
                        value="submissions"
                        className="flex gap-2 data-[state=active]:bg-white data-[state=active]:text-[var(--color-data-blue)] data-[state=active]:shadow-none"
                    >
                        <CheckSquare className="h-4 w-4" /> Soumissions
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="exams" className="space-y-4 mt-6">
                    <div className="flex flex-col md:!flex-row gap-4">
                        <div className="relative w-full md:!flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-data-blue)]/50" />
                            <Input
                                type="search"
                                placeholder="Rechercher par titre, professeur ou matière..."
                                className="w-full pl-9 border-[var(--color-border-light)] focus-visible:ring-[var(--color-data-light-blue)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:!flex-row gap-2 w-full md:!w-auto">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:!w-[180px] border-[var(--color-border-light)]">
                                    <SelectValue placeholder="Tous les statuts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="active">En cours</SelectItem>
                                    <SelectItem value="completed">Terminés</SelectItem>
                                    <SelectItem value="draft">Brouillons</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                                <SelectTrigger className="w-full md:!w-[180px] border-[var(--color-border-light)]">
                                    <SelectValue placeholder="Toutes les matières" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les matières</SelectItem>
                                    <SelectItem value="Informatique">Informatique</SelectItem>
                                    <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                                    <SelectItem value="Physique">Physique</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 shrink-0 border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                            >
                                <Filter className="h-4 w-4" />
                                <span className="sr-only">Filtrer</span>
                            </Button>
                        </div>
                    </div>

                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl text-[var(--color-data-blue)]">Examens</CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Liste de tous les examens créés sur la plateforme
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredExams.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-[var(--color-muted-light)] flex items-center justify-center mb-4">
                                        <FileText className="h-6 w-6 text-[var(--color-data-blue)]/50" />
                                    </div>
                                    <h3 className="font-medium text-[var(--color-data-blue)]">Aucun examen trouvé</h3>
                                    <p className="text-[var(--color-data-blue)]/70">Modifiez vos filtres pour voir plus de résultats</p>
                                </div>
                            ) : (
                                <div className="rounded-md border border-[var(--color-border-light)] overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[var(--color-muted-light)]">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Titre</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Matière
                                            </th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Professeur</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Période
                                            </th>
                                            <th className="py-3 px-4 text-center font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Soumissions
                                            </th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Statut</th>
                                            <th className="py-3 px-4 text-right font-medium text-[var(--color-data-blue)]">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredExams.map((exam) => (
                                            <tr
                                                key={exam.id}
                                                className="border-t border-[var(--color-border-light)] hover:bg-[var(--color-muted-light)]/30"
                                            >
                                                <td className="py-3 px-4 font-medium text-[var(--color-data-blue)]">{exam.title}</td>
                                                <td className="py-3 px-4 hidden md:!table-cell text-[var(--color-data-blue)]/70">
                                                    {exam.subject}
                                                </td>
                                                <td className="py-3 px-4 text-[var(--color-data-blue)]/70">{exam.professor}</td>
                                                <td className="py-3 px-4 hidden md:!table-cell">
                                                    <div className="flex items-center gap-1 text-[var(--color-data-blue)]/70">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{formatDate(exam.startDate).split(" ")[0]}</span>
                                                        <ArrowUpDown className="h-3 w-3 mx-1" />
                                                        <span>{formatDate(exam.endDate).split(" ")[0]}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-center hidden md:!table-cell">
                                                    <div>
                                                        <span className="font-medium text-[var(--color-data-blue)]">{exam.totalSubmissions}</span>
                                                        {exam.pendingCorrections > 0 && (
                                                            <Badge variant="outline" className="ml-2 text-amber-600 border-amber-200 bg-amber-50">
                                                                {exam.pendingCorrections} en attente
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{getStatusBadge(exam.status)}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 text-[var(--color-data-blue)]/70 hover:text-[var(--color-data-blue)] hover:bg-[var(--color-muted-light)]"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel className="text-[var(--color-data-blue)]">Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <Eye className="mr-2 h-4 w-4" /> Voir l'examen
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <FileEdit className="mr-2 h-4 w-4" /> Modifier
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <Download className="mr-2 h-4 w-4" /> Télécharger
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="flex items-center text-red-600">
                                                                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-[var(--color-border-light)] py-4">
                            <div className="text-sm text-[var(--color-data-blue)]/70">
                                Affichage de <span className="font-medium text-[var(--color-data-blue)]">{filteredExams.length}</span>{" "}
                                sur <span className="font-medium text-[var(--color-data-blue)]">{exams.length}</span> examens
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                                    disabled
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                                >
                                    Suivant
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="submissions" className="space-y-4 mt-6">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-data-blue)]/50" />
                        <Input
                            type="search"
                            placeholder="Rechercher par étudiant, examen ou professeur..."
                            className="w-full pl-9 border-[var(--color-border-light)] focus-visible:ring-[var(--color-data-light-blue)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl text-[var(--color-data-blue)]">Soumissions des étudiants</CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Liste de toutes les soumissions d'examens par les étudiants
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {filteredSubmissions.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-[var(--color-muted-light)] flex items-center justify-center mb-4">
                                        <CheckSquare className="h-6 w-6 text-[var(--color-data-blue)]/50" />
                                    </div>
                                    <h3 className="font-medium text-[var(--color-data-blue)]">Aucune soumission trouvée</h3>
                                    <p className="text-[var(--color-data-blue)]/70">
                                        Modifiez votre recherche pour voir plus de résultats
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-md border border-[var(--color-border-light)] overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[var(--color-muted-light)]">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Étudiant</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Examen</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Date de soumission
                                            </th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Statut</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Note</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Professeur
                                            </th>
                                            <th className="py-3 px-4 text-right font-medium text-[var(--color-data-blue)]">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredSubmissions.map((submission) => (
                                            <tr
                                                key={submission.id}
                                                className="border-t border-[var(--color-border-light)] hover:bg-[var(--color-muted-light)]/30"
                                            >
                                                <td className="py-3 px-4 font-medium text-[var(--color-data-blue)]">{submission.student}</td>
                                                <td className="py-3 px-4 text-[var(--color-data-blue)]/70">{submission.exam}</td>
                                                <td className="py-3 px-4 hidden md:!table-cell">
                                                    <div className="flex items-center gap-1 text-[var(--color-data-blue)]/70">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{formatDate(submission.submitDate)}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
                                                <td className="py-3 px-4 font-medium text-[var(--color-data-blue)]">
                                                    {submission.grade || "-"}
                                                </td>
                                                <td className="py-3 px-4 hidden md:!table-cell text-[var(--color-data-blue)]/70">
                                                    {submission.professor}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 text-[var(--color-data-blue)]/70 hover:text-[var(--color-data-blue)] hover:bg-[var(--color-muted-light)]"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel className="text-[var(--color-data-blue)]">Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <Eye className="mr-2 h-4 w-4" /> Voir la soumission
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <Download className="mr-2 h-4 w-4" /> Télécharger
                                                            </DropdownMenuItem>
                                                            {submission.status === "pending" && (
                                                                <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                    <CheckSquare className="mr-2 h-4 w-4" /> Corriger
                                                                </DropdownMenuItem>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-[var(--color-border-light)] py-4">
                            <div className="text-sm text-[var(--color-data-blue)]/70">
                                Affichage de{" "}
                                <span className="font-medium text-[var(--color-data-blue)]">{filteredSubmissions.length}</span> sur{" "}
                                <span className="font-medium text-[var(--color-data-blue)]">{submissions.length}</span> soumissions
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                                    disabled
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                                >
                                    Suivant
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminExams

