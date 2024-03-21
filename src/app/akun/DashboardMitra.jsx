"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { TextLogo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PhCheckCircleFill } from "./DaftarMitra";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import { BackToIndexPageButton } from "./component";


export function PhCaretLeftFill(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M168 48v160a8 8 0 0 1-13.66 5.66l-80-80a8 8 0 0 1 0-11.32l80-80A8 8 0 0 1 168 48"></path></svg>
  )
}


export const DashboardMitra = ({
  mitra,
  uid,
  fullName,
  email,
  phoneNumber,
  city,
  province,
  urlFotoDiri,
  urlFotoKTP,

}) => {
  const router = useRouter()
  return (
    <>
      <BackToIndexPageButton />
      <div className="py-8">
        <TextLogo />
        <h3 className="text-5xl font-bold">Akun Saya</h3>
      </div>
      <h1 className="mb-1 text-xl">Selamat Datang</h1>
      <div className="border border-neutral-300 rounded-lg p-4 -mx-4">
        <div className="inline-flex p-2 px-3 leading-none bg-primary rounded-full text-sm font-semibold text-white mb-1">MITRA</div>
        <h3 className="text-2xl font-semibold">{fullName}</h3>
        <p className="text-xl">{email}</p>
        <p className="text-xl">{phoneNumber}</p>
        <p>
          {city}, {province}
        </p>
      </div>
      <Link href={"/akun/ubah-nama"} className="button text-lg py-3 -mx-4">
        Ubah Nama Lengkap
      </Link>
      <Link href={"/akun/ubah-lokasi"} className="button text-lg py-3 -mx-4">
        Ubah Lokasi
      </Link>

      <section className="py-4">
        <div className="pl-1 py-1 font-semibold text-2xl mt-4">Status Kesibukan Anda:</div>
        <form className="p-1 -mx-4 bg-neutral-100 rounded-2xl border border-neutral-200 flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <input
              hidden
              type="radio"
              name="kesibukan"
              id="sibuk"
              className="peer"
              checked={mitra.status === "Sibuk"}
              onChange={async (e) => {
                // toast("Sibuk Changed")
                await fetch("/api/akun", { method: "PATCH", body: JSON.stringify({ mitraValue: "Sibuk" }) })
                toast("Berhasil mengubah status anda!")
                router.refresh()
              }}
            />
            <label
              className={cn(
                "font-medium text-xl cursor-pointer",
                "transition-all",
                "p-4 w-full rounded-xl leading-none",
                "hover:bg-neutral-200",
                "bg-neutral-100",
                "peer-checked:bg-primary",
                "peer-checked:text-white",
                "text-black",
                "peer-checked:text-white",
                "peer-checked:[&>span]:text-white",
                "[&>svg]:text-transparent",
                "peer-checked:[&>svg]:text-white",
                "flex items-center justify-between",
              )}
              htmlFor="sibuk"
            >
              <span className="">Sibuk</span>
              <PhCheckCircleFill className="text-3xl leading-none -my-2 transition-all" />
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              hidden
              type="radio"
              name="kesibukan"
              id="tersedia"
              className="peer"
              checked={mitra.status === "Tersedia"}
              onChange={async (e) => {
                // toast("Tersedia Changed")
                await fetch("/api/akun", { method: "PATCH", body: JSON.stringify({ mitraValue: "Tersedia" }) })
                toast("Berhasil mengubah status anda!")
                router.refresh()
              }}
            />
            <label
              className={cn(
                "font-medium text-xl cursor-pointer",
                "transition-all",
                "p-4 w-full rounded-xl leading-none",
                "hover:bg-neutral-200",
                "bg-neutral-100",
                "peer-checked:bg-primary",
                "peer-checked:text-white",
                "text-black",
                "peer-checked:text-white",
                "peer-checked:[&>span]:text-white",
                "peer-checked:[&>svg]:text-white",
                "[&>svg]:text-transparent",
                "flex items-center justify-between",
              )}
              htmlFor="tersedia"
            >
              <span className="">Tersedia</span>
              <PhCheckCircleFill className="text-3xl leading-none -my-2 transition-all" />
            </label>
          </div>
        </form>
      </section>

      <section className="py-4">
        <div className="pl-1 py-1 font-semibold mb-2 text-2xl mt-4">Keterampilan Anda:</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {
            mitra.expertises.map(e =>
              <div key={e} className="flex-inline bg-primary/20 leading-none p-2 px-3 rounded-full border border-primary/40">{e}</div>
            )
          }
        </div>
        <Link href={"/akun/ubah-keterampilan"} className="button text-lg py-3">
          Ubah Keterampilan
        </Link>
      </section>

      <section className="py-4">
        <div className="pl-1 py-1 font-semibold mb-2 text-2xl mt-4">Pertimbangan Anda:</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {
            mitra.considerations.map(e =>
              <div key={e} className="flex-inline bg-primary/20 leading-none p-2 px-3 rounded-full border border-primary/40">{e}</div>
            )
          }
        </div>
        <Link href={"/akun/ubah-kebutuhan"} className="button text-lg py-3">
          Ubah Kebutuhan Khusus
        </Link>
      </section>

      <section className="py-4">
        <div className="pl-1 py-1 font-semibold mb-2 text-2xl mt-4">Harga Jasa Anda:</div>
        <div className="flex flex-col gap-2 mb-4">

          <div className="p-3 flex flex-col gap-2 bg-neutral-100 rounded-xl border border-primary/40s h-20">
            <div className="leading-none font-medium text-sm">Harga Per Jam:</div>
            {
              mitra.pricePerHour
                ?
                <div className="text-2xl flex gap-1">
                  <span className="text-neutral-500">Rp.</span>
                  <span className="font-bold">{Number(mitra.pricePerHour).toLocaleString()}</span>
                  <span className="text-primary font-semibold">/jam</span>
                </div>
                :
                <div className="text-neutral-400 text-2xl">
                  Tidak ada harga per jam
                </div>
            }
          </div>

          <div className="p-3 flex flex-col gap-2 bg-neutral-100 rounded-xl border border-primary/40s h-20">
            <div className="leading-none font-medium text-sm">Harga Harian:</div>
            {
              mitra.pricePerDay
                ?
                <div className="text-2xl flex gap-1">
                  <span className="text-neutral-500">Rp.</span>
                  <span className="font-bold">{Number(mitra.pricePerDay).toLocaleString()}</span>
                  <span className="text-primary font-semibold">/hari</span>
                </div>
                :
                <div className="text-neutral-400 text-2xl">
                  Tidak ada harga harian
                </div>
            }
          </div>

          <div className="p-3 flex flex-col gap-2 bg-neutral-100 rounded-xl border border-primary/40s h-20">
            <div className="leading-none font-medium text-sm">Harga Bulanan:</div>
            {
              mitra.pricePerMonth
                ?
                <div className="text-2xl flex gap-1">
                  <span className="text-neutral-500">Rp.</span>
                  <span className="font-bold">{Number(mitra.pricePerMonth).toLocaleString()}</span>
                  <span className="text-primary font-semibold">/bulan</span>
                </div>
                :
                <div className="text-neutral-400 text-2xl">
                  Tidak ada harga bulanan
                </div>
            }

          </div>


        </div>
        <Link href={"/akun/ubah-harga"} className="button text-lg py-3">
          Ubah Harga
        </Link>
      </section>

      <section className="py-4">
        <div className="pl-1 py-1 font-semibold mb-2 text-2xl mt-4">Tanggal Lahir Anda</div>
        <div className="text-2xl mb-4">
          {mitra.dateOfBirth.getDate()}/
          {mitra.dateOfBirth.getUTCMonth()}/
          {mitra.dateOfBirth.getUTCFullYear()}
        </div>
        <Link href={"/akun/ubah-tgl-lahir"} className="button text-lg py-3">
          Ubah Tgl Lahir
        </Link>
      </section>


      <section className="py-4">
        <div className="pl-1 py-1 font-semibold mb-2 text-2xl mt-4">Foto Anda</div>
        <div className="text-2xl mb-4 w-full aspect-[9/10] relative rounded-xl overflow-hidden shadow-lg shadow-black/20">
          <img src={urlFotoDiri} alt="" width={999} height={999} className="absolute inset-0 object-cover h-full w-full" />
        </div>
        <Link href={"/akun/ubah-foto-diri"} className="button text-lg py-3">
          Ubah Foto Diri
        </Link>
      </section>


      <section className="py-4">
        <div className="pl-1 py-1 font-semibold mb-2 text-2xl mt-4">Foto KTP Anda</div>
        <div className="text-2xl mb-4 w-full aspect-[1000/631] relative rounded-xl overflow-hidden shadow-lg shadow-black/20">
          <img src={urlFotoKTP} alt="" width={999} height={999} className="absolute inset-0 object-cover h-full w-full" />
        </div>
        <Link href={"/akun/ubah-foto-ktp"} className="button text-lg py-3">
          Ubah Foto KTP
        </Link>
      </section>

      <button
        className="button h-14  my-8 text-xl w-full"
        onClick={() => {
          signOut();
        }}
      >
        Keluar Dari Aplikasi
      </button>

      <div className="mb-24"/>
    </>
  );
};
