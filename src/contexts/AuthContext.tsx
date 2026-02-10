"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

type Teacher = {
  full_name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  teacher: Teacher | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setTeacher(data);
      setIsAuthenticated(true);
      return true;
    } catch {
      clearToken();
      setTeacher(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    const token = getToken();
    if (!token) return;
    await fetchProfile(token);
  };

  // Restore auth + profile on refresh
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
    setLoading(true);
    const ok = await fetchProfile(token);
    if (ok) {
      router.replace("/dashboard");
      return;
    }
    router.replace("/login");
  };

  const logout = () => {
    clearToken();
    setTeacher(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (loading) return null; // replace with spinner later if you want

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, teacher, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
