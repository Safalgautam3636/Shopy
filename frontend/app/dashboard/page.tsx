"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Spinner } from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";

function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Username: {user.user?.username}</p>
          <p>Email: {user.user?.email}</p>
          <p>Address: {user.user?.address}</p>
          <p>isAdmin: {user.user?.isAdmin ? "yes" : "no"}</p>
          <ModeToggle />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default DashboardPage;
