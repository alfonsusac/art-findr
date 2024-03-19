import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useQueryState } from "nuqs";
import { useRef } from "react";


/**
 * 
 * @param {{
 *   listProvinsi: import("@/lib/wilayah").Provinsi[]
 * }} param0 
 * @returns 
 */
export function SelectProvinsi({ listProvinsi, className, name, required }) {
  const [provinsi, setProvinsi] = useQueryState("provinsi", { shallow: false });
  const [kota, setKota] = useQueryState("kota", { shallow: false });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", { shallow: false });
  const parsedInputValue = useRef(null)

  return (
    <>
      <input name={name} hidden value={parsedInputValue.current ?? ""} readOnly />
      <Select
        required={required}
        // name={name}
        className=""
        value={provinsi ?? ""} onValueChange={(value) => {
          parsedInputValue.current = `${value}|${listProvinsi.find(p => p.code === value).name}`
          setProvinsi(value)
          setKota(null)
          setKecamatan(null)
        }}>
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue placeholder="Pilih Provinsi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null} disabled></SelectItem>
          {listProvinsi?.map((item, index) => (
            <SelectItem key={index} value={item.code}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export function SelectKotaKabupaten({ listKota, className, name, required }) {
  const [provinsi, setProvinsi] = useQueryState("provinsi", { shallow: false });
  const [kota, setKota] = useQueryState("kota", { shallow: false });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", { shallow: false });
  const parsedInputValue = useRef(null)

  return (
    <>
      <input name={name} hidden value={parsedInputValue.current ?? ""} readOnly />
      <Select
        required={required}
        // name={name}
        value={kota ?? ""}
        disabled={!listKota}
        onValueChange={(value) => {
          parsedInputValue.current = `${value}|${listKota.find(p => p.code === value).name}`
          setKota(value)
          setKecamatan(null)
        }}>
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue placeholder="Pilih Kota" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null} disabled></SelectItem>
          {listKota?.map((item, index) => (
            <SelectItem key={index} value={item.code}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>

  )
}

export function SelectKecamatan({ listKecamatan, className, name, required }) {
  const [provinsi, setProvinsi] = useQueryState("provinsi", { shallow: false });
  const [kota, setKota] = useQueryState("kota", { shallow: false });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", { shallow: false });
  const parsedInputValue = useRef(null)

  return (
    <>
      <input name={name} hidden value={parsedInputValue.current ?? ""} readOnly />
      <Select
        required={required}
        // name={name}
        value={kecamatan ?? ""}
        disabled={!listKecamatan}
        onValueChange={(value) => {
          parsedInputValue.current = `${value}|${listKecamatan.find(p => p.code === value).name}`
          setKecamatan(value)
        }}
      >
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue placeholder="Pilih Kecamatan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null} disabled></SelectItem>
          {listKecamatan?.map((item, index) => (
            <SelectItem key={index} value={item.code}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>

  )
}
