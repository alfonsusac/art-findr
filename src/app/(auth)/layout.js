/* eslint-disable @next/next/no-img-element */
import { TextLogo } from "@/components/logo";
import Link from "next/link";


export default function AuthLayout({ children }) {


  return (
    <section className="min-h-screen flex p-4">
      <div className="grow flex-1 flex flex-col justify-between">
        <header className="p-4">
          <Link className="button gap-1 h-12 text-base inline-flex font-medium" href={'/'}>
            <PhCaretLeftBold className="inline align-[-0.2rem]" />
            {'Kembali'}
          </Link>
        </header>
        <main className="flex flex-col gap-2 items-center justify-center grow">
          {children}
        </main>
        <div className="h-16 text-center">
          {/* <TextLogo /> */}
        </div>
      </div>
      <div className="flex-1 bg-primary rounded-3xl hidden md:block overflow-hidden">
        <img
          alt=""
          className="w-full h-full object-cover object-[-15rem] opacity-40"
          src="https://images.unsplash.com/photo-1613395940662-b52fba15086d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </section>
  )
}

function PhCaretLeftBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="#525252" d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"></path></svg>
  )
}