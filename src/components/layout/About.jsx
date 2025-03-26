function InterfaceCard({ title, description, gradientFrom, gradientTo }) {
    return (
        <div id="about" className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className={`h-2 bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`}></div>
            <div className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full mb-6"></div>
                <h3 className="text-xl font-bold text-[var(--color-data-blue)] mb-3">{title}</h3>
                <p className="text-[var(--color-data-blue)]/80 mb-6">{description}</p>
                <button className="border border-[var(--color-data-blue)] text-[var(--color-data-blue)] px-4 py-2 rounded flex items-center gap-2 hover:bg-[var(--color-data-blue)] hover:text-white transition-all duration-300">
                    Explore Interface <span>→</span>
                </button>
            </div>
        </div>
    )
}

function About() {
    const interfaces = [
        {
            title: "Student Dashboard",
            description: "Access exercises, submit queries, receive instant feedback, and track your progress over time.",
            gradientFrom: "blue-400",
            gradientTo: "cyan-400",
        },
        {
            title: "Professor Interface",
            description: "Create exercises, evaluate student performance, provide feedback, and manage coursework.",
            gradientFrom: "purple-400",
            gradientTo: "pink-500",
        },
        {
            title: "Admin Panel",
            description: "Manage users, oversee system performance, configure settings, and access comprehensive analytics.",
            gradientFrom: "orange-400",
            gradientTo: "red-500",
        },
    ]

    return (
        <section id="about" className="section-padding bg-[var(--color-muted-light)]">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-data-blue)] mb-4">
                        Tailored Interfaces for Every Role
                    </h2>
                    <p className="text-lg text-[var(--color-data-blue)]/80">
                        DATA-EVAL provides specialized interfaces for students, professors, and administrators, each designed to
                        meet the specific needs of its users.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {interfaces.map((item, index) => (
                        <InterfaceCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            gradientFrom={item.gradientFrom}
                            gradientTo={item.gradientTo}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About

