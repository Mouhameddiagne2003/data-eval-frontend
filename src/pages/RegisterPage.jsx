import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from "../services/authService";

function RegisterPage() {
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        password: "",
        role: "professor",
        agreeToTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.prenom.trim()) {
            newErrors.prenom = "Le prénom est requis";
        }

        if (!formData.nom.trim()) {
            newErrors.nom = "Le nom est requis";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide";
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit comporter au moins 8 caractères";
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "Vous devez accepter les conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await registerUser(formData);
            toast.success("Merci pour votre inscription ! Votre compte est en attente d'activation. Vous serez notifié quand celui-ci sera activé", {
                position: "top-center",
                autoClose: 5000,
                onClose: () => navigate("/login")
            });

        } catch (error) {
            toast.error(error.message || "Une erreur est survenue lors de l'inscription");
            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-1rem)] w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[var(--color-data-blue)]">Créer un compte</h1>
                    <p className="text-gray-600 mt-2">Entrez vos informations pour créer votre compte</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Alert className="bg-[#FEF7CD] border-yellow-300 text-yellow-800">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            Veuillez noter : Seuls les enseignants peuvent demander la création d'un compte. Les comptes des étudiants sont créés par les administrateurs.
                        </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="prenom" className="block text-sm font-medium text-[var(--color-data-blue)]">
                                Prénom
                            </label>
                            <input
                                id="firstName"
                                name="prenom"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.firstName ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]`}
                                placeholder="Jean"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-[var(--color-data-blue)]">
                                Nom
                            </label>
                            <input
                                id="lastName"
                                name="nom"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.lastName ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]`}
                                placeholder="Dupont"
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-data-blue)]">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]`}
                            placeholder="nom@exemple.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--color-data-blue)]">
                            Mot de passe
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`block w-full px-3 py-2 border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-data-teal" />
                                ) : (
                                    <Eye className="h-5 w-5 text-data-teal" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="agreeToTerms"
                                name="agreeToTerms"
                                type="checkbox"
                                required
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-[var(--color-data-teal)] border-gray-300 rounded focus:ring-[var(--color-data-teal)] bg-bg-light"
                            />
                        </div>
                        <div className="ml-2 text-sm">
                            <label htmlFor="agreeToTerms" className="text-gray-600">
                                J'accepte les{" "}
                                <Link to="/terms" className="text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]">
                                    Conditions d'utilisation
                                </Link>{" "}
                                et la{" "}
                                <Link to="/privacy" className="text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]">
                                    Politique de confidentialité
                                </Link>
                            </label>
                            {errors.agreeToTerms && (
                                <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-data-teal)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Création en cours...
                            </>
                        ) : (
                            "Créer un compte"
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]"
                            >
                                Connectez-vous
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;