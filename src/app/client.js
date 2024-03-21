"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

export function SearchMitra() {
  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    throttleMs: 1000,
  });
  return (
    <input
      placeholder="Search"
      className="block grow outline-none"
      value={search || ""}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
}



/**
 * 
 * @param {{
 *   allProvinsi: import("@/lib/wilayah").Provinsi[],
 *   listKota: import("@/lib/wilayah").Kabupaten[],
 *   listKecamatan: import("@/lib/wilayah").Kecamatan[],
 * }} param0 
 * @returns 
 */
export function MitraFilterList({
  allProvinsi,
  listKota,
  listKecamatan,
}) {
  const [keahlianFilter, setKeahlianFilter] = useQueryState("keahlian", { shallow: false });
  const [provinsiFilter, setProvinsiFilter] = useQueryState("provinsi", { shallow: false });
  const [kotaFilter, setKotaFilter] = useQueryState("kota", { shallow: false });
  const [kecamatanFilter, setKecamatanFilter] = useQueryState("kecamatan", { shallow: false });
  const [menginapFilter, setMenginapFilter] = useQueryState("menginap", { shallow: false });

  return (
    <div className={cn(
      "flex flex-row flex-wrap items-center justify-start mx-auto p-4 gap-4",
    )}>
      <div className="flex flex-wrap gap-2">
        <Select
          className=""
          value={provinsiFilter ?? undefined} onValueChange={(value) => {
            setProvinsiFilter(value)
            setKotaFilter(null)
            setKecamatanFilter(null)
          }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Provinsi" />
          </SelectTrigger>
          <SelectContent>
            {allProvinsi?.map((provinsi, index) => (
              <SelectItem key={index} value={provinsi.code}>
                {provinsi.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={kotaFilter ?? undefined} disabled={!listKota} onValueChange={(value) => {
          setKotaFilter(value)
          setKecamatanFilter(null)
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Kota" />
          </SelectTrigger>
          <SelectContent>
            {listKota?.map((item, index) => (
              <SelectItem key={index} value={item.code}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={kecamatanFilter ?? undefined} disabled={!listKecamatan} onValueChange={(value) => {
          setKecamatanFilter(value)
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Kecamatan" />
          </SelectTrigger>
          <SelectContent>
            {listKecamatan?.map((item, index) => (
              <SelectItem key={index} value={item.code}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select
          value={menginapFilter ?? ""}
          onValueChange={(value) => {
            if (value === "batalkan") {
              setMenginapFilter(null)
            } else {
              setMenginapFilter(value)
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Penginapan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Bisa Menginap</SelectItem>
            <SelectItem value="false">Tidak Bisa Menginap</SelectItem>
            <SelectItem value="batalkan">Batalkan</SelectItem>
          </SelectContent>
        </Select>
        {/* <select
          value={menginapFilter || ""}
          onChange={(e) => setMenginapFilter(e.target.value || null)}
        >
          <option value="">Semua Menginap atau Tidak</option>
          <option value="true">Menginap</option>
          <option value="false">Tidak Menginap</option>
        </select> */}
        <button
          className="button bg-white font-medium"
          onClick={() => {
            setKeahlianFilter(null);
            setProvinsiFilter(null);
            setKotaFilter(null);
            setKecamatanFilter(null);
            setMenginapFilter(null);
          }}
        >
          Reset All
        </button>
      </div>
    </div>
  )
}