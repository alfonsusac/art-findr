"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectKecamatan, SelectKotaKabupaten, SelectProvinsi } from "@/components/wilayahSelect";
import { useForm } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const DaftarForm = ({
  session,
  listProvinsi,
  listKota,
  listKecamatan,
}) => {
  const router = useRouter();

  const form = useForm({
    // resolver: yupResolver()
  })

  return (
    <form
      action={async (form) => {
        console.log(form.get('provinsi').split('|')[1]) // 21|banten
      }}
      className="mt-6 w-full max-w-xs"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const provinsiValue = formData.get("provinsi");
        if (!provinsiValue) {
          toast.error("Mohon isi provinsi anda")
          return
        }
        const kotaValue = formData.get("kota");
        if (!kotaValue) {
          toast.error("Mohon isi kota/kabupaten anda")
          return
        }
        const kecamatanValue = formData.get("kecamatan");
        if (!kecamatanValue) {
          toast.error("Mohon isi kecamatan anda")
          return
        }

        formData.set("provinsi", provinsiValue.split('|')[1]);
        formData.set("kota", kotaValue.split('|')[1]);
        formData.set(
          "kecamatan",
          kecamatanValue.split('|')[1]
        );

        // Convert FormData to JSON
        const formObject = Object.fromEntries(formData.entries());

        try {
          console.log(formObject)
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

        <fieldset>
          <label>Nama Panjang</label>
          <input
            name="fullName"
            className="border border-gray-300 rounded-md h-14 px-4 text-lg"
            placeholder="Jojo Kusuma"
            type="text"
            required
          />
        </fieldset>
        <fieldset>
          <label>Lokasi</label>
          <SelectProvinsi
            name={"provinsi"}
            className="w-full text-lg h-14"
            listProvinsi={listProvinsi} />
          <SelectKotaKabupaten
            name={"kota"}
            className="w-full text-lg h-14"
            listKota={listKota} />
          <SelectKecamatan
            name={"kecamatan"}
            className="w-full text-lg h-14"
            listKecamatan={listKecamatan} />
          {/* <Select
            className=""
            value={provinsiFilter ?? undefined} onValueChange={(value) => {
              setProvinsi(value)
              setKota(null)
              setKecamatan(null)
            }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              {listProvinsi?.map((item, index) => (
                <SelectItem key={index} value={item.code}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>

          </Select> */}
          {/* <select
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
            className={`${provinsi ? "" : "hidden"
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
            className={`${kota ? "" : "hidden"
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
          </select> */}
        </fieldset>
        <button
          className="button btn-primary font-medium text-lg tracking-normal rounded-md text-white h-14"
          // className="button font-medium text-lg tracking-normal  h-14 w-full flex gap-2"
          // className="w-full rounded bg-gray-700 py-3 text-sm font-semibold hover:bg-gray-600"
          type="submit"
        >
          Daftar
        </button>
      </div>
    </form>
  );
};
