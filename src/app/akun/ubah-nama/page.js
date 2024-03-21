import React from "react";
import { UbahNama } from "./UbahNama";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function ubahNamaPage() {
  const userData = await getUserData();
  return <>
    <LayoutPenyetelanAkun title={"Ubah Nama Lengkap"}>
      <UbahNama userData={userData} />
    </LayoutPenyetelanAkun>
  </>
}
