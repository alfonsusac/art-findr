import React from "react";
import { UbahLokasi } from "./components/UbahLokasi";
import { getUserData } from "@/lib/auth";
import {
  getListProvinsi,
  getListKotaKabupaten,
  getListKecamatan,
} from "@/lib/wilayah";

export default async function ubahLokasiPage({ searchParams }) {
  const userData = await getUserData();

  return (
    <UbahLokasi
      listProvinsi={await getListProvinsi()}
      listKota={await getListKotaKabupaten(searchParams.provinsi)}
      listKecamatan={await getListKecamatan(searchParams.kota)}
      userData={userData}
    />
  );
}
