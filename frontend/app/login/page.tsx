"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "@/api/user";
import { LoginCredentials, User } from "@/types/User";

export default function LoginPage() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupError, setSignupError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const credentials: LoginCredentials = {
        username: loginUsername,
        password: loginPassword,
      };
      const response = await loginUser(credentials);
      console.log(response.data);
      if (response.data.message === "User does not exist") {
        setLoginError("User does not exist.");
      } else {
        console.log(response.data);
        router.push("/");
      }
    } catch (err) {
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    try {
      // Prepare user data for signup
      const userData: User = {
        username: signupUsername,
        password: signupPassword,
        email: signupEmail,
        address: signupAddress,
        isAdmin: false,
      };

      // Use signupUser function
      const response = await signupUser(userData);
      console.log(response.data);
      if (response.data.message === "Please add genuine password!") {
        setSignupError("Signup failed. Bad password.");
      } else {
        console.log(response.data);
        router.push("/");
      }
    } catch (err) {
      setSignupError("Signup failed. Please check your details.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <button type="submit">Login</button>
        {loginError && <p>{loginError}</p>}
      </form>

      <h2>Or Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
        <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
        <input type="text" placeholder="Address" value={signupAddress} onChange={(e) => setSignupAddress(e.target.value)} />
        <button type="submit">Sign Up</button>
        {signupError && <p>{signupError}</p>}
      </form>
    </div>
  );
}
