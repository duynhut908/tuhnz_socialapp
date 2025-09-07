import { createContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { storage } from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const localUser = await storage.getUser();
            if (!localUser) return;

            try {
                const res = await authApi.getUser(localUser.username); // API kiểm tra trạng thái mới nhất
                if (res.data.statusAccount === 'locked') {
                    storage.clearUser();
                    setCurrentUser(null);
                } else {
                    setCurrentUser(res.data);
                    storage.setUser(res.data);
                }
            } catch (err) {
                console.warn("Không thể fetch user:", err.message);
                setCurrentUser(null);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        if (!currentUser) return; // nếu chưa đăng nhập thì bỏ qua

        if (currentUser.statusAccount === 'locked') {
            // Nếu bị khóa thì clear
            storage.clearUser();
            setCurrentUser(null);
        } else {
            // Nếu không bị khóa thì vẫn lưu vào storage
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
            //console.error("Login failed:", err);
            console.warn("Login failed:", err?.response?.data || err.message);
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
            console.warn("Signup failed:", err?.response?.data || err.message);
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