"use client";
import { getOwnUserProfile } from "@/api/user";
import { ModeToggle } from "@/components/ModeToggle";
import { Spinner } from "@/components/Spinner";
import { User, UserResponse } from "@/types/User";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [userData, setUserData] = useState<UserResponse>(); // State to hold user data

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken"); // Retrieve the token
        if (token) {
          console.log("token: " + token);
          const response = await getOwnUserProfile(token); // Make the API call
          setUserData(response.data); // Set user data in state
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect runs once on mount

  // Render the user data or a loading message
  return (
    <div>
      {userData ? (
        <div>
          {/* Display user data here */}
          <p>Username: {userData.user?.username}</p>
          <p>Email: {userData.user?.email}</p>
          <p>Address: {userData.user?.address}</p>
          <p>isAdmin: {userData.user?.isAdmin ? "yes" : "no"}</p>
          <ModeToggle />
          {/* Add more fields as needed */}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default DashboardPage;
