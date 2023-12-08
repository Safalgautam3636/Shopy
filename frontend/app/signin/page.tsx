import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { SignInForm } from "./SignInForm";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication form",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your username and password to sign in</p>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            New to Shopy?{" "}
            <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
