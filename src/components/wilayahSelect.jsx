import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useQueryState } from "nuqs";


export function SelectProvinsi({ listProvinsi, className, name }) {
  const [provinsi, setProvinsi] = useQueryState("provinsi", { shallow: false });
  const [kota, setKota] = useQueryState("kota", { shallow: false });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", { shallow: false });

  return (
    <Select
      name={name}
      className=""
      value={provinsi ?? ""} onValueChange={(value) => {
        setProvinsi(value)
        setKota(null)
        setKecamatan(null)
      }}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Pilih Provinsi" />
      </SelectTrigger>
      <SelectContent>
        {listProvinsi?.map((provinsi, index) => (
          <SelectItem key={index} value={provinsi.code}>
            {provinsi.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function SelectKotaKabupaten({ listKota, className, name }) {
  const [provinsi, setProvinsi] = useQueryState("provinsi", { shallow: false });
  const [kota, setKota] = useQueryState("kota", { shallow: false });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", { shallow: false });

  return (
    <Select
      name={name}
      value={kota ?? ""}
      disabled={!listKota}
      onValueChange={(value) => {
        setKota(value)
        setKecamatan(null)
      }}>
      <SelectTrigger className={cn("w-[180px]", className)}>
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
  )
}

export function SelectKecamatan({ listKecamatan, className, name }) {
  const [provinsi, setProvinsi] = useQueryState("provinsi", { shallow: false });
  const [kota, setKota] = useQueryState("kota", { shallow: false });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", { shallow: false });

  return (
    <Select
      name={name}
      value={kecamatan ?? ""}
      disabled={!listKecamatan}
      onValueChange={(value) => {
        setKecamatan(value)
      }}
    >
      <SelectTrigger className={cn("w-[180px]", className)}>
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
  )
}
