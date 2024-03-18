import { FormPilihWilayah } from "./form"
import { redirect } from "next/navigation"

export default async function PilihWilayahPage({ searchParams }) {

  const listProvinsi = await (await fetch("https://wilayah.id/api/provinces.json")).json()

  if (searchParams.provinsi) {
    let listKota
    try {
      listKota = await (await fetch(`https://wilayah.id/api/regencies/${searchParams.provinsi}.json`)).json()
    } catch (error) {
      return (
        <FormPilihWilayah
          listProvinsi={listProvinsi}
          salahProvinsi={true}
        />
      )
    }

    if (searchParams.kota) {

      let listKecamatan
      try {
        listKecamatan = await (await fetch(`https://wilayah.id/api/districts/${searchParams.kota}.json`)).json()
      } catch (error) {
        return (
          <FormPilihWilayah
            listProvinsi={listProvinsi}
            listKota={listKota}
            salahKota={true}
          />
        )
      }

      return (
        <FormPilihWilayah
          listProvinsi={listProvinsi}
          listKota={listKota}
          listKecamatan={listKecamatan}
        />
      )
    }

    return (
      <FormPilihWilayah
        listProvinsi={listProvinsi}
        listKota={listKota}
      />
    )
  }

  return (
    <>
      <FormPilihWilayah
        listProvinsi={listProvinsi}
      />
    </>
  )
}