import React from "react";

import { getUserSession } from "@/lib/auth";
import { LoginForm } from "./components/LoginForm";
import { LoginButtonGoogle } from "./components/LoginButtonGoogle";
import { redirect } from "next/navigation";
import { TextLogo } from "@/components/logo";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getUserSession();

  if (session !== null) {
    redirect("/akun")
  }

  return (
    <>
      {/* Header */}
      <div className="pb-6 text-center flex flex-col gap-2">
        <TextLogo />
        <h1 className="mb-2 text-3xl font-semibold">Masuk</h1>

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
    </>
  );
}




function PhCaretLeftBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="#525252" d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"></path></svg>
  )
}