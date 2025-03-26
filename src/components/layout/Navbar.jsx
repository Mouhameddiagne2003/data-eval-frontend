import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Database, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Tableau d'objets pour stocker les liens
    const navItems = [
        { label: "Home", path: "/" },
        { label: "Features", path: "#features" },
        { label: "About", path: "#about" },
        { label: "Contact", path: "#contact" }
    ];

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-2" : "bg-transparent py-4"
            }`}
        >
            <div className="container flex items-center justify-between">
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border-light bg-muted-light">
                        <Database className="absolute inset-0 m-auto h-6 w-6 text-data-teal" />
                    </div>
                    <span className="text-xl font-bold">
                        <span className="text-data-blue">DATA-</span>
                        <span className="text-data-light-blue">EVAL</span>
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="md:!flex hidden items-center space-x-8">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                            <Link
                                to={item.path}
                                className=" text-bg-dark transition-colors relative group "
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-data-teal transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6 text-data-blue" /> : <Menu className="h-6 w-6 text-data-blue" />}
                    </Button>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:!flex items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button variant="outline" className="outline-none bg-bg-light border-data-teal text-data-teal hover:bg-bg-dark hover:text-white">
                            <Link to="/login" className="text-inherit hover:text-inherit hover:border-inherit">
                                Login
                            </Link>

                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Link to="/register">
                            <Button className="bg-data-teal text-white hover:bg-data-blue">Sign Up</Button>
                        </Link>

                    </motion.div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border-light shadow-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="container py-4 flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className="text-data-blue hover:text-data-teal transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-2 pt-4 border-t border-border-light">
                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    className="border-data-teal text-data-teal hover:bg-data-teal hover:text-white w-full"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                className="border-data-teal text-data-teal hover:bg-data-teal hover:text-white w-full"
                            >
                                Login
                            </Button>
                            <Link to="/register">
                                <Button className="bg-data-teal text-white hover:bg-data-blue w-full">Sign Up</Button>
                            </Link>

                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;
