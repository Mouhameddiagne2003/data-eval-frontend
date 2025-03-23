import { Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ExamFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
    return (
        <div className="flex flex-col sm:!flex-row gap-4 justify-between items-start sm:!items-center">
            <div className="relative w-full sm:!w-64">
                <Input
                    placeholder="Rechercher un examen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 border-[#d1e3ea] focus:!border-[#0a6e8a] focus-visible:ring-[#4ab7cd] text-[#054257]"
                />
                <Filter className="absolute left-3 top-2.5 h-4 w-4 text-[#0a6e8a]/60" />
            </div>
            <div className="flex gap-2">
                <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    className={`text-xs h-8 cursor-pointer ${
                        statusFilter === "all"
                            ? "bg-[#0a6e8a] text-white hover:!bg-[#0a6e8a]/90"
                            : "border-[#d1e3ea] text-[#054257] hover:!bg-[#0a6e8a]/10 hover:!text-[#0a6e8a]"
                    }`}
                    onClick={() => setStatusFilter("all")}
                >
                    Tous
                </Button>
                <Button
                    variant={statusFilter === "en attente" ? "default" : "outline"}
                    className={`text-xs h-8 cursor-pointer ${
                        statusFilter === "en attente"
                            ? "bg-[#0a6e8a] text-white hover:bg-[#0a6e8a]/90"
                            : "border-[#d1e3ea] text-[#054257] hover:bg-[#0a6e8a]/10 hover:text-[#0a6e8a]"
                    }`}
                    onClick={() => setStatusFilter("en attente")}
                >
                    En attente
                </Button>
                <Button
                    variant={statusFilter === "en cours" ? "default" : "outline"}
                    className={`text-xs h-8 cursor-pointer ${
                        statusFilter === "en cours"
                            ? "bg-[#0a6e8a] text-white hover:bg-[#0a6e8a]/90"
                            : "border-[#d1e3ea] text-[#054257] hover:bg-[#0a6e8a]/10 hover:text-[#0a6e8a]"
                    }`}
                    onClick={() => setStatusFilter("en cours")}
                >
                    En cours
                </Button>
                <Button
                    variant={statusFilter === "terminé" ? "default" : "outline"}
                    className={`text-xs h-8 cursor-pointer ${
                        statusFilter === "terminé"
                            ? "bg-[#0a6e8a] text-white hover:bg-[#0a6e8a]/90"
                            : "border-[#d1e3ea] text-[#054257] hover:bg-[#0a6e8a]/10 hover:text-[#0a6e8a]"
                    }`}
                    onClick={() => setStatusFilter("terminé")}
                >
                    Terminés
                </Button>
            </div>
        </div>
    )
}

export default ExamFilters

