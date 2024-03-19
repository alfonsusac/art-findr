"use client";

import { useRouter } from "next/navigation";
import { InputTanggalLahir } from "./daftar-mitra/InputTanggalLahir";
import { InputKebutuhan } from "./daftar-mitra/InputKebutuhan";
import { InputKeterampilan } from "./daftar-mitra/InputKeterampilan";
import { InputHarga } from "./daftar-mitra/InputHarga";
import { InputFotoDiri } from "./daftar-mitra/InputFotoDiri";
import { InputFotoKTP } from "./daftar-mitra/InputFotoKTP";

export default function DaftarMitra() {
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/daftar-mitra/selesai", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    route.refresh();
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex justify-between">
        <button
          onClick={async () => {
            await fetch("/api/daftar-mitra/batal", { method: "DELETE" });
          }}
        >
          Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputTanggalLahir />
        <InputKebutuhan />
        <InputKeterampilan />
        <InputHarga />
        <InputFotoDiri />
        <InputFotoKTP />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
