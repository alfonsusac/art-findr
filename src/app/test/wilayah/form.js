"use client"
import { useQueryState } from 'nuqs'
import { useEffect } from 'react'

export function FormPilihWilayah({
  listProvinsi,
  listKota,
  listKecamatan,
  salahProvinsi,
  salahKota,
}) {

  const [provinsi, setProvinsi] = useQueryState("provinsi", {
    shallow: false
  })
  const [kota, setKota] = useQueryState("kota", {
    shallow: false
  })

  useEffect(() => {
    if (salahProvinsi) {
      setProvinsi(null)
      setKota(null)
    }
    if (salahKota) {
      setKota(null)
    }
  }, [salahProvinsi, salahKota, setProvinsi, setKota])


  return (
    <form className='flex flex-col gap-2'>
      <select name="provinsi" id="provinsi"
        onChange={(e) => {
          setProvinsi(e.target.value)
        }}
      >
        {
          listProvinsi.data.map(provinsi => (
            <option key={provinsi.name} value={provinsi.code}>{provinsi.name}</option>
          ))
        }
      </select>
      <select disabled={!listKota}
        onChange={(e) => {
          setKota(e.target.value)
        }}
      >
        {
          listKota?.data.map(kota => (
            <option key={kota.name} value={kota.code}>{kota.name}</option>
          ))
        }
      </select>
      <select>
        {
          listKecamatan?.data.map(kecamatan => (
            <option key={kecamatan.name} value={kecamatan.code}>{kecamatan.name}</option>
          ))
        }
      </select>

    </form>
  )
}