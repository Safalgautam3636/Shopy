"use client";
import useAuth, { AuthContextType } from "@/hooks/useAuth";
import { ReactNode, createContext, useContext } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, logout, login, user, authToken, fetchUserData } = useAuth();
  const value = { isAuthenticated, logout, login, user, authToken, fetchUserData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
