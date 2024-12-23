import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        // Redirect to home if the user's role is not authorized
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;
