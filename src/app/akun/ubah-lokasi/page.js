import React from "react";
import { UbahLokasi } from "./components/UbahLokasi";
import { getUserData } from "@/lib/auth";
import {
  getListProvinsi,
  getListKotaKabupaten,
  getListKecamatan,
} from "@/lib/wilayah";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function ubahLokasiPage({ searchParams }) {
  const userData = await getUserData();

  // Get User Data's current location and put it into the search Param
  if (!searchParams.provinsi) {
    const listProvinsi = await getListProvinsi()
    const kodeProvinsi = listProvinsi.find(prov => prov.name === userData.location.provinsi).code
    // console.log(kodeProvinsi)
    
    const listKota = await getListKotaKabupaten(kodeProvinsi)
    const kodeKota = listKota.find(prov => prov.name === userData.location.kota).code
    // console.log(kodeKota)
    
    const listKecamatan = await getListKecamatan(kodeKota)
    const kodeKecamatan = listKecamatan.find(prov => prov.name === userData.location.kecamatan).code
    // console.log(kodeKecamatan)

    redirect(`/akun/ubah-lokasi?provinsi=${kodeProvinsi}&kota=${kodeKota}&kecamatan=${kodeKecamatan}`)
  }

  return (
    <>
      <Link href="/akun" className="button h-12 self-start text-base">
        {'<'} Kembali ke Akun Saya
      </Link>
      <div className="py-8">
        <div className="text-xl font-semibold">Penyetelan</div>
        <h3 className="text-4xl font-bold">Ubah Lokasi</h3>
      </div>
      <UbahLokasi
        listProvinsi={await getListProvinsi()}
        listKota={await getListKotaKabupaten(searchParams.provinsi)}
        listKecamatan={await getListKecamatan(searchParams.kota)}
        userData={userData}
      />
    </>
  );
}
