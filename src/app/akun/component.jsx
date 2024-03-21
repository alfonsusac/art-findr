import Link from "next/link";

export function BackToIndexPageButton() {
  return (
    <Link href="/" className="button h-12 self-start text-lg flex gap-2 -ml-4 px-4 shadow-none">
      <PhArrowLeftBold className="text-2xl " /> Kembali Lihat Daftar ART
    </Link>
  )
}
export function BackToAkunPageButton() {
  return (
    <Link href="/akun" className="button h-12 self-start flex gap-2 -ml-4 px-4 shadow-none text-lg">
      <PhArrowLeftBold className="text-2xl " /> Kembali ke Akun Saya
    </Link>
  )
}

export function PhArrowLeftBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12"></path></svg>
  )
}