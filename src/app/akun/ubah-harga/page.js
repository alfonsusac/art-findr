import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { UbahHarga } from "./UbahHarga";
import { BackToAkunPageButton } from "../component";

export default async function UbahHargaPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  // const considerations = userData.mitra.considerations;
  return <>
    <BackToAkunPageButton />
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Harga</h3>
    </div>
    <UbahHarga user={userData} />
  </>
}
