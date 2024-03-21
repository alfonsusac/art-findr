"use client";
import React from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  SelectProvinsi,
  SelectKotaKabupaten,
  SelectKecamatan,
} from "@/components/wilayahSelect";

export const UbahLokasi = ({
  userData,
  listProvinsi,
  listKota,
  listKecamatan,
}) => {
  const router = useRouter();
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/akun">Batal{"\n          "}</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Ubah Lokasi</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Lokasi</h2>
      </div>
      <div className="mb-6 text-black space-y-2">
        <div className="text-white">
          <h2>Previous location</h2>
          <p>Provinsi : {userData?.location?.provinsi}</p>
          <p>Kota/Kab : {userData?.location?.kota}</p>
          <p>Kecamatan : {userData?.location?.kecamatan}</p>
        </div>
        <form
          action={async (formData) => {
            const provinsiValue = formData.get("provinsi").split("|")[1];
            if (!provinsiValue) {
              toast.error("Mohon isi data provinsi");
            }

            const kotaValue = formData.get("kota").split("|")[1];
            if (!kotaValue) {
              toast.error("Mohon isi data kota");
            }

            const kecamatanValue = formData.get("kecamatan").split("|")[1];
            if (!kecamatanValue) {
              toast.error("Mohon isi data kecamatan");
            }

            const res = await fetch("/api/ubah-data-user", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                location: {
                  provinsi: provinsiValue,
                  kota: kotaValue,
                  kecamatan: kecamatanValue,
                },
              }),
            });

            const data = await res.json();

            if (res.status === 200) {
              router.push("/akun");
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          }}
        >
          <label>Lokasi</label>
          <SelectProvinsi
            name={"provinsi"}
            className="w-full"
            listProvinsi={listProvinsi}
          />
          <SelectKotaKabupaten
            name={"kota"}
            className="w-full"
            listKota={listKota}
          />
          <SelectKecamatan
            name={"kecamatan"}
            className="w-full"
            listKecamatan={listKecamatan}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};
