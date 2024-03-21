import { UbahKebutuhan } from "./UbahKebutuhan";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { BackToAkunPageButton } from "../component";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const considerations = userData.mitra.considerations;
  return <>
    <BackToAkunPageButton />
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Kebutuhan</h3>
    </div>
    <UbahKebutuhan considerations={considerations} user={userData} />
  </>
}
