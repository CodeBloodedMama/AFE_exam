'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJWT } from '@/lib/utils/jwt'; // Assuming you have a utility to decode JWT

interface User {
  jwt: string;
  accountType: string;
}

interface AuthContextType {
  user: User | null;
  login: (jwt: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage on startup
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken) {
        setUser({ jwt: token, accountType: decodedToken.accountType });
      }
    }
  }, []);

  const login = (jwt: string) => {
    const decodedToken = decodeJWT(jwt);
    if (!decodedToken) {
      console.error('Invalid JWT');
      return;
    }

    const userData = { jwt, accountType: decodedToken.accountType };
    setUser(userData);
    localStorage.setItem('jwt', jwt);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}