import { UbahKebutuhan } from "./UbahKebutuhan";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const considerations = userData.mitra.considerations;
  return <LayoutPenyetelanAkun title={"Ubah Kebutuhan"}>
    <UbahKebutuhan considerations={considerations} user={userData} />
  </LayoutPenyetelanAkun>
}
