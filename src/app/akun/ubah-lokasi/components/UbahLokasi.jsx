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
    <>
      <div className="mb-6 text-black space-y-2">
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
          <label className="text-xl">Lokasi Saya</label>
          <SelectProvinsi
            name={"provinsi"}
            className="w-full text-lg h-14 my-2"
            listProvinsi={listProvinsi}
          />
          <SelectKotaKabupaten
            name={"kota"}
            className="w-full text-lg h-14 my-2"
            listKota={listKota}
          />
          <SelectKecamatan
            name={"kecamatan"}
            className="w-full text-lg h-14 my-2"
            listKecamatan={listKecamatan}
          />
          <button
            className="button btn-primary w-full text-lg h-14"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </div>
    </>
  );
};
