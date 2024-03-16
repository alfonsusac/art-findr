"use client";

import { signIn, signOut } from "next-auth/react";

export const LogOutRegister = () => {
  return (
    <button
      className="mt-2 w-full rounded bg-gray-700 py-2 text-sm font-semibold hover:bg-gray-600"
      onClick={() => signOut()}
    >
      Batalkan
    </button>
  );
};
