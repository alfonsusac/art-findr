"use client";

import React from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";

export const LoginButtonGoogle = () => {
  return (
    <button
      onClick={() => {
        signIn("google");
      }}
      className="bg-rose-400 rounded-md text-white h-12 w-full"
    >
      Akun Google
    </button>
  );
};
