
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { db } from '../services/db';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (username: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session persistence logic remains the same
    try {
      const storedUser = localStorage.getItem('daily-story-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    const loggedInUser = await db.loginUser(email, pass);
    localStorage.setItem('daily-story-user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const signup = async (username: string, email: string, pass: string): Promise<void> => {
    const newUser = await db.signupUser(username, email, pass);
    localStorage.setItem('daily-story-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('daily-story-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
