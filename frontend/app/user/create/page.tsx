"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CreateUserForm } from "./CreateUserForm";
import { ArrowLeft } from "lucide-react";

export default function AuthenticationPage() {
  return (
    <div className="container mx-auto mt-8">
      <Link href="/user">
        <Button className="text-xs" variant="outline">
          <ArrowLeft /> All Users
        </Button>
      </Link>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create User</h1>
          </div>
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
}
