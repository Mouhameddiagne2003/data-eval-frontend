"use client"

import { useState } from "react"
import {
    Search,
    User,
    Filter,
    Download,
    MoreHorizontal,
    Pencil,
    Trash2,
    UserCog,
    UserPlus,
    Users,
    UserCircle,
    ShieldCheck,
    GraduationCap,
    Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample data for demonstration
const users = [
    {
        id: 1,
        name: "Sophie Martin",
        email: "sophie.martin@example.com",
        role: "professor",
        department: "Informatique",
        status: "active",
        lastActive: "2023-06-15T10:30:00",
    },
    {
        id: 2,
        name: "Thomas Dubois",
        email: "thomas.dubois@example.com",
        role: "professor",
        department: "Mathématiques",
        status: "active",
        lastActive: "2023-06-14T14:20:00",
    },
    {
        id: 3,
        name: "Marie Laurent",
        email: "marie.laurent@example.com",
        role: "professor",
        department: "Sciences des données",
        status: "active",
        lastActive: "2023-06-12T09:15:00",
    },
    {
        id: 4,
        name: "Lucas Bernard",
        email: "lucas.bernard@example.com",
        role: "student",
        department: "Informatique",
        status: "active",
        lastActive: "2023-06-16T11:45:00",
    },
    {
        id: 5,
        name: "Emma Rousseau",
        email: "emma.rousseau@example.com",
        role: "student",
        department: "Mathématiques",
        status: "active",
        lastActive: "2023-06-15T16:30:00",
    },
    {
        id: 6,
        name: "Hugo Lefebvre",
        email: "hugo.lefebvre@example.com",
        role: "student",
        department: "Sciences des données",
        status: "inactive",
        lastActive: "2023-06-10T08:20:00",
    },
    {
        id: 7,
        name: "Léa Moreau",
        email: "lea.moreau@example.com",
        role: "student",
        department: "Informatique",
        status: "active",
        lastActive: "2023-06-16T10:10:00",
    },
    {
        id: 8,
        name: "Arthur Dupont",
        email: "arthur.dupont@example.com",
        role: "admin",
        department: "Administration",
        status: "active",
        lastActive: "2023-06-16T15:30:00",
    },
]

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Apply filters
    const filteredUsers = users.filter((user) => {
        // Search filter
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.department.toLowerCase().includes(searchTerm.toLowerCase())

        // Role filter
        const matchesRole = roleFilter === "all" || user.role === roleFilter

        // Status filter
        const matchesStatus = statusFilter === "all" || user.status === statusFilter

        return matchesSearch && matchesRole && matchesStatus
    })

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

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
    }

    const getRoleBadge = (role) => {
        switch (role) {
            case "admin":
                return (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
                        <ShieldCheck className="mr-1 h-3 w-3" /> Admin
                    </Badge>
                )
            case "professor":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                        <GraduationCap className="mr-1 h-3 w-3" /> Professeur
                    </Badge>
                )
            case "student":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        <UserCircle className="mr-1 h-3 w-3" /> Étudiant
                    </Badge>
                )
            default:
                return <Badge>{role}</Badge>
        }
    }

    // Count users by role
    const adminCount = users.filter((user) => user.role === "admin").length
    const professorCount = users.filter((user) => user.role === "professor").length
    const studentCount = users.filter((user) => user.role === "student").length
    const activeCount = users.filter((user) => user.status === "active").length

    return (
        <div className="space-y-6 p-6 md:!p-8">
            <div className="flex flex-col md:!flex-row md:!items-center md:!justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-data-blue)]">Gestion des Utilisateurs</h2>
                    <p className="text-sm text-[var(--color-data-blue)]/70 mt-1">
                        {users.length} utilisateurs enregistrés sur la plateforme
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 border-[var(--color-border-light)] text-[var(--color-data-blue)]">
                        <Download className="h-4 w-4" /> Exporter
                    </Button>
                    <Button className="gap-2 bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)]">
                        <UserPlus className="h-4 w-4" /> Nouvel utilisateur
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 gap-4">
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Total Utilisateurs</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">{users.length}</h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-data-teal)]/10 text-[var(--color-data-teal)] flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Professeurs</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">{professorCount}</h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-data-light-blue)]/10 text-[var(--color-data-light-blue)] flex items-center justify-center">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Étudiants</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">{studentCount}</h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center">
                                <UserCircle className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-[var(--color-border-light)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-[var(--color-data-blue)]/70">Utilisateurs Actifs</p>
                                <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mt-1">{activeCount}</h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-[var(--color-border-light)]">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[var(--color-data-blue)]">Tous les utilisateurs</CardTitle>
                    <CardDescription className="text-[var(--color-data-blue)]/70">
                        Gérez tous les utilisateurs de la plateforme
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col md:!flex-row gap-4">
                        <div className="relative w-full md:!flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--color-data-blue)]/50" />
                            <Input
                                type="search"
                                placeholder="Rechercher par nom, email ou département..."
                                className="w-full pl-9 border-[var(--color-border-light)] focus-visible:ring-[var(--color-data-light-blue)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:!flex-row gap-2 w-full md:!w-auto">
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full md:!w-[180px] border-[var(--color-border-light)]">
                                    <SelectValue placeholder="Tous les rôles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les rôles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="professor">Professeur</SelectItem>
                                    <SelectItem value="student">Étudiant</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:!w-[180px] border-[var(--color-border-light)]">
                                    <SelectValue placeholder="Tous les statuts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="active">Actif</SelectItem>
                                    <SelectItem value="inactive">Inactif</SelectItem>
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

                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="mx-auto h-12 w-12 rounded-full bg-[var(--color-muted-light)] flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-[var(--color-data-blue)]/50" />
                            </div>
                            <h3 className="font-medium text-[var(--color-data-blue)]">Aucun utilisateur trouvé</h3>
                            <p className="text-[var(--color-data-blue)]/70">Modifiez vos filtres pour voir plus de résultats</p>
                        </div>
                    ) : (
                        <div className="rounded-md border border-[var(--color-border-light)] overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-[var(--color-muted-light)]">
                                <tr>
                                    <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Nom</th>
                                    <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Email</th>
                                    <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                        Département
                                    </th>
                                    <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Rôle</th>
                                    <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)] hidden md:!table-cell">
                                        Dernière connexion
                                    </th>
                                    <th className="py-3 px-4 text-left font-medium text-[var(--color-data-blue)]">Statut</th>
                                    <th className="py-3 px-4 text-right font-medium text-[var(--color-data-blue)]">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-[var(--color-border-light)] hover:bg-[var(--color-muted-light)]/30"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    className={`h-8 w-8 ${
                                                        user.role === "admin"
                                                            ? "bg-purple-100 text-purple-600"
                                                            : user.role === "professor"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : "bg-green-100 text-green-600"
                                                    }`}
                                                >
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-[var(--color-data-blue)]">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-[var(--color-data-blue)]/70">{user.email}</td>
                                        <td className="py-3 px-4 hidden md:!table-cell text-[var(--color-data-blue)]/70">
                                            {user.department}
                                        </td>
                                        <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                                        <td className="py-3 px-4 hidden md:!table-cell">
                                            <div className="flex items-center gap-1 text-[var(--color-data-blue)]/70">
                                                <Clock className="h-3 w-3" />
                                                <span>{formatDate(user.lastActive)}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Badge
                                                variant={user.status === "active" ? "default" : "secondary"}
                                                className={
                                                    user.status === "active"
                                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                                }
                                            >
                                                {user.status === "active" ? "Actif" : "Inactif"}
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
                                                        <User className="mr-2 h-4 w-4" /> Voir profil
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                        <Pencil className="mr-2 h-4 w-4" /> Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                                        <UserCog className="mr-2 h-4 w-4" /> Changer de rôle
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
                        Affichage de <span className="font-medium text-[var(--color-data-blue)]">{filteredUsers.length}</span> sur{" "}
                        <span className="font-medium text-[var(--color-data-blue)]">{users.length}</span> utilisateurs
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
        </div>
    )
}

export default AdminUsers

