"use client";
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
      className="block w-full outline-none"
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
      "flex flex-row flex-wrap w-full items-center justify-center mx-auto p-4 gap-4",
    )}>
      <div className="flex gap-2">
        <select
          className="w-32 truncate"
          value={provinsiFilter || ""}
          onChange={(e) => {
            setProvinsiFilter(e.target.value || null)
            setKotaFilter(null)
            setKecamatanFilter(null)

          }}
        >
          <option value="">Select Provinsi</option>
          {allProvinsi?.map((provinsi, index) => (
            <option key={index} value={provinsi.code}>
              {provinsi.name}
            </option>
          ))}
        </select>
        {
          <select
            className="w-32 truncate"
            value={kotaFilter || ""}
            onChange={(e) => {
              setKotaFilter(e.target.value || null)
              setKecamatanFilter(null)
            }}
            disabled={!listKota}
          >
            <option value="">Select Kota</option>
            {listKota?.map((kota, index) => (
              <option key={index} value={kota.code}>
                {kota.name}
              </option>
            ))}
          </select>
        }
        {
          <select
            className="w-32 truncate"
            value={kecamatanFilter || ""}
            onChange={(e) => {
              setKecamatanFilter(e.target.value || null)
            }}
            disabled={!listKecamatan}
          >
            <option value="">Select Kecamatan</option>
            {listKecamatan?.map((kecamatan, index) => (
              <option key={index} value={kecamatan.code}>
                {kecamatan.name}
              </option>
            ))}
          </select>
        }
      </div>
      <div className="flex gap-2">
        <select
          value={menginapFilter || ""}
          onChange={(e) => setMenginapFilter(e.target.value || null)}
        >
          <option value="">Semua Menginap atau Tidak </option>
          <option value="true">Menginap</option>
          <option value="false">Tidak Menginap</option>
        </select>
        <button
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