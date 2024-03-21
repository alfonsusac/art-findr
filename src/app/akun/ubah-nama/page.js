import React from "react";
import { UbahNama } from "./components/UbahNama";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { TextLogo } from "@/components/logo";

export default async function ubahNamaPage() {
  const userData = await getUserData();
  return <>
    <Link href="/akun" className="button h-12 self-start text-base">
      {'<'} Kembali ke Akun Saya
    </Link>
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      {/* <TextLogo /> */}
      <h3 className="text-4xl font-bold">Ubah Nama Lengkap</h3>
    </div>
    <UbahNama userData={userData} />
  </>
}
