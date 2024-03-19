import React from "react";
import { UbahLokasi } from "./components/UbahLokasi";
import { getUserData } from "@/lib/auth";

export default async function ubahLokasiPage({ searchParams }) {
  const userData = await getUserData();
  const listProvinsi = await (
    await fetch("https://wilayah.id/api/provinces.json")
  ).json();
  if (searchParams.provinsi) {
    let listKota;
    try {
      listKota = await (
        await fetch(
          `https://wilayah.id/api/regencies/${searchParams.provinsi}.json`
        )
      ).json();
    } catch (error) {
      return (
        <UbahLokasi
          listProvinsi={listProvinsi}
          salahProvinsi={true}
          userData={userData}
        />
      );
    }

    if (searchParams.kota) {
      let listKecamatan;
      try {
        listKecamatan = await (
          await fetch(
            `https://wilayah.id/api/districts/${searchParams.kota}.json`
          )
        ).json();
      } catch (error) {
        return (
          <UbahLokasi
            listProvinsi={listProvinsi}
            listKota={listKota}
            salahKota={true}
            userData={userData}
          />
        );
      }

      return (
        <UbahLokasi
          listProvinsi={listProvinsi}
          listKota={listKota}
          listKecamatan={listKecamatan}
          userData={userData}
        />
      );
    }

    return (
      <UbahLokasi
        listProvinsi={listProvinsi}
        listKota={listKota}
        userData={userData}
      />
    );
  }

  return (
    <>
      <UbahLokasi listProvinsi={listProvinsi} userData={userData} />
    </>
  );
}
