"use client";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Spinner } from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";

function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold">Access Denied</h2>
        <p className="mb-4">You must be logged in to view this page.</p>
        <ModeToggle />
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  const userInfo = user?.user ? (
    <div className="text-center">
      <h1 className="mb-6 text-3xl font-bold dark:text-gray-200">Welcome, {user.user.username}!</h1>
      <div className="rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-200 dark:text-black">
        <p className="font-medium">
          <strong>Username:</strong> {user.user.username}
        </p>
        <p className="font-medium">
          <strong>Email:</strong> {user.user.email}
        </p>
        <p className="font-medium">
          <strong>Address:</strong> {user.user.address}
        </p>
        <p className="font-medium">
          <strong>Admin Status:</strong> {user.user.isAdmin ? "Yes" : "No"}
        </p>
      </div>
    </div>
  ) : (
    <p>User information not available.</p>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {userInfo}
      <div className="pt-4">
        <ModeToggle />
      </div>
    </div>
  );
}

export default DashboardPage;
