
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

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
    // This is a mock login. In a real app, you'd call an API.
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = { id: 'user-1', username: 'Storyteller', email };
        localStorage.setItem('daily-story-user', JSON.stringify(mockUser));
        setUser(mockUser);
        resolve();
      }, 500);
    });
  };

  const signup = async (username: string, email: string, pass: string): Promise<void> => {
    // Mock signup
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = { id: `user-${Date.now()}`, username, email };
        localStorage.setItem('daily-story-user', JSON.stringify(newUser));
        setUser(newUser);
        resolve();
      }, 500);
    });
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
