"use client";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/providers/auth-provider";
import { updateOwnUserProfile } from "@/api/user";
import Link from "next/link";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const { isAuthenticated, user, authToken, fetchUserData } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const defaultUser: User = {
    _id: "",
    username: "",
    password: "",
    email: "",
    address: "",
    isAdmin: false,
  };
  const [editableUser, setEditableUser] = useState<User>(defaultUser);
  const router = useRouter();

  useEffect(() => {
    if (user && user.user) {
      setIsLoading(false);
      console.log(user.user);
      setEditableUser({ ...user.user });
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold">Welcome</h2>
        <p className="mb-4">You must be logged in to view your data.</p>
        <ModeToggle />
      </div>
    );
  }

  if (!user || !user.user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4">Could not find user.</p>
        <ModeToggle />
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const response = await updateOwnUserProfile(editableUser, authToken as string);
    fetchUserData();
    setIsEditing(false);
    setIsLoading(false);
  };

  const userInfo = isEditing ? (
    <div className="text-center">
      <h1 className="mb-6 text-3xl font-bold dark:text-gray-200">Edit Your Information</h1>
      <div className="rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-200 dark:text-black">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="username">
            Name
          </label>
          <input className="w-full font-medium" value={editableUser.username} onChange={handleChange} name="username" id="username" />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input className="w-full font-medium" value={editableUser.email} onChange={handleChange} name="email" id="email" />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="address">
            Address
          </label>
          <input className="w-full font-medium" value={editableUser.address} onChange={handleChange} name="address" id="address" />
        </div>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  ) : (
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
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {userInfo}
      {!isEditing && (
        <Button onClick={handleEdit} className="mt-4">
          Edit Profile
        </Button>
      )}
      {user.user.isAdmin && (
        <>
          <p className="mt-4">
            <Link href="/user">
              <Button>User Management</Button>
            </Link>
          </p>
          <p className="mt-4">
            <Link href="/order">
              <Button>Order Management</Button>
            </Link>
          </p>
        </>
      )}
      <div className="pt-4">
        <ModeToggle />
      </div>
    </div>
  );
}

export default DashboardPage;
