import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CreateUserForm } from "./CreateUserForm";

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
            <h1 className="text-2xl font-semibold tracking-tight">Create User</h1>
          </div>
          <CreateUserForm />
        </div>
      </div>
    </>
  );
}
