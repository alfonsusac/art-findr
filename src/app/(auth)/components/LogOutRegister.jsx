"use client";

import { cn } from "@/lib/utils";
import { signIn, signOut } from "next-auth/react";

export const LogOutRegister = ({children, className}) => {
  return (
    <button
      className={cn("button w-full", className)}
      onClick={() => signOut()}
    >
      {children}
    </button>
  );
};
