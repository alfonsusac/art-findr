import { PhMagnifyingGlassBold } from "./page";

export default function HeaderSearchbar() {

  return (
    <div className="shrink w-full max-w-52 sm:max-w-96 p-2 px-4 border border-neutral-200 rounded-full flex focus-within:border-neutral-400">
      <div className="flex-1">
        <input
          placeholder="Cari Keterampilan..."
          className="inline-flex w-full flex-grow !min-w-none !max-w-none outline-none"
        />
      </div>
      <div className="aspect-square h-9 w-9 -my-1 text-neutral-400 rounded-full flex items-center justify-center -mr-3">
        <PhMagnifyingGlassBold className="text-lg" />
      </div>
    </div>
  )
}