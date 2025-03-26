"use client"

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
                        Ready to Improve Your Database Skills?
                    </h2>
                    <p className="text-lg text-[var(--color-data-blue)]/80 mb-8">
                        Join thousands of students and professionals who are mastering SQL and database concepts with our
                        comprehensive learning platform.
                    </p>

                    <div className="space-y-6">
                        <ContactCard
                            icon={Mail}
                            title="Contact Us"
                            description="Have questions or feedback? Reach out to our team."
                            linkText="contact@data-eval.com"
                            linkHref="mailto:contact@data-eval.com"
                        />

                        <ContactCard
                            icon={BookOpen}
                            title="Documentation"
                            description="Explore our detailed documentation and user guides."
                            linkText="View Documentation"
                            linkHref="#"
                        />
                    </div>

                    <div className="flex gap-4 mt-8">
                        {socialIcons.map((social, index) => {
                            const Icon = social.icon
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="bg-white p-2 rounded-full border border-[var(--color-border-light)] hover:bg-[var(--color-muted-light)] transition-colors"
                                >
                                    <Icon className="h-5 w-5 text-[var(--color-data-blue)]" />
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-[var(--color-border-light)]">
                    <h3 className="text-2xl font-bold text-[var(--color-data-blue)] mb-6">Get Started Today</h3>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-[var(--color-data-blue)]">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-[var(--color-data-blue)]">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john.doe@example.com"
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Your Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)]"
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="professional">Professional</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-[var(--color-data-blue)]">
                                Message (Optional)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your message..."
                                className="w-full px-3 py-2 border border-[var(--color-border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-data-teal)] min-h-[120px]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)] text-white py-3 rounded-md transition-colors duration-300"
                        >
                            Request Demo Access
                        </button>

                        <p className="text-xs text-center text-[var(--color-data-blue)]/60 mt-4">
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact

