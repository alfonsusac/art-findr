import { TextLogo } from "@/components/logo";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { SearchMitra } from "../client";
import { PhMagnifyingGlassBold } from "./page";
import HeaderSearchbar from "./HeaderClient";

export function Header() {
  return (
    <header className="h-20 flex ">
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
    <header className="h-20 flex ">
      <div className="content flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <a href="/">
            <TextLogo />
          </a>
          <HeaderSearchbar />
        </div>
        <HeaderMasukButton />
      </div>
    </header>
  )
}
