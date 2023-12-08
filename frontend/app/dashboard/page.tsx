"use client";
import { getOwnUserProfile } from "@/api/user";
import { ModeToggle } from "@/components/ModeToggle";
import { Spinner } from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import { User, UserResponse } from "@/types/User";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [userData, setUserData] = useState<UserResponse | null>(); // State to hold user data
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const response = await getOwnUserProfile(token);
          setUserData(response.data);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!isAuthenticated()) {
    return <div>Not logged in</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {!isAuthenticated() ? (
        "Not logged in"
      ) : (
        <div>
          {userData ? (
            <div>
              <p>Username: {userData.user?.username}</p>
              <p>Email: {userData.user?.email}</p>
              <p>Address: {userData.user?.address}</p>
              <p>isAdmin: {userData.user?.isAdmin ? "yes" : "no"}</p>
              <ModeToggle />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
