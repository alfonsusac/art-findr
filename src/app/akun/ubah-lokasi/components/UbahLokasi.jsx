"use client";
import React from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const UbahLokasi = ({
  listProvinsi,
  listKota,
  listKecamatan,
  salahProvinsi,
  salahKota,
  userData,
}) => {
  const [provinsi, setProvinsi] = useQueryState("provinsi", {
    shallow: false,
  });
  const [kota, setKota] = useQueryState("kota", {
    shallow: false,
  });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", {
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

    // console.log(userData);
  }, [salahProvinsi, salahKota, setProvinsi, setKota]);

  function handleUpdate() {
    const res = fetch("/api/ubah-data-user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provinsi: provinsi,
        kota: kota,
        kecamatan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => console.error("Fetch error:", error));
  }

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
            name="kota"
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
          <select
            name="kecamatan"
            disabled={!listKecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
          >
            {listKecamatan?.data.map((kecamatan) => (
              <option key={kecamatan.name} value={kecamatan.code}>
                {kecamatan.name}
              </option>
            ))}
          </select>
        </form>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Simpan
      </button>
    </div>
  );
};
