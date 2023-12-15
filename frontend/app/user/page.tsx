"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/components/providers/auth-provider";
import { AxiosResponse } from "axios";
import { UsersResponse, User } from "@/types/User";
import { deleteUser, getAllUsers } from "@/api/user";
import { Spinner } from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Edit, Trash } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { authToken, isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      await getAllUsers(authToken || "")
        .then((response: AxiosResponse<UsersResponse>) => {
          setUsers(response.data.users);
        })
        .catch((err) => {
          setError("Error fetching users.");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchUsers();
    console.log("Called fetch users");
  }, [authToken]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleUserClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  if (!user?.user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold">Access Denied</h2>
        <p className="mb-4">You must be an admin to view this page.</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCreateUser = () => {
    router.push("/user/create");
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(userId, authToken || "");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEditUser = (userId: string) => {
    router.push(`/user/edit/${userId}`);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users List</h1>
        <button onClick={handleCreateUser} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Create User
        </button>
      </div>
      {users &&
        users.map((user) => (
          <div key={user._id} className="flex items-center justify-between border-b border-gray-200 py-2">
            {/* User details */}
            <div onClick={() => handleUserClick(user._id)} className="flex-1 cursor-pointer">
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => handleEditUser(user._id)} className="mr-2 rounded bg-green-500 px-4 py-2 text-white">
                <Edit />
              </button>
              <button onClick={() => handleDeleteUser(user._id)} className="rounded bg-red-500 px-4 py-2 text-white">
                <Trash />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
