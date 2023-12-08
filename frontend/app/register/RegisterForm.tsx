"use client";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, { username, password, email, address });
      console.log(response);
      if (response.data.message === "User does not exist") {
        setError("User does not exist");
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
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
        </div>
      </form>
    </div>
  );
}
