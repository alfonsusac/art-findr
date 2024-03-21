import React from "react";
import { UbahKtp } from "./components/UbahKtp";
import Link from "next/link";

export default function UbahFotoKtp() {
  return <>
    <Link href="/akun" className="button h-12 self-start text-base">
      {'<'} Kembali ke Akun Saya
    </Link>
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Foto KTP</h3>
    </div>
    <UbahKtp />
  </>
}
