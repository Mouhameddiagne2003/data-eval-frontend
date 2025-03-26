import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { login } from "@/services/authService.js";
import {handleLoginAttempt} from "@/store/auth.js";


function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const {user, token} = await login(formData.email, formData.password);
            //loginToStore(user, token);
            handleLoginAttempt(user, token, navigate);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-data-blue">Welcome back</h1>
                    <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-[var(--color-data-blue)]">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]"
                            >
                                Forgot password?
                            </Link>
                        </div>
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
                                    <EyeOff className="h-5 w-5 text-data-blue" />
                                ) : (
                                    <Eye className="h-5 w-5 text-data-blue" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-data-teal)] hover:bg-[var(--color-data-blue)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-data-teal)]"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : "Se connecter"}
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-[var(--color-data-teal)] hover:text-[var(--color-data-blue)]"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage

