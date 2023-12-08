import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getOwnUserProfile } from "@/api/user";

const useAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setAuthToken(token);
      setUser(jwtDecode(token));
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("userToken", token);
    setAuthToken(token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  const getToken = () => {
    return localStorage.getItem("userToken");
  };

  return { user, isAuthenticated, login, logout, getToken };
};

export default useAuth;
