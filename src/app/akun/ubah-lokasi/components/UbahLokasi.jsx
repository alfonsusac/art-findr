import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { getUserData } from "@/lib/auth";

export const UbahLokasi = async () => {
  const userData = await getUserData();
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/akun">Batal{"\n          "}</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Ubah Lokasi</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Lokasi</h2>
      </div>
      <div className="mb-6 text-white space-y-2">
        <div>
          <label>Provinsi</label>
          <input className="w-full" />
        </div>

        <div>
          <label>Kota / Kabupaten</label>
          <input className="w-full" />
        </div>

        <div>
          <label>Kecamatan</label>
          <input className="w-full" />
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700">Simpan</button>
    </div>
  );
};
