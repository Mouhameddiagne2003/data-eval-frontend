import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
    MoreHorizontal,
    Check,
    X,
    Ban,
    User,
    Search,
    Filter,
    MailOpen,
    MailCheck,
    UserPlus,
    Eye,
    Edit,
    GraduationCap,
    FileText,
    Users,
    Loader2,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import userService from "@/services/userService"

const AdminProfessors = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("pending")
    const [pendingProfessors, setPendingProfessors] = useState([])
    const [activeProfessors, setActiveProfessors] = useState([])
    const [isLoadingPending, setIsLoadingPending] = useState(true)
    const [isLoadingActive, setIsLoadingActive] = useState(true)
    const [stats, setStats] = useState({
        totalProfessors: 0,
        activeProfessors: 0,
        totalExams: 0,
        totalStudents: 0,
    })

    // Fetch pending professors from API
    useEffect(() => {
        const fetchPendingProfessors = async () => {
            setIsLoadingPending(true)
            try {
                const response = await userService.getPendingProfessors();
                setPendingProfessors(response)
                console.log(pendingProfessors)


            } catch (error) {
                console.error("Erreur lors de la récupération des professeurs en attente:", error)
                toast.error("Impossible de charger les professeurs en attente")
            } finally {
                setIsLoadingPending(false)
            }
        }

        fetchPendingProfessors()
    }, [])

    // Fetch active professors from API
    useEffect(() => {
        const fetchActiveProfessors = async () => {
            setIsLoadingActive(true)
            try {
                const response = await userService.getAllProfessors()
                setActiveProfessors(response)

                // Calculate stats
                const activeProfs = response.filter(prof => prof.status === "active")
                setStats({
                    totalProfessors: response.length,
                    activeProfessors: activeProfs?.length,
                    totalExams: response.reduce((sum, prof) => sum + (prof.examsCount || 0), 0),
                    totalStudents: response.reduce((sum, prof) => sum + (prof.studentsCount || 0), 0),
                })
            } catch (error) {
                console.error("Erreur lors de la récupération des professeurs:", error)
                toast.error("Impossible de charger la liste des professeurs")
            } finally {
                setIsLoadingActive(false)
            }
        }

        fetchActiveProfessors()
    }, [])

    // Handle professor approval
    const handleApproveProf = async (professorId) => {
        try {
            await userService.approveProf(professorId)
            setPendingProfessors(pendingProfessors.filter(prof => prof.id !== professorId))
            toast.success("Professeur approuvé avec succès")

            // Refresh active professors list
            const response = await userService.getAllProfessors()
            setActiveProfessors(response)
        } catch (error) {
            console.error("Erreur lors de l'approbation du professeur:", error)
            toast.error("Impossible d'approuver le professeur")
        }
    }

    // Handle professor rejection
    const handleRejectProf = async (professorId) => {
        try {
            await userService.handleRejectProf(professorId)
            setPendingProfessors(pendingProfessors.filter(prof => prof.id !== professorId))
            toast.success("Demande rejetée avec succès")
        } catch (error) {
            console.error("Erreur lors du rejet de la demande:", error)
            toast.error("Impossible de rejeter la demande")
        }
    }

    // Handle professor status toggle (activate/deactivate)
    const handleToggleStatus = async (professorId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "pending" : "active"
        try {
            await userService.handleToggleStatus(professorId)

            // Update local state
            setActiveProfessors(
                activeProfessors.map(prof =>
                    prof.id === professorId ? { ...prof, status: newStatus } : prof
                )
            )

            toast.success(`Professeur ${newStatus === "active" ? "activé" : "désactivé"} avec succès`)
        } catch (error) {
            console.error("Erreur lors de la modification du statut:", error)
            toast.error("Impossible de modifier le statut du professeur")
        }
    }

    console.log(pendingProfessors)
    // Filter professors based on search term
    const filteredPending = pendingProfessors?.filter(
        (prof) =>
            (prof.prenom && prof.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (prof.nom && prof.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            prof.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredActive = activeProfessors?.filter(
        (prof) =>
            (prof.nom && prof.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (prof.prenom && prof.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            prof.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date)
    }

    const getInitials = (prenom, nom) => {
        if (!prenom && !nom) return "??";

        const prenomInitial = prenom ? prenom.charAt(0) : "";
        const nomInitial = nom ? nom.charAt(0) : "";

        return (prenomInitial + nomInitial).toUpperCase();
    }

    // Loading component
    const LoadingState = () => (
        <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-data-blue)]" />
            <span className="ml-2 text-[var(--color-data-blue)]">Chargement en cours...</span>
        </div>
    );

    return (
        <div className="space-y-6 p-6 md:!p-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex flex-col md:!flex-row md:!items-center md:!justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-data-blue)]">Gestion des Professeurs</h2>
                    <p className="text-sm text-[var(--color-data-blue)]/70 mt-1">
                        Gérez les comptes professeurs et les demandes d'inscription
                    </p>
                </div>
                <Button className="gap-2 bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)]">
                    <UserPlus className="h-4 w-4" /> Ajouter un professeur
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 gap-4">
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Total Professeurs</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">
                                    {isLoadingActive ? "..." : stats.totalProfessors}
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-data-teal)]/10 text-[var(--color-data-teal)] flex items-center justify-center">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Professeurs Actifs</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">
                                    {isLoadingActive ? "..." : stats.activeProfessors}
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-data-light-blue)]/10 text-[var(--color-data-light-blue)] flex items-center justify-center">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Examens Créés</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">
                                    {isLoadingActive ? "..." : stats.totalExams}
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center">
                                <FileText className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Étudiants Gérés</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">
                                    {isLoadingActive ? "..." : stats.totalStudents}
                                </h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-data-blue)]/10 text-[var(--color-data-blue)] flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:!flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:!w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-data-blue)]/50" />
                    <Input
                        type="search"
                        placeholder="Rechercher par nom, email ou département..."
                        className="w-full pl-9 border-[var(--color-border-light)] focus-visible:ring-[var(--color-data-light-blue)]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 h-10 w-full md:!w-auto border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                >
                    <Filter className="h-4 w-4" /> Filtrer
                </Button>
            </div>

            <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-[var(--color-muted-light)]">
                    <TabsTrigger
                        value="pending"
                        className="flex gap-2 data-[state=active]:bg-white data-[state=active]:text-[var(--color-data-blue)] data-[state=active]:shadow-none"
                    >
                        <MailOpen className="h-4 w-4" /> Demandes en attente
                        <Badge variant="secondary" className="ml-1 bg-[var(--color-data-teal)]/10 text-[var(--color-data-teal)]">
                            {isLoadingPending ? "..." : pendingProfessors?.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger
                        value="all"
                        className="flex gap-2 data-[state=active]:bg-white data-[state=active]:text-[var(--color-data-blue)] data-[state=active]:shadow-none"
                    >
                        <MailCheck className="h-4 w-4" /> Tous les professeurs
                        <Badge
                            variant="secondary"
                            className="ml-1 bg-[var(--color-data-light-blue)]/10 text-[var(--color-data-light-blue)]"
                        >
                            {isLoadingActive ? "..." : activeProfessors?.length}
                        </Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4 mt-6">
                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl text-[var(--color-data-blue)]">
                                Professeurs en attente de validation
                            </CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Examinez et validez les demandes d'inscription des nouveaux professeurs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoadingPending ? (
                                <LoadingState />
                            ) : filteredPending?.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-[var(--color-muted-light)] flex items-center justify-center mb-4">
                                        <User className="h-6 w-6 text-[var(--color-data-blue)]/50" />
                                    </div>
                                    <h3 className="font-medium text-[var(--color-data-blue)]">Aucune demande en attente</h3>
                                    <p className="text-[var(--color-data-blue)]/70">Toutes les demandes d'inscription ont été traitées</p>
                                </div>
                            ) : (
                                <div className="rounded-md border border-[var(--color-border-light)] overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[var(--color-muted-light)]">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Nom</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Email</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Date de demande
                                            </th>
                                            <th className="py-3 px-4 text-right font-medium text-[var(--color-data-blue)]">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredPending?.map((professor) => (
                                            <tr
                                                key={professor.id}
                                                className="border-t border-[var(--color-border-light)] hover:bg-[var(--color-muted-light)]/30"
                                            >
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8 bg-[var(--color-data-teal)]/10 text-[var(--color-data-teal)]">
                                                            <AvatarFallback>{getInitials(professor.prenom, professor.nom)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium text-[var(--color-data-blue)]">
                                                            {professor.prenom} {professor.nom}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-[var(--color-data-blue)]/70">{professor.email}</td>
                                                <td className="py-3 px-4 hidden md:!table-cell text-[var(--color-data-blue)]/70">
                                                    {formatDate(professor.createdAt)}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            onClick={() => handleApproveProf(professor.id)}
                                                        >
                                                            <Check className="h-4 w-4" /> Accepter
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 gap-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                                            onClick={() => handleRejectProf(professor.id)}
                                                        >
                                                            <X className="h-4 w-4" /> Refuser
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="all" className="space-y-4 mt-6">
                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl text-[var(--color-data-blue)]">Tous les professeurs</CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Gérer les comptes professeurs actifs et inactifs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoadingActive ? (
                                <LoadingState />
                            ) : filteredActive?.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-[var(--color-muted-light)] flex items-center justify-center mb-4">
                                        <User className="h-6 w-6 text-[var(--color-data-blue)]/50" />
                                    </div>
                                    <h3 className="font-medium text-[var(--color-data-blue)]">Aucun professeur trouvé</h3>
                                    <p className="text-[var(--color-data-blue)]/70">Aucun professeur ne correspond à votre recherche</p>
                                </div>
                            ) : (
                                <div className="rounded-md border border-[var(--color-border-light)] overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[var(--color-muted-light)]">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Nom</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Email</th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Examens créés
                                            </th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                                Étudiants
                                            </th>
                                            <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Statut</th>
                                            <th className="py-3 px-4 text-right font-medium text-[var(--color-data-blue)]">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredActive?.map((professor) => (
                                            <tr
                                                key={professor.id}
                                                className="border-t border-[var(--color-border-light)] hover:bg-[var(--color-muted-light)]/30"
                                            >
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8 bg-[var(--color-data-teal)]/10 text-[var(--color-data-teal)]">
                                                            <AvatarFallback>{getInitials(professor.prenom, professor.nom)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium text-[var(--color-data-blue)]">
                                                            {professor.prenom} {professor.nom}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-[var(--color-data-blue)]/70">{professor.email}</td>
                                                <td className="py-3 px-4 hidden md:!table-cell text-[var(--color-data-blue)]/70">
                                                    {professor.examsCount || 0}
                                                </td>
                                                <td className="py-3 px-4 hidden md:!table-cell text-[var(--color-data-blue)]/70">
                                                    {professor.studentsCount || 0}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Badge
                                                        variant={professor.status === "active" ? "default" : "secondary"}
                                                        className={
                                                            professor.status === "active"
                                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                                        }
                                                    >
                                                        {professor.status === "active" ? "Actif" : "Inactif"}
                                                    </Badge>
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
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuLabel className="text-[var(--color-data-blue)]">Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <Eye className="mr-2 h-4 w-4" /> Voir profil
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                                <Edit className="mr-2 h-4 w-4" /> Modifier
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            {professor.status === "active" ? (
                                                                <DropdownMenuItem
                                                                    className="flex items-center text-red-600"
                                                                    onClick={() => handleToggleStatus(professor.id, professor.status)}
                                                                >
                                                                    <Ban className="mr-2 h-4 w-4" /> Désactiver
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem
                                                                    className="flex items-center text-green-600"
                                                                    onClick={() => handleToggleStatus(professor.id, professor.status)}
                                                                >
                                                                    <Check className="mr-2 h-4 w-4" /> Activer
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
                                Affichage de <span className="font-medium text-[var(--color-data-blue)]">{filteredActive?.length}</span>{" "}
                                professeurs sur{" "}
                                <span className="font-medium text-[var(--color-data-blue)]">{activeProfessors?.length}</span>
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
                                    disabled
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

export default AdminProfessors