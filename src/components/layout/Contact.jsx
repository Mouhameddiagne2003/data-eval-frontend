import { useState } from "react"
import { Mail, BookOpen, Github, Twitter, Linkedin } from "lucide-react"

function ContactCard({ icon: Icon, title, description, linkText, linkHref }) {
    return (
        <div id="contact" className="bg-white p-6 rounded-lg shadow-sm border border-[var(--color-border-light)] flex gap-4 hover:shadow-md transition-all duration-300">
            <div className="bg-[var(--color-data-teal)] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
                <h3 className="text-lg font-medium text-[var(--color-data-blue)] mb-1">{title}</h3>
                <p className="text-[var(--color-data-blue)]/70 mb-2">{description}</p>
                <a
                    href={linkHref}
                    className="text-[var(--color-data-light-blue)] hover:text-[var(--color-data-teal)] transition-colors"
                >
                    {linkText}
                </a>
            </div>
        </div>
    )
}

function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "student",
        message: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Ici vous pourriez ajouter la logique pour envoyer les données du formulaire
    }

    const socialIcons = [
        { icon: Github, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
    ]

    return (
        <section id="contact" className="section-padding bg-[var(--color-muted-light)]">
            <div className="container grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-data-blue)] mb-6">
                        Contactez-nous
                    </h2>
                    <p className="text-lg text-[var(--color-data-blue)]/80 mb-8">
                        Vous avez une question, une suggestion ou un retour ?
                        Notre équipe est à votre écoute. Remplissez le formulaire
                        et nous vous répondrons dans les meilleurs délais.
                    </p>

                    <div className="space-y-6">
                        <ContactCard
                            icon={Mail}
                            title="Support"
                            description="Besoin d'aide ? Contactez-nous directement."
                            linkText="support@data-eval.com"
                            linkHref="mailto:support@data-eval.com"
                        />

                        <ContactCard
                            icon={BookOpen}
                            title="Documentation"
                            description="Découvrez notre documentation et guide d'utilisation"
                            linkText="Consulter la documentation"
                            linkHref="/docs"
                        />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-[var(--color-border-light)]">
                    <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mb-6">
                        Envoyez-nous un Message
                    </h3>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName"
                                       className="text-sm font-medium text-[var(--color-data-blue)]">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Votre prénom"
                                    className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-[var(--color-data-blue)]">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                    className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Adresse E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="votre.email@exemple.com"
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Votre Rôle
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                required
                            >
                                <option value="">Sélectionnez votre rôle</option>
                                <option value="student">Étudiant</option>
                                <option value="teacher">Enseignant</option>
                                <option value="professional">Professionnel</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Sujet
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                required
                            >
                                <option value="">Choisissez un sujet</option>
                                <option value="support">Support technique</option>
                                <option value="feature-request">Suggestion de fonctionnalité</option>
                                <option value="bug-report">Signalement de bug</option>
                                <option value="partnership">Partenariat</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Votre Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Écrivez votre message ici..."
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)] min-h-[120px]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)] text-white py-3 rounded-md transition-colors duration-300"
                        >
                            Envoyer le Message
                        </button>

                        <p className="text-xs text-center text-[var(--color-data-blue)]/60 mt-4">
                            Nous vous répondrons dans les 48 heures.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact

