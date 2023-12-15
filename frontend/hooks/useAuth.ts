import { useState, useEffect } from "react";
import { UserResponse } from "@/types/User";
import { getOwnUserProfile, logoutUser } from "@/api/user";
export interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
  user: UserResponse | null;
  authToken: string | null;
  fetchUserData: () => void;
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<UserResponse | null>(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const response = await getOwnUserProfile(token);
        setUser(response.data);
      } else {
        console.log("No token found");
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchUserData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("userToken", token);
    setAuthToken(token);
    fetchUserData();
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    logoutUser();
  };

  return { user, isAuthenticated, login, logout, authToken, fetchUserData };
};

export default useAuth;
