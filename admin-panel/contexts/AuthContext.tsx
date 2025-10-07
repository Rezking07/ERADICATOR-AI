import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Role } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const mockAdminUser: User = {
  id: 1,
  email: 'admin@eradicator.id',
  fullName: 'Admin Utama',
  role: Role.ADMIN,
  createdAt: '2023-01-15T09:30:00Z',
  lastLogin: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session storage on initial load
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(mockAdminUser);
    }
  }, []);

  const login = (email: string) => {
    // In a real app, you'd verify credentials against a backend
    if (email.toLowerCase() === mockAdminUser.email) {
        setIsAuthenticated(true);
        setUser(mockAdminUser);
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    } else {
        alert('Kredensial tidak valid');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};