import React from "react";
import Link from "next/link";

import { getUserSession } from "@/lib/auth";
import { LoginForm } from "./components/LoginForm";
import { LoginButtonGoogle } from "./components/LoginButtonGoogle";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getUserSession();

  if (session !== null) {
    redirect("/akun")
  }

  return (
    <section className="flex flex-col min-h-screen justify-between">
      <header className="p-4">
        <Link className="button gap-1 h-12 text-base inline-flex font-medium" href={'/'}>
          <PhCaretLeftBold className="inline align-[-0.2rem]" />
          {'Kembali'}
        </Link>
      </header>
      <main className="flex flex-col gap-2 items-center justify-center grow">
        <div className="pb-6 text-center flex flex-col gap-2">
          <span className="text-xl font-bold">Cari<span className="text-primary">ART</span></span>
          <h1 className="mb-2 text-3xl font-semibold">Masuk</h1>
          <p className="max-w-xs text-lg">
            Untuk menggunakan layanan CariART, kami butuh mengidentifikasi anda melalui email atau nomor handphone
          </p>
        </div>
        <div className="w-80 items-center">
          <LoginForm />
          <div className="w-full my-8">
            <p className="text-center border-b-2 border-slate-200 leading-[0.1em]">
              <span className="bg-white px-2">atau</span>
            </p>
          </div>
          <LoginButtonGoogle />
        </div>
      </main>
      <div className="h-16">

      </div>
    </section>
  );
}




export function PhCaretLeftBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="#525252" d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"></path></svg>
  )
}