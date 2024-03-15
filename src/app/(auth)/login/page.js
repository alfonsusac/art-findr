import React from "react";

import Link from "next/link";

import { LoginForm } from "./components/LoginForm";
import { LoginButtonGoogle } from "./components/LoginButtonGoogle";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-2 items-center mt-6">
      <div className="p-10">
        <h3 className="text-4xl font-bold">CariART</h3>
      </div>
      <h1 className="mb-2 text-lg">Login ke CariART</h1>
      <div className="w-80 items-center">
        <LoginForm />
        <div className="w-full my-8">
          <p className="text-center border-b-2 border-slate-200 leading-[0.1em]">
            <span className="bg-white px-2">atau masuk dengan</span>
          </p>
        </div>
        <LoginButtonGoogle />
        <p className="mt-2 text-center">
          Belum punya akun?{" "}
          <Link href="/register" className=" text-rose-400 underline">
            Daftar sekarang.
          </Link>
        </p>
      </div>
    </main>
  );
}
