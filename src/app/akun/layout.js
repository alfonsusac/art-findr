import { TextLogo } from "@/components/logo";

export default function LayoutAkun({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-primary/30">
      <div className="left-1/2 -translate-x-1/2 z-0 w-[30rem] h-[20rem] bg-primary absolute top-0 rounded-b-[4rem]" />
      <main className="z-10 flex flex-col gap-2 w-full max-w-sm items-stretch mx-auto mt-6 p-4 text-lg grow">
        {/* <div className="z-0 w-[24rem] h-[15rem] bg-primary absolute top-0 -translate-y-1/2 scale-x-[3] scale-y-[2] rounded-b-[900rem]"/> */}
        {children}
      </main>
      <footer className="w-full bg-neutral-100 flex items-center justify-center pt-12 pb-40 mt-20">
        <TextLogo />
      </footer>
    </div>
  )
}