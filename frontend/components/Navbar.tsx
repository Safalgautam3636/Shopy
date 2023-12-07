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
        <Button variant="ghost" size="sm">
          <Link href="/cart">Cart</Link>
        </Button>
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
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
