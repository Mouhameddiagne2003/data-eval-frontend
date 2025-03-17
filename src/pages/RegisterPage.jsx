import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        agreeToTerms: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        console.log("Registration submitted:", formData)
        navigate("/dashboard")
    }

    return (
        <div className="min-h-[calc(100vh-1rem)] w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[var(--color-data-blue)]">Create an account</h1>
                    <p className="text-gray-600 mt-2">Enter your information to create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-[var(--color-data-blue)]">
                                First name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-[var(--color-data-blue)]">
                                Last name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]"
                                placeholder="Doe"
                            />
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--color-data-blue)]">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-data-teal)] focus:border-[var(--color-data-teal)]"
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
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            required
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="h-4 w-4 text-[var(--color-data-teal)] border-gray-300 rounded focus:ring-[var(--color-data-teal)] bg-bg-light"
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-600">
                            I agree to the{" "}
                            <Link to="/terms" className="text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-data-teal)]"
                    >
                        Create account
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage