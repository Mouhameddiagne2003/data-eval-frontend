import { Link } from "react-router-dom"

export default function ActionCard({ title, description, buttonText, buttonLink, isNew }) {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 border">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#0077A2]">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
                {isNew && (
                    <span className="px-2 py-1 md:px-3 md:py-1 bg-blue-50 text-blue-600 text-xs rounded-full w-fit">
            Nouvelle fonction
          </span>
                )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                <div className="w-full h-16 md:h-20 bg-gray-100 rounded-lg"></div>
            </div>

            <Link
                to={buttonLink || "#"}
                className="block w-full py-2 md:py-3 bg-[#0077A2] text-white text-center rounded-lg hover:bg-[#0077A2]/90 transition-colors"
            >
                {buttonText}
            </Link>
        </div>
    )
}

