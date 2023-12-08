"use client";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/api/user";
import { User } from "@/types/User";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    console.log("Submitting");
    event.preventDefault();
    setIsLoading(true);
    try {
      const userData: User = {
        username,
        password,
        email,
        address,
      };
      const response = await signupUser(userData);
      console.log(response);
      if (response.data.message === "User does not exist") {
        setError("User does not exist");
      } else if (response.data.message === "Username already in use") {
        setError("Username already in use. Please choose another.");
      } else if (response.data.message === "Email already in use") {
        setError("Email already in use. Please choose another.");
      } else {
        console.log(typeof response.data.token);
        console.log(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        router.push("/");
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
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin">
                <Spinner />
              </div>
            )}
            Register
          </Button>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </form>
    </div>
  );
}
