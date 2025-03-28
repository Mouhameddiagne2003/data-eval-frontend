import { Database } from "lucide-react"

function Hero() {
    return (
        <section className="py-16 md:!py-32 bg-gradient-to-br from-[var(--color-bg-light)] to-[var(--color-muted-light)]">
            <div className="container grid md:!grid-cols-2 gap-12 items-center">
                <div className="fade-in">
                    <h1 className="text-4xl md:!text-5xl lg:!text-6xl font-bold text-[var(--color-data-blue)] mb-6">
                        <span className="block">Révolutionnez la </span>
                        <span className="block"> correction de vos</span>
                        <span className="block text-[var(--color-data-light-blue)]"> examens avec l'IA !</span>
                    </h1>
                    <p className="text-lg text-[var(--color-data-blue)]/80 mb-8">
                        Gagnez du temps, améliorez la précision et offrez un retour détaillé aux étudiants grâce à Data-Eval.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#contact" className="btn-primary text-lg flex items-center gap-2">
                            Get Started <span className="ml-1">→</span>
                        </a>
                        <a href="#features" className="btn-outline text-lg">
                            Learn More
                        </a>
                    </div>
                </div>

                <div className="slide-up">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-[var(--color-border-light)] relative">
                        <div className="bg-[var(--color-data-teal)] p-4 text-white flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            <span>SQL Query</span>
                        </div>
                        <div className="bg-[#1e1e1e] text-white p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap">
                <span className="text-blue-400">SELECT</span> e.employee_id, e.first_name, e.last_name,{" "}
                  <span className="text-yellow-400">COUNT</span>(o.order_id) <span className="text-blue-400">AS</span>{" "}
                  total_orders
                <br />
                <span className="text-blue-400">FROM</span> employees e
                <br />
                <span className="text-blue-400">LEFT JOIN</span> orders o <span className="text-blue-400">ON</span>{" "}
                  e.employee_id = o.employee_id
                <br />
                <span className="text-blue-400">GROUP BY</span> e.employee_id, e.first_name, e.last_name
                <br />
                <span className="text-blue-400">ORDER BY</span> total_orders <span className="text-blue-400">DESC</span>
                ;
              </pre>
                        </div>
                        <div className="p-4 border-t border-[var(--color-border-light)]">
                            <div className="text-[var(--color-data-blue)] font-medium mb-1">Query Result</div>
                            <div className="text-sm text-[var(--color-data-blue)]/70">5 rows returned in 0.03s</div>
                        </div>
                        <div className="absolute top-4 right-4 bg-[var(--color-accent)] text-white px-4 py-2 rounded-full font-bold">
                            100% <span className="block text-xs text-center">Accuracy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero

