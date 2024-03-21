"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const UbahTglLahirBtn = ({ dateOfBirth, user }) => {
  const router = useRouter();
  const [dobValue, setDobValue] = useState(dateOfBirth);
  async function handleUpdate() {
    const res = await fetch("/api/ubah-data-mitra", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dateOfBirth: new Date(dobValue) }),
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      router.push("/akun");
    } else {
      toast.error(data.message);
    }
  }

  const defaultTglLahir = user.mitra.dateOfBirth?.toISOString().split('T')[0]
  const [error, setError] = useState({})
  const clearFormError = () => setError({})

  return (
    <form action={async (form) => {
      clearFormError()
      const value = form.get('tanggal-lahir')
      // TODO: cek if value is not greater than Date.now()
      // TODO: cek umur (atleast 18 year? 20 year? idk)
      if (!value) {
        return setError({ tglLahir: "Mohon isi tanggal lahir anda 🙏" })
      }
      const ok = await setTanggalLahir(value)
      if (ok) {
        router.refresh()
        return setLangkah(1)
      }
    }}>
      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Tanggal lahir Saya:</label>
        <input
          type="date"
          id="tanggal-lahir"
          name="tanggal-lahir"
          className="input"
          data-error={!!error.tglLahir}
          defaultValue={defaultTglLahir ?? undefined}
        />

        {
          error.tglLahir && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.tglLahir}
          </div>
        }
      </fieldset>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selanjutnya
      </button>
    </form>
  );
};
