import { Link } from "react-router-dom"
import { MoreVertical } from "lucide-react"

export default function ExamTable() {
    const exams = [
        {
            id: 1,
            title: "Base de données avancées",
            classe: "TECH-3A",
            code: "zf98xTGVu",
            participants: 34,
            soumissions: 23,
            planification: {
                debut: "14 Mars 2024",
                fin: "17 Mars 2024",
            },
            statut: "En cours",
        },
    ]

    return (
        <div className="bg-white rounded-lg border">
            <div className="flex justify-between items-center p-4 md:p-6 border-b">
                <h3 className="text-base md:text-lg font-semibold text-[#0077A2]">Historique des examens</h3>
                <Link to="/examens" className="text-[#0077A2] text-sm hover:underline">
                    Voir tout
                </Link>
            </div>

            {/* Table for desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Participants
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Soumissions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Planification
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.map((exam) => (
                        <tr key={exam.id} className="border-b">
                            <td className="px-6 py-4 text-sm text-gray-900">{exam.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{exam.classe}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{exam.code}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{exam.participants}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {exam.soumissions}/{exam.participants}
                    </span>
                                    <div className="w-24 h-2 bg-gray-100 rounded-full">
                                        <div
                                            className="h-full bg-[#4AB7CD] rounded-full"
                                            style={{ width: `${(exam.soumissions / exam.participants) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">
                                    <div>{exam.planification.debut}</div>
                                    <div>{exam.planification.fin}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">{exam.statut}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-500">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for mobile */}
            <div className="md:hidden">
                {exams.map((exam) => (
                    <div key={exam.id} className="p-4 border-b">
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{exam.title}</div>
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">{exam.statut}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            {exam.classe} • Code: {exam.code}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Participants: {exam.participants}</span>
                            <span>
                Soumissions: {exam.soumissions}/{exam.participants}
              </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
                            <div
                                className="h-full bg-[#4AB7CD] rounded-full"
                                style={{ width: `${(exam.soumissions / exam.participants) * 100}%` }}
                            ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                            {exam.planification.debut} - {exam.planification.fin}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

