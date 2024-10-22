import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import apiClient from '../services/apiClient';


interface User {
    userId: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const accessToken = Cookies.get('authorization');
        if (accessToken) {
            const decodedUser = jwtDecode(accessToken) as User;
            if (decodedUser) {
                setUser(decodedUser);
            }
        }
    }

    const login = async (data: unknown) => {
        try {
            const response = await apiClient.post('/user/login', data);
            const { apiKey, user, tokens } = response.data.metadata;

            Cookies.set('x-api-key', apiKey);
            Cookies.set('x-client-id', user._id);
            Cookies.set('authorization', tokens.accessToken);
            Cookies.set('x-refresh-token', tokens.refreshToken);

            const decodedUser = jwtDecode(tokens.accessToken) as User;
            setUser(decodedUser);

            return response.data;
        } catch (error: any) {
            console.error('Error login:', error);
            return error.response.data;
        }
    };

    const logout = async () => {
        const respone = await apiClient.post('/user/logout');
        console.log(respone);
        if (respone.status === 200) {
            Cookies.remove('x-api-key');
            Cookies.remove('x-client-id');
            Cookies.remove('authorization');
            Cookies.remove('x-refresh-token');
        }
        setUser(null);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
