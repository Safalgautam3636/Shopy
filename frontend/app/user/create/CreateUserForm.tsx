"use client";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser, updateUserById } from "@/api/user";
import { User } from "@/types/User";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Checkbox } from "@/components/ui/checkbox";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreateUserForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { authToken } = useAuthContext();

  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    console.log("Submitting");
    event.preventDefault();
    setIsLoading(true);
    try {
      const userData: User = {
        _id: "",
        username,
        password,
        email,
        address,
        isAdmin,
      };
      const response = await signupUser(userData);
      if (response.data.newUser && response.data.newUser._id) {
        if (isAdmin) {
          await updateUserById(response.data.newUser._id, { ...userData, isAdmin: true }, authToken as string);
        }
        router.push(`/user/${response.data.newUser._id}`);
      } else {
        if (response.data.error?.details[0].message === '"username" length must be at least 5 characters long') {
          setError("Username too short");
        } else if (response.data.message === "Username already in use") {
          setError("Username already in use. Please choose another.");
        } else if (response.data.message === "Email already in use") {
          setError("Email already in use. Please choose another.");
        } else {
          setError("Unexpected Error");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            Username
            <Input
              id="username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
            Email
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            Address
            <Input
              id="address"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={true}
            />
            Password
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={() => setIsAdmin((cur) => !cur)} />
              <label htmlFor="terms" className="p-2 font-medium leading-none ">
                Is Admin
              </label>
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin">
                <Spinner />
              </div>
            )}
            Register
          </Button>
          {isAdmin ? "admin" : "not admin"}
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </form>
    </div>
  );
}
