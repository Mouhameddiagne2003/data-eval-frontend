"use client"

import { useState } from "react"
import {
    Shield,
    Plus,
    Check,
    MoreHorizontal,
    Edit,
    Trash,
    ChevronRight,
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion,
    User,
    FileText,
    Settings,
    Database,
    Save,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"

// Sample role data
const roles = [
    {
        id: 1,
        name: "Admin",
        description: "Accès complet à toutes les fonctionnalités de la plateforme",
        users: 2,
        icon: ShieldAlert,
        color: "purple",
    },
    {
        id: 2,
        name: "Professeur",
        description: "Peut créer et gérer des examens, voir et évaluer les soumissions",
        users: 38,
        icon: ShieldCheck,
        color: "blue",
    },
    {
        id: 3,
        name: "Étudiant",
        description: "Peut passer des examens et voir ses résultats",
        users: 208,
        icon: ShieldQuestion,
        color: "green",
    },
    {
        id: 4,
        name: "Responsable de département",
        description: "Peut gérer les professeurs et examens de son département",
        users: 5,
        icon: Shield,
        color: "orange",
    },
]

// Sample permissions data
const permissionGroups = [
    {
        name: "Utilisateurs",
        icon: User,
        permissions: [
            { id: "users.view", name: "Voir les utilisateurs", admin: true, professor: false, student: false, dept: true },
            {
                id: "users.create",
                name: "Créer des utilisateurs",
                admin: true,
                professor: false,
                student: false,
                dept: false,
            },
            {
                id: "users.edit",
                name: "Modifier les utilisateurs",
                admin: true,
                professor: false,
                student: false,
                dept: true,
            },
            {
                id: "users.delete",
                name: "Supprimer des utilisateurs",
                admin: true,
                professor: false,
                student: false,
                dept: false,
            },
        ],
    },
    {
        name: "Examens",
        icon: FileText,
        permissions: [
            { id: "exams.view", name: "Voir tous les examens", admin: true, professor: false, student: false, dept: true },
            { id: "exams.create", name: "Créer des examens", admin: true, professor: true, student: false, dept: true },
            { id: "exams.edit", name: "Modifier des examens", admin: true, professor: true, student: false, dept: true },
            { id: "exams.delete", name: "Supprimer des examens", admin: true, professor: false, student: false, dept: true },
            { id: "exams.take", name: "Passer des examens", admin: true, professor: false, student: true, dept: false },
        ],
    },
    {
        name: "Système",
        icon: Settings,
        permissions: [
            { id: "system.settings", name: "Paramètres système", admin: true, professor: false, student: false, dept: false },
            { id: "system.logs", name: "Consulter les logs", admin: true, professor: false, student: false, dept: false },
            {
                id: "system.backup",
                name: "Gérer les sauvegardes",
                admin: true,
                professor: false,
                student: false,
                dept: false,
            },
        ],
    },
    {
        name: "Données",
        icon: Database,
        permissions: [
            { id: "data.export", name: "Exporter des données", admin: true, professor: true, student: false, dept: true },
            { id: "data.import", name: "Importer des données", admin: true, professor: false, student: false, dept: false },
            { id: "data.analytics", name: "Voir les statistiques", admin: true, professor: true, student: false, dept: true },
        ],
    },
]

const AdminRoles = () => {
    const [selectedRole, setSelectedRole] = useState("Admin")
    const [expandedGroups, setExpandedGroups] = useState(["Utilisateurs"])

    // Get the color for the selected role
    const getSelectedRoleColor = () => {
        const role = roles.find((r) => r.name === selectedRole)
        return role?.color || "blue"
    }

    // Get the icon for the selected role
    const getSelectedRoleIcon = () => {
        const role = roles.find((r) => r.name === selectedRole)
        return role?.icon || Shield
    }

    // Get the badge color based on role
    const getRoleBadgeStyles = (roleName) => {
        switch (roleName) {
            case "Admin":
                return "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
            case "Professeur":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
            case "Étudiant":
                return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
            case "Responsable de département":
                return "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
        }
    }

    // Get the background color for role card
    const getRoleCardStyles = (roleName) => {
        if (selectedRole === roleName) {
            switch (roleName) {
                case "Admin":
                    return "border-purple-300 bg-purple-50"
                case "Professeur":
                    return "border-blue-300 bg-blue-50"
                case "Étudiant":
                    return "border-green-300 bg-green-50"
                case "Responsable de département":
                    return "border-orange-300 bg-orange-50"
                default:
                    return "border-[var(--color-border-light)] bg-[var(--color-muted-light)]"
            }
        }
        return "border-transparent hover:bg-[var(--color-muted-light)]"
    }

    // Get the icon background color
    const getRoleIconStyles = (roleName) => {
        if (selectedRole === roleName) {
            switch (roleName) {
                case "Admin":
                    return "bg-purple-100 text-purple-600"
                case "Professeur":
                    return "bg-blue-100 text-blue-600"
                case "Étudiant":
                    return "bg-green-100 text-green-600"
                case "Responsable de département":
                    return "bg-orange-100 text-orange-600"
                default:
                    return "bg-[var(--color-muted-light)] text-[var(--color-data-blue)]"
            }
        }
        return "bg-[var(--color-muted-light)] text-[var(--color-data-blue)]/70"
    }

    // Toggle accordion groups
    const toggleGroup = (groupName) => {
        setExpandedGroups((prev) => (prev.includes(groupName) ? prev.filter((g) => g !== groupName) : [...prev, groupName]))
    }

    const SelectedRoleIcon = getSelectedRoleIcon()

    return (
        <div className="space-y-6 p-6 md:!p-8">
            <div className="flex flex-col md:!flex-row md:!items-center md:!justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-data-blue)]">Rôles & Permissions</h2>
                    <p className="text-sm text-[var(--color-data-blue)]/70 mt-1">
                        Gérer les rôles et définir les permissions pour chaque type d'utilisateur
                    </p>
                </div>
                <Button className="gap-2 bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)]">
                    <Plus className="h-4 w-4" /> Nouveau rôle
                </Button>
            </div>

            <div className="grid grid-cols-1 md:!grid-cols-3 gap-6">
                <div className="md:!col-span-1 space-y-6">
                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl text-[var(--color-data-blue)]">Rôles utilisateurs</CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Définir les différents rôles sur la plateforme
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer border transition-colors ${getRoleCardStyles(role.name)}`}
                                    onClick={() => setSelectedRole(role.name)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-10 w-10 rounded-full ${getRoleIconStyles(role.name)} flex items-center justify-center`}
                                        >
                                            <role.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-[var(--color-data-blue)]">{role.name}</div>
                                            <div className="text-xs text-[var(--color-data-blue)]/60">{role.users} utilisateurs</div>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-[var(--color-data-blue)]/50" />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="pt-2">
                            <Button
                                variant="outline"
                                className="w-full border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                            >
                                Gérer les attributions de rôles
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xl text-[var(--color-data-blue)]">Détails du rôle</CardTitle>
                            <CardDescription className="text-[var(--color-data-blue)]/70">
                                Informations sur le rôle sélectionné
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-12 w-12 rounded-full ${getRoleIconStyles(selectedRole)} flex items-center justify-center`}
                                >
                                    <SelectedRoleIcon className="h-6 w-6"/>
                                </div>
                                <div>
                                    <div
                                        className="font-medium text-lg text-[var(--color-data-blue)]">{selectedRole}</div>
                                    <Badge className={getRoleBadgeStyles(selectedRole)}>
                                        {roles.find((r) => r.name === selectedRole)?.users} utilisateurs
                                    </Badge>
                                </div>
                            </div>

                            <div className="h-px w-full bg-[var(--color-border-light)]"/>

                            <div>
                                <h4 className="text-sm font-medium text-[var(--color-data-blue)] mb-1">Description</h4>
                                <p className="text-sm text-[var(--color-data-blue)]/70">
                                    {roles.find((r) => r.name === selectedRole)?.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:!col-span-2 space-y-6">
                    <Card className="border-[var(--color-border-light)]">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <div>
                                <CardTitle className="text-xl text-[var(--color-data-blue)]">Permissions pour {selectedRole}</CardTitle>
                                <CardDescription className="text-[var(--color-data-blue)]/70">
                                    Définir les accès et capacités pour le rôle {selectedRole}
                                </CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-9 w-9 border-[var(--color-border-light)]">
                                        <MoreHorizontal className="h-4 w-4 text-[var(--color-data-blue)]" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="text-[var(--color-data-blue)]">Actions</DropdownMenuLabel>
                                    <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                        <Edit className="mr-2 h-4 w-4" /> Renommer
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center text-[var(--color-data-blue)]">
                                        <Check className="mr-2 h-4 w-4" /> Tout cocher
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center text-red-600">
                                        <Trash className="mr-2 h-4 w-4" /> Supprimer
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Badge className={`${getRoleBadgeStyles(selectedRole)} flex items-center gap-1.5`}>
                                    <SelectedRoleIcon className="h-3 w-3"/>
                                    {selectedRole}
                                </Badge>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 border-[var(--color-border-light)] text-[var(--color-data-blue)]"
                                >
                                    <Save className="h-3.5 w-3.5"/> Enregistrer
                                </Button>
                            </div>

                            <div className="h-px w-full bg-[var(--color-border-light)]"/>

                            <Accordion type="multiple" className="w-full" value={expandedGroups}
                                       onValueChange={setExpandedGroups}>
                                {permissionGroups.map((group) => (
                                    <AccordionItem
                                        key={group.name}
                                        value={group.name}
                                        className="border-b border-[var(--color-border-light)]"
                                    >
                                        <AccordionTrigger
                                            className="hover:no-underline py-3"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                toggleGroup(group.name)
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-8 w-8 rounded-full bg-[var(--color-muted-light)] text-[var(--color-data-blue)] flex items-center justify-center">
                                                    <group.icon className="h-4 w-4"/>
                                                </div>
                                                <span
                                                    className="font-medium text-[var(--color-data-blue)]">{group.name}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-1 pt-1 pb-2">
                                                {group.permissions.map((permission) => (
                                                    <div
                                                        key={permission.id}
                                                        className="flex items-center justify-between rounded-md p-2.5 hover:bg-[var(--color-muted-light)]"
                                                    >
                                                        <div
                                                            className="text-sm text-[var(--color-data-blue)]">{permission.name}</div>
                                                        <Switch
                                                            checked={
                                                                selectedRole === "Admin"
                                                                    ? permission.admin
                                                                    : selectedRole === "Professeur"
                                                                        ? permission.professor
                                                                        : selectedRole === "Étudiant"
                                                                            ? permission.student
                                                                            : permission.dept
                                                            }
                                                            className="data-[state=checked]:bg-[var(--color-data-teal)]"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                        <CardFooter className="border-t border-[var(--color-border-light)] flex justify-between py-4">
                            <Button variant="outline" className="border-[var(--color-border-light)] text-[var(--color-data-blue)]">
                                Réinitialiser
                            </Button>
                            <Button className="bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)]">
                                Enregistrer les modifications
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AdminRoles

