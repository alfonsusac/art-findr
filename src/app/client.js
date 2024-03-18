"use client"
import { useQueryState } from 'nuqs'

export function SearchMitra() {

  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    throttleMs: 1000,
  })

  return (
    <input
      placeholder="Search"
      className="block w-full outline-none"
      value={search}
      onChange={e => {
        setSearch(e.target.value)
      }}
    />
  )
}