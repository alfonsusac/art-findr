import Link from "next/link";


export default function AuthLayout({ children }) {


  return (
    <section className="flex flex-col min-h-screen justify-between">
      <header className="p-4">
        <Link className="button gap-1 h-12 text-base inline-flex font-medium" href={'/'}>
          <PhCaretLeftBold className="inline align-[-0.2rem]" />
          {'Kembali'}
        </Link>
      </header>
      <main className="flex flex-col gap-2 items-center justify-center grow">
        {children}
      </main>
      <div className="h-16">

      </div>
    </section>
  )
}

function PhCaretLeftBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="#525252" d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"></path></svg>
  )
}