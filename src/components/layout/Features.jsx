import {BrainCircuit, FileText, MessageCircle, LayoutDashboard} from "lucide-react"
import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description, bgColor, iconColor }) {
    return (
        <div id="features" className="bg-white rounded-lg p-8 shadow-sm border border-[var(--color-border-light)] hover:shadow-md transition-all duration-300">
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
            icon: BrainCircuit,
            title: "Correction automatique et intelligente",
            description: "L'IA analyse et note les copies en quelques secondes, garantissant une correction rapide et juste.",
            bgColor: "bg-blue-100",
            iconColor: "text-blue-500",
        },
        {
            icon: FileText,
            title: "Support de multiples formats",
            description: "PDF, LaTeX, Markdown... Téléchargez vos sujets d'examen en toute simplicité.",
            bgColor: "bg-purple-100",
            iconColor: "text-purple-500",
        },
        {
            icon: MessageCircle,
            title: "Feedback détaillé et pédagogique",
            description: "Chaque réponse est accompagnée d'une explication claire et constructive pour aider l'étudiant à progresser.",
            bgColor: "bg-green-100",
            iconColor: "text-green-500",
        },
        {
            icon: LayoutDashboard,
            title: "Interface intuitive et fluide",
            description: "Une plateforme moderne, ergonomique et facile à utiliser pour enseignants et étudiants.",
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-500",
        },
    ];

    return (
        <section id="features" className="section-padding bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-data-blue)] mb-4">
                        Une correction automatisée, précise et rapide
                    </h2>
                    <p className="text-lg text-[var(--color-data-blue)]/80">
                        Découvrez comment Data-Eval transforme l'évaluation des examens grâce à l'IA.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="grid md:!grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Features

