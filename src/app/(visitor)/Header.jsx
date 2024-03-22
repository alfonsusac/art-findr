import { TextLogo } from "@/components/logo";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { SearchMitra } from "../client";
import { PhMagnifyingGlassBold } from "./page";

export function Header() {
  return (
    <header className="h-14 flex ">
      <div className="content flex justify-between items-center p-4">
        <a href="/">
          <TextLogo />
        </a>
        <HeaderMasukButton />
      </div>
    </header>
  )
}

async function HeaderMasukButton() {
  const session = await getUserSession();
  return (
    <>
      {
        session
          ? <Link
            href="/akun"
            className="button btn-primary p-2 px-5 border border-neutral-200 rounded-lg text-sm font-semibold"
          >
            Akun Saya
          </Link> :
          <Link
            href="/masuk"
            className="button btn-primary p-2 px-5 border border-neutral-200 rounded-lg text-sm font-semibold"
          >
            Masuk
          </Link>
      }
    </>
  )
}


export function HeaderWithSearch() {
  return (
    <header className="h-14 flex ">
      <div className="content flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <a href="/">
            <TextLogo />
          </a>
          <div className="grow w-full max-w-72 p-2 px-4 border border-neutral-200 rounded-full flex focus-within:border-neutral-400">
            <SearchMitra />
            <div className="aspect-square h-9 w-9 -my-1 text-neutral-400 rounded-full flex items-center justify-center -mr-3">
              <PhMagnifyingGlassBold className="text-lg" />
            </div>
          </div>
        </div>
        <HeaderMasukButton />
      </div>
    </header>
  )
}
