import React from "react";
import { UbahKtp } from "./UbahKtp";
import Link from "next/link";
import { getUserData } from "@/lib/auth";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function UbahFotoKtp() {
  return <LayoutPenyetelanAkun title={"Ubah Foto KTP"}>
    <UbahKtp user={await getUserData()} />
  </LayoutPenyetelanAkun>
}
