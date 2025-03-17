export default function StatCard({ icon: Icon, title, value, bgColor }) {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 border">
            <div className="flex flex-col gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#0077A2]" />
                </div>
                <div>
                    <div className="text-xs md:text-sm text-gray-500">{title}</div>
                    <div className="text-xl md:text-2xl font-bold text-[#0077A2] mt-1">{value}</div>
                </div>
            </div>
        </div>
    )
}

