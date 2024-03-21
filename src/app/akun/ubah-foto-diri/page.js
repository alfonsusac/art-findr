import React from "react";
import UbahFoto from "./UbahFoto";
import Link from "next/link";
import { getUserData } from "@/lib/auth";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function UbahFotoDiri() {
  return <LayoutPenyetelanAkun title={"Ubah Foto Diri"}>
    <UbahFoto user={await getUserData()}/>
  </LayoutPenyetelanAkun>
}
