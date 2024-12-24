import React, { createContext, useContext, useState } from 'react';
import { getRole } from '../utils/auth'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({role: getRole() || null}); // Example: { role: 'Admin' } or { role: 'Client' }
    const login = (userData) => {
        setUser(userData); // Save user data, including the role
    };
    const logout = () => {
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
