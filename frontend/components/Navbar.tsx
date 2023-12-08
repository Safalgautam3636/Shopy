"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import Search from "./Search";
import Cart from "./Cart";
import { Settings } from "lucide-react";
import { useAuthContext } from "./providers/auth-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./Spinner";

function Navbar() {
  const [loading, setLoading] = useState(false);
  const authContext = useAuthContext();
  const scrolled = useScrollTop();
  const router = useRouter();
  if (!authContext) {
    return null;
  }
  const { isAuthenticated, logout } = authContext;

  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
      router.push("/");
    }, 500);
  }
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
          <Cart />
        </Button>
        {loading && <Spinner />}
        {!isAuthenticated && !loading && (
          <>
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </>
        )}
        {isAuthenticated && !loading && (
          <>
            <Button size="sm" onClick={handleLogout}>
              Sign Out
            </Button>
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
