import { TextLogo } from "@/components/logo";

export default function LayoutAkun({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col gap-2 w-full max-w-sm items-stretch mx-auto mt-6 p-4 text-lg grow">
        {children}
      </main>
      <footer className="w-full bg-neutral-100 flex items-center justify-center pt-12 pb-40 mt-20">
        <TextLogo />
      </footer>
    </div>
  )
}