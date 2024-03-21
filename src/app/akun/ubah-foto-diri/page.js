import React from "react";
import UbahFoto from "./UbahFoto";
import Link from "next/link";
import { getUserData } from "@/lib/auth";
import { BackToAkunPageButton } from "../component";

export default async function UbahFotoDiri() {
  return <>
    <BackToAkunPageButton />
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Foto Diri</h3>
    </div>
    <UbahFoto user={await getUserData()}/>
  </>
}
