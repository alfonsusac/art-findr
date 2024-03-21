import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { UbahHarga } from "./UbahHarga";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function UbahHargaPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  // const considerations = userData.mitra.considerations;
  return <LayoutPenyetelanAkun title={"Ubah Harga"}>
    <UbahHarga user={userData} />
  </LayoutPenyetelanAkun>
}
