import { createContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { storage } from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const loadUser = async () => {
            const user = await storage.getUser();
            setCurrentUser(user);
        };
        loadUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
          storage.setUser(currentUser);
        }
      }, [currentUser]);
    const login = async (inputs) => {
        try {
            const res = await authApi.login(inputs);
            setCurrentUser(res.data);
            storage.setUser(res.data);
            return res.data;
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    };

    const updateUser = (newUser) => {
        setCurrentUser(newUser);
        storage.setUser(newUser);
    };

    const signup = async (inputs) => {
        try {
            const res = await authApi.signup(inputs);
            return res.data;
        } catch (err) {
            console.error("Signup failed:", err);
            throw err;
        }
    };

    const handleLogout = () => {
        storage.clearUser(); 
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, login, signup, updateUser, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};