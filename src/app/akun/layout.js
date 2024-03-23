import { TextLogo } from "@/components/logo";

export default function LayoutAkun({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-screen max-w-screen overflow-hidden bg-primary/30 relative">
      <div className="left-1/2 -translate-x-1/2 z-0 w-[30rem] h-[20rem] bg-primary absolute top-0 rounded-b-[4rem]" />
      <main className="z-10 flex flex-col gap-2 w-full max-w-sm items-stretch mx-auto mt-6 p-4 text-lg grow">
        {children}
      </main>
      <footer className="w-full bg-neutral-100 flex items-center justify-center pt-12 pb-40 mt-20">
        <TextLogo />
      </footer>
    </div>
  )
}