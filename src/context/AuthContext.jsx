import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for persisted session
        const storedUser = localStorage.getItem('laikavet_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = USERS.find(u => u.email === email && u.password === password);
                if (foundUser) {
                    // Don't store password in state/storage
                    const { password, ...safeUser } = foundUser;
                    setUser(safeUser);
                    localStorage.setItem('laikavet_user', JSON.stringify(safeUser));
                    resolve(safeUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800); // Simulate network delay
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('laikavet_user');
    };

    const register = (userData) => {
        // For prototype, just simulate success but don't actually add to USERS array permanently
        // unless we want to modify the in-memory array (which resets on reload).
        // For now, we'll just log them in as a new client.
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = { ...userData, id: Date.now().toString(), role: 'client' };
                setUser(newUser);
                localStorage.setItem('laikavet_user', JSON.stringify(newUser));
                resolve(newUser);
            }, 800);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
