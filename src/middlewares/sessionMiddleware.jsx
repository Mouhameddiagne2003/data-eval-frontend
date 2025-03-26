import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

// Déplacer la logique de navigation dans un composant wrapper
export const SessionCheckWrapper = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { firstSessionRole, token } = useAuthStore();

    useEffect(() => {
        if (firstSessionRole && token) {
            const currentPath = location.pathname;
            const expectedPath = `/${firstSessionRole}`;

            if (!currentPath.startsWith(expectedPath)) {
                navigate(expectedPath);
            }
        }
    }, [firstSessionRole, token, navigate, location]);

    return children;
};