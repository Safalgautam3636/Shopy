"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Spinner } from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";

function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <div>Not logged in</div>
        <ModeToggle />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Username: {user.user?.username}</p>
          <p>Email: {user.user?.email}</p>
          <p>Address: {user.user?.address}</p>
          <p>isAdmin: {user.user?.isAdmin ? "yes" : "no"}</p>
        </div>
      ) : (
        <Spinner />
      )}
      <ModeToggle />
    </div>
  );
}

export default DashboardPage;
