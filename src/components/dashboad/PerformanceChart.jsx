import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
    { subject: "Théorie BDD", note: 14 },
    { subject: "", note: 12 },
    { subject: "NoSQL", note: 15 },
    { subject: "", note: 11 },
    { subject: "Transactions", note: 13 },
]

export default function PerformanceChart() {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 border">
            <h3 className="text-base md:text-lg font-semibold text-[#0077A2]">Notes moyennes par examen</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 mb-4 md:mb-6">Performance des étudiants par sujet</p>

            <div className="h-[200px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} />
                        <YAxis domain={[0, 20]} axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} />
                        <Bar dataKey="note" fill="#4AB7CD" radius={[4, 4, 0, 0]} barSize={40} name="note" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

