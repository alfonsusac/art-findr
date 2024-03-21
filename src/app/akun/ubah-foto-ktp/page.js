import React from "react";
import { UbahKtp } from "./UbahKtp";
import Link from "next/link";
import { getUserData } from "@/lib/auth";
import { BackToAkunPageButton } from "../component";

export default async function UbahFotoKtp() {
  return <>
    <BackToAkunPageButton />
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Foto KTP</h3>
    </div>
    <UbahKtp user={await getUserData()} />
  </>
}
