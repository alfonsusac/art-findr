"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = ({ session }) => {
  const router = useRouter();

  return (
    <form
      className="mt-6"
      action={async (form) => {
        try {
          const res = await fetch("/api/daftar", {
            method: "POST",
            body: form,
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
        {session.phoneNumber && (
          <input
            type="email"
            name="email"
            className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
            placeholder="john@gmail.com"
          />
        )}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold">Lokasi</label>
          <input
            name="provinsi"
            className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
            placeholder="Provinsi"
            type="text"
          />
          <input
            name="kota"
            className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
            placeholder="Kota/Kabupaten"
            type="text"
          />
          <input
            name="kecamatan"
            className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
            placeholder="Kecamatan"
            type="text"
          />
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
