import { Database, Activity, CheckCircle } from "lucide-react"

function FeatureCard({ icon: Icon, title, description, bgColor, iconColor }) {
    return (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-[var(--color-border-light)] hover:shadow-md transition-all duration-300">
            <div className={`${bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                <Icon className={`h-8 w-8 ${iconColor}`} />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-data-blue)] mb-3">{title}</h3>
            <p className="text-[var(--color-data-blue)]/80">{description}</p>
            <div className="mt-6 border-t border-[var(--color-border-light)] pt-6">
                <div className="w-8 h-1 bg-[var(--color-data-light-blue)] rounded-full"></div>
            </div>
        </div>
    )
}

function Features() {
    const features = [
        {
            icon: Database,
            title: "SQL Query Evaluation",
            description: "Submit SQL queries and get instant feedback on syntax, performance, and correctness.",
            bgColor: "bg-blue-100",
            iconColor: "text-[var(--color-data-teal)]",
        },
        {
            icon: Activity,
            title: "Real Database Integration",
            description: "Practice on real-world database schemas with safe execution environments.",
            bgColor: "bg-purple-100",
            iconColor: "text-purple-500",
        },
        {
            icon: CheckCircle,
            title: "Automated Assessment",
            description: "Receive detailed scoring and feedback on every exercise automatically.",
            bgColor: "bg-green-100",
            iconColor: "text-green-500",
        },
    ]

    return (
        <section id="features" className="section-padding bg-white">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-data-blue)] mb-4">
                        Powerful Features for SQL Learning and Evaluation
                    </h2>
                    <p className="text-lg text-[var(--color-data-blue)]/80">
                        Our platform provides comprehensive tools for learning, practicing, and evaluating SQL skills with instant
                        feedback and detailed analytics.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            bgColor={feature.bgColor}
                            iconColor={feature.iconColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features

