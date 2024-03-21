import React from "react";
import { UbahNama } from "./components/UbahNama";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { BackToAkunPageButton } from "../component";

export default async function ubahNamaPage() {
  const userData = await getUserData();
  return <>
    <BackToAkunPageButton />
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Nama Lengkap</h3>
    </div>
    <UbahNama userData={userData} />
  </>
}
