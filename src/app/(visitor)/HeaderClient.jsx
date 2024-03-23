import { PhMagnifyingGlassBold } from "./page";

export default function HeaderSearchbar() {

  return (
    <div className="grow w-full max-w-72 p-2 px-4 border border-neutral-200 rounded-full flex focus-within:border-neutral-400">
      <input
        placeholder="Cari Keterampilan..."
        className="block grow outline-none"
      />
      <div className="aspect-square h-9 w-9 -my-1 text-neutral-400 rounded-full flex items-center justify-center -mr-3">
        <PhMagnifyingGlassBold className="text-lg" />
      </div>
    </div>
  )
}