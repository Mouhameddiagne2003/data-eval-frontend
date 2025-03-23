import { Users, ClipboardList, Percent, Clock } from "lucide-react";

export const statsData = [
    {
        label: "Examens créés",
        key: "totalExams",
        icon: ClipboardList,
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
        defaultValue: "20",
    },
    {
        label: "Étudiants évalués",
        key: "totalStudentsEvaluated",
        icon: Users,
        bgColor: "bg-green-100",
        textColor: "text-green-600",
        defaultValue: "110",
    },
    {
        label: "Taux de réussite moyen",
        key: "successRate",
        icon: Percent,
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
        defaultValue: "80 %",
    },
    {
        label: "Examens en attente de correction",
        key: "pendingCorrections",
        icon: Clock,
        bgColor: "bg-amber-100",
        textColor: "text-amber-600",
        defaultValue: "2",
    },
];
