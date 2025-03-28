import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import { User, GraduationCap, Settings } from "lucide-react";


function InterfaceCard({ title, description, gradientFrom, gradientTo, icon: Icon }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div className={`h-2 bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`}></div>
            <div className="p-8 flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-[var(--color-muted-light)] text-[var(--color-data-blue)] rounded-full mb-6">
                    <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-data-blue)] mb-3">{title}</h3>
                <p className="text-[var(--color-data-blue)]/80 text-center">{description}</p>
                <Link to="/login">
                    <button
                        className="mt-4 border border-[var(--color-data-blue)] text-[var(--color-data-blue)] px-4 py-2 rounded flex items-center gap-2 hover:!bg-[var(--color-data-blue)] hover:!text-white transition-all duration-300 cursor-pointer">
                        Explorer l'interface <span>→</span>
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}

function About() {
    const interfaces = [
        {
            title: "Tableau de bord étudiant",
            description: "Accédez à vos examens, soumettez vos réponses et recevez un feedback instantané avec des corrections détaillées.",
            gradientFrom: "blue-400",
            gradientTo: "cyan-400",
            icon: GraduationCap,
        },
        {
            title: "Espace professeur",
            description: "Créez des examens, suivez les performances de vos étudiants et ajustez les notes manuellement si nécessaire.",
            gradientFrom: "purple-400",
            gradientTo: "pink-500",
            icon: User,
        },
        {
            title: "Panneau administrateur",
            description: "Gérez les utilisateurs, surveillez les performances de la plateforme et configurez les paramètres globaux.",
            gradientFrom: "orange-400",
            gradientTo: "red-500",
            icon: Settings,
        },
    ];

    return (
        <section id="about" className="section-padding bg-[var(--color-muted-light)]">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-data-blue)] mb-4">
                        Des interfaces adaptées à chaque utilisateur
                    </h2>
                    <p className="text-lg text-[var(--color-data-blue)]/80">
                        Data-Eval propose des espaces dédiés aux étudiants, professeurs et administrateurs, offrant une expérience optimisée pour chaque rôle.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {interfaces.map((item, index) => (
                        <InterfaceCard key={index} {...item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}


export default About;

