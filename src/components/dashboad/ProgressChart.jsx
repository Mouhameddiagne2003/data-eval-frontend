import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
    { month: "Jan", moyenne: 12 },
    { month: "Fév", moyenne: 13 },
    { month: "Mar", moyenne: 14.2 },
    { month: "Avr", moyenne: 13.5 },
    { month: "Mai", moyenne: 15 },
    { month: "Juin", moyenne: 15.5 },
]

export default function ProgressChart() {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 border">
            <h3 className="text-base md:text-lg font-semibold text-[#0077A2]">Évolution des moyennes</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 mb-4 md:mb-6">Progression sur les 6 derniers mois</p>

            <div className="h-[200px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} />
                        <YAxis domain={[8, 16]} axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} />
                        <Line
                            type="monotone"
                            dataKey="moyenne"
                            stroke="#0077A2"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#0077A2", strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: "#0077A2", strokeWidth: 0 }}
                            name="moyenne"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

