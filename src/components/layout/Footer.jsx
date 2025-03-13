import { Database, Github, Twitter, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bg-[#001F2D] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Logo and Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
                                <Database className="absolute inset-0 m-auto h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">
                DATA-<span className="text-[var(--color-data-light-blue)]">EVAL</span>
              </span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            The premier platform for SQL learning and evaluation with instant feedback.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-white/60 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8">
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} DATA-EVAL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

