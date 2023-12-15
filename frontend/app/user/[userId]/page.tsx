"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthContext } from "@/components/providers/auth-provider";
import { getUserById } from "@/api/user";
import { AxiosResponse } from "axios";
import { UserResponse, User } from "@/types/User";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

function UserInfoPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useAuthContext();
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !authToken) return;

      try {
        const response: AxiosResponse<UserResponse> = await getUserById(userId as string, authToken);
        console.log(response.data.user);
        setUser(response.data.user || null);
      } catch (err) {
        setError("Error fetching user data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, authToken]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4">Error: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4">No user data found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <Link href="/user">
        <Button className="text-xs" variant="outline">
          <ArrowLeft /> All Users
        </Button>
      </Link>
      <h1 className="mb-4 mt-4 text-2xl font-bold">User Information</h1>
      <div>
        <p>ID: {user._id}</p>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address}</p>
      </div>
    </div>
  );
}

export default UserInfoPage;
