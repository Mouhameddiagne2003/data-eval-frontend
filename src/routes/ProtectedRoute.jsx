import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuthStore();

    // if (user === undefined) return null; // ✅ Attendre que `fetchUser` ait fini

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        const roleRedirects = {
            professor: "/professor",
            student: "/student",
            admin: "/admin",
            login: "/login"
        };
        return <Navigate to={roleRedirects[user.role] || "/"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
