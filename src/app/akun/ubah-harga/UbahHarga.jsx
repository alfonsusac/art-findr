"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhCheckCircleFill, PhPlusBold } from "../DaftarMitra";
import { cn } from "@/lib/utils";

export const UbahHarga = ({ considerations, user }) => {
  const router = useRouter();

  const [error, setError] = useState({})
  const clearFormError = () => setError({})


  const [hargaPerJam, setHargaPerJam] = useState(!!user.mitra.pricePerHour)
  const [hargaHarian, setHargaHarian] = useState(!!user.mitra.pricePerDay)
  const [hargaBulanan, setHargaBulanan] = useState(!!user.mitra.pricePerMonth)

  return (
    <form action={async (form) => {
      clearFormError()

      const perJam = form.get('harga-per-jam')
      const perHari = form.get('harga-per-hari')
      const perBulan = form.get('harga-per-bulan')

      if (!perJam && !perHari && !perBulan) {
        return setError({ harga: "Mohon isi salah satu harga 🙏" })
      }

      const res = await fetch("/api/ubah-data-mitra", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pricePerHour: Number(perJam) ?? undefined,
          pricePerDay: Number(perHari) ?? undefined,
          pricePerMonth: Number(perBulan) ?? undefined,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        router.push("/akun");
        router.refresh()
      } else {
        toast.error(data.message);
      }

      // const ok = await setHarga(Number(perJam), Number(perHari), Number(perBulan))
      // if (ok) {
      //   await fetch("/api/daftar-mitra/selesai", {
      //     method: "POST",
      //   });
      //   route.refresh();
      // }
    }}>
      <label htmlFor="tanggal-lahir" className="text-2xl">Harga jasa saya:</label>
      <div className="my-4 flex flex-col gap-2">
        <div className="h-36 flex items-stretch">
          {
            hargaPerJam
              ? <fieldset className="flex-1">
                <label htmlFor="harga-per-jam">Harga Per Jam</label>
                <div className="input flex gap-2 items-center text-xl text-neutral-400 select-none">
                  Rp.
                  <input
                    type="number"
                    id="harga-per-jam"
                    name="harga-per-jam"
                    min={0}
                    defaultValue={user.mitra.pricePerHour ?? 0}
                    className="h-full outline-none grow text-black text-end flex-1"
                  />
                  <span className="text-neutral-600">
                    per jam
                  </span>
                </div>
                <button className="button" onClick={() => {
                  setHargaPerJam(false)
                }}>Hapus Data Per Jam</button>
              </fieldset>
              : <div
                className="grow flex items-center justify-center bg-neutral-100 rounded-lg gap-2 hover:bg-neutral-200 cursor-pointer"
                onClick={async () => {
                  setHargaPerJam(true)
                }}
              >
                <PhPlusBold /> Tambah Harga Per Jam
              </div>
          }
        </div>
        <div className="w-full h-36 flex items-stretch">

          {
            hargaHarian
              ? <fieldset className="flex-1">
                <label htmlFor="harga-per-hari">Harga Harian</label>
                <div className="input flex gap-2 items-center text-xl text-neutral-400 select-none">
                  Rp.
                  <input
                    type="number"
                    id="harga-per-hari"
                    name="harga-per-hari"
                    min={0}
                    defaultValue={user.mitra.pricePerDay ?? 0}
                    className="outline-none flex-1 text-black text-end"
                  />
                  <span className="text-neutral-600">
                    Harian
                  </span>
                </div>
                <button className="button" onClick={() => {
                  setHargaHarian(false)
                }}>Hapus Data Harian</button>
              </fieldset>
              : <div
                className="grow flex items-center justify-center bg-neutral-100 rounded-lg gap-2 hover:bg-neutral-200 cursor-pointer"
                onClick={async () => {
                  setHargaHarian(true)
                }}
              >
                <PhPlusBold /> Tambah Harga Harian
              </div>
          }
        </div>
        <div className="w-full h-36 flex items-stretch">

          {
            hargaBulanan
              ? <fieldset className="flex-1">
                <label htmlFor="harga-per-bulan">Harga Bulanan</label>
                <div className="input flex gap-2 items-center text-xl text-neutral-400 select-none">
                  Rp.
                  <input
                    type="number"
                    id="harga-per-bulan"
                    name="harga-per-bulan"
                    min={0}
                    defaultValue={user.mitra.pricePerMonth ?? 0}
                    className="outline-none flex-1 text-black text-end"
                  />
                  <span className="text-neutral-600">
                    per bulan
                  </span>
                </div>
                <button className="button" onClick={() => {
                  setHargaBulanan(false)
                }}>Hapus Data Bulanan</button>
              </fieldset>
              : <div
                className="w-full h-36 flex items-center justify-center bg-neutral-100 rounded-lg gap-2 hover:bg-neutral-200 cursor-pointer"
                onClick={async () => {
                  setHargaBulanan(true)
                }}
              >
                <PhPlusBold /> Tambah Harga Bulanan
              </div>
          }
        </div>
        {
          error.harga && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.harga}
          </div>
        }
      </div>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selesai
      </button>
    </form>
  )

  return (
    <form action={async (form) => {
      clearFormError()
      const values = []
      form.forEach((e) => {
        values.push(e)
      })

      console.log(values)

      const res = await fetch("/api/ubah-data-mitra", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ considerations: values }),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        router.push("/akun");
        router.refresh()
      } else {
        toast.error(data.message);
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Pertimbangan</label>
        <p>Apakah ada yang harus diketahui untuk pencari Mitra?</p>
        <div className="flex flex-col gap-2">
          {
            [
              { value: "Alergi Anjing", detail: "Saya memiliki alergi anjing" },
              { value: "Alergi Kucing", detail: "Saya memiliki alergi kucing" },
            ].map((item, idx) => {
              return <div
                key={idx}
                className="flex gap-2 items-center group"
              >
                <input
                  type="checkbox"
                  id={"item" + idx}
                  name="vehicle1"
                  value={item.value}
                  className="hidden peer"
                  defaultChecked={user?.mitra?.considerations?.includes(item.value) ?? undefined}
                />
                <label
                  htmlFor={"item" + idx}
                  className={cn(
                    "w-full block p-3 px-3 leading-none border border-neutral-300 rounded-md",
                    "transition-all",
                    "font-normal text-lg",
                    "peer-checked:outline-primary",
                    "hover:bg-primary/10",
                    "peer-checked:bg-primary/20",
                    "outline outline-0",
                    "text-white/0",
                    "peer-checked:text-primary",
                    "select-none",
                    "cursor-pointer",
                    "flex justify-between items-center",
                  )}
                >
                  <div className="text-black text-xl">
                    {item.detail}
                  </div>
                  <PhCheckCircleFill className="text-3xl" />
                </label>
              </div>
            })
          }
        </div>
        {
          error.kebutuhanKhusus && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.kebutuhanKhusus}
          </div>
        }
      </fieldset>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Simpan
      </button>
    </form>
  )
};
