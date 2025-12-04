import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('currentUser');
        const accessToken = localStorage.getItem('access_token');

        if (storedUser && accessToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();

            // Store tokens
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            // Fetch user details
            const userResponse = await fetch('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                localStorage.setItem('currentUser', JSON.stringify(userData));
                setUser(userData);
            } else {
                // Fallback if fetch fails
                const userData = { email: email };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                setUser(userData);
            }

            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        }
    };

    const register = async (fullName, email, password) => {
        console.log("AuthContext: register called with", { fullName, email });
        try {
            console.log("AuthContext: sending request to /api/auth/signup");
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ full_name: fullName, email, password }),
            });

            console.log("AuthContext: response status", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.log("AuthContext: registration failed", errorData);
                throw new Error(errorData.detail || 'Registration failed');
            }

            console.log("AuthContext: registration successful");
            return { success: true };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, error: error.message };
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to send reset email');
            }

            return true;
        } catch (error) {
            console.error("Forgot password error:", error);
            return false;
        }
    };

    const resetPassword = async (password, accessToken) => {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, access_token: accessToken }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to reset password');
            }

            return true;
        } catch (error) {
            console.error("Reset password error:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, forgotPassword, resetPassword, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
