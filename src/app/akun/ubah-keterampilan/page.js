import { redirect } from "next/navigation";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { UbahKeterampilan } from "./UbahKeterampilan";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const expertises = userData.mitra.expertises;

  // console.log(userData);
  return <LayoutPenyetelanAkun title={"Ubah Keterampilan"}>
    <UbahKeterampilan
      expertises={expertises}
      user={userData}
    />
  </LayoutPenyetelanAkun>
}
