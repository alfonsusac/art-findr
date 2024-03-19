"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const DaftarForm = ({
  session,
  listProvinsi,
  listKota,
  listKecamatan,
}) => {
  const [provinsi, setProvinsi] = useQueryState("provinsi", {
    shallow: false,
  });
  const [kota, setKota] = useQueryState("kota", {
    shallow: false,
  });
  const [kecamatan, setKecamatan] = useQueryState("kecamatan", {
    sjallow: false,
  });

  //handle the wilayah name for submission
  const [provinsiName, setProvinsiName] = useState("");
  const [kotaName, setKotaName] = useState("");
  const [kecamatanName, setKecamatanName] = useState("");

  const router = useRouter();

  return (
    <form
      className="mt-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const provinsiCode = formData.get("provinsi");
        const kotaCode = formData.get("kota");
        const kecamatanCode = formData.get("kecamatan");

        const selectedProvinsi = listProvinsi.find(
          (provinsi) => provinsi.code === provinsiCode
        );
        const selectedKota = listKota.find((kota) => kota.code === kotaCode);
        const selectedKecamatan = listKecamatan.find(
          (kecamatan) => kecamatan.code === kecamatanCode
        );

        formData.set("provinsi", selectedProvinsi ? selectedProvinsi.name : "");
        formData.set("kota", selectedKota ? selectedKota.name : "");
        formData.set(
          "kecamatan",
          selectedKecamatan ? selectedKecamatan.name : ""
        );

        // Convert FormData to JSON
        const formObject = Object.fromEntries(formData.entries());

        try {
          const res = await fetch("/api/daftar", {
            method: "POST",
            body: JSON.stringify(formObject),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();

          if (res.status === 400) {
            toast.error("Email atau nomor telfon sudah terdaftar!");
          }
          if (res.status === 200) {
            toast.success("Registrasi berhasil!");
            router.push("/akun");
          }
        } catch (error) {
          toast.error("Registrasi gagal!");
        }
      }}
    >
      <div className="flex flex-col space-y-4">
        <input
          name="fullName"
          className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
          placeholder="Nama Panjang"
          type="text"
        />
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Lokasi</label>
          <select
            name="provinsi"
            defaultValue=""
            className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
            onChange={(e) => setProvinsi(e.target.value)}
          >
            <option value="" disabled>
              Pilih Provinsi
            </option>
            {listProvinsi.map((provinsi) => (
              <option key={provinsi.name} value={provinsi.code}>
                {provinsi.name}
              </option>
            ))}
          </select>

          <select
            name="kota"
            defaultValue=""
            className={`${
              provinsi ? "" : "hidden"
            } w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none`}
            onChange={(e) => setKota(e.target.value)}
          >
            <option value="" disabled>
              Pilih Kota
            </option>
            {listKota?.map((kota) => (
              <option key={kota.name} value={kota.code}>
                {kota.name}
              </option>
            ))}
          </select>

          <select
            name="kecamatan"
            defaultValue=""
            className={`${
              kota ? "" : "hidden"
            } w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none`}
            onChange={(e) => setKecamatan(e.target.value)}
          >
            <option value="" disabled>
              Pilih Kecamatan
            </option>
            {listKecamatan?.map((kecamatan) => (
              <option key={kecamatan.name} value={kecamatan.code}>
                {kecamatan.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full rounded bg-gray-700 py-3 text-sm font-semibold hover:bg-gray-600"
          type="submit"
        >
          Daftar
        </button>
      </div>
    </form>
  );
};
