"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const fullName = form.get("fullName");
    const email = form.get("email");
    const provinsi = form.get("provinsi");
    const kota = form.get("kota");
    const kecamatan = form.get("kecamatan");
    const phoneNumber = form.get("phoneNumber");

    try {
      const response = await fetch("http://localhost:3000/api/daftar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          provinsi,
          kota,
          kecamatan,
          phoneNumber,
        }),
      });

      if (response.status === 400) {
        toast.error("Email sudah terdaftar!");
      }

      // Handle success
      toast.success("Registrasi berhasil!");
      router.push("/akun");
    } catch (error) {
      // Handle error
      toast.error("Registrasi gagal!");
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <input
          name="fullName"
          className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
          placeholder="Nama Panjang"
          type="text"
        />
        <input
          type="email"
          name="email"
          className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
          placeholder="john@gmail.com"
        />
        <input
          type="number"
          name="phoneNumber"
          className="w-full rounded bg-[#333333] py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none"
          placeholder="085777170181"
        />
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
            placeholder="Kecamata"
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
