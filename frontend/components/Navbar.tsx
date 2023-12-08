"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import Logo from "./Logo";
import Search from "./Search";
import { ModeToggle } from "@/components/ModeToggle";
import Cart from "./Cart";
import { CiSettings } from "react-icons/ci";
import { Settings } from "lucide-react";

function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between bg-background p-6 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm",
      )}
    >
      {/* Left Section: Logo */}
      <Link href="/" className="flex items-center">
        <Logo />
      </Link>

      {/* Middle Section: Search Bar */}
      <Search />

      {/* Right Section: Buttons and Mode Toggle */}
      <div className="flex items-center gap-x-2">
        <Cart />
        {!isLoaded && <Spinner />}
        {!isSignedIn && isLoaded && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </>
        )}
        {isSignedIn && isLoaded && (
          <>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
