"use client";
import React from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { getUserData } from "@/lib/auth";

export const UbahLokasi = async ({
  listProvinsi,
  listKota,
  listKecamatan,
  salahProvinsi,
  salahKota,
}) => {
  const [provinsi, setProvinsi] = useQueryState("provinsi", {
    shallow: false,
  });
  const [kota, setKota] = useQueryState("kota", {
    shallow: false,
  });

  useEffect(() => {
    if (salahProvinsi) {
      setProvinsi(null);
      setKota(null);
    }
    if (salahKota) {
      setKota(null);
    }
  }, [salahProvinsi, salahKota, setProvinsi, setKota]);
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
        <form className="flex flex-col gap-2">
          <select
            name="provinsi"
            id="provinsi"
            onChange={(e) => {
              setProvinsi(e.target.value);
            }}
          >
            {listProvinsi.data.map((provinsi) => (
              <option key={provinsi.name} value={provinsi.code}>
                {provinsi.name}
              </option>
            ))}
          </select>
          <select
            disabled={!listKota}
            onChange={(e) => {
              setKota(e.target.value);
            }}
          >
            {listKota?.data.map((kota) => (
              <option key={kota.name} value={kota.code}>
                {kota.name}
              </option>
            ))}
          </select>
          <select>
            {listKecamatan?.data.map((kecamatan) => (
              <option key={kecamatan.name} value={kecamatan.code}>
                {kecamatan.name}
              </option>
            ))}
          </select>
        </form>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700">Simpan</button>
    </div>
  );
};
