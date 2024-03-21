import { redirect } from "next/navigation";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { UbahKeterampilan } from "./UbahKeterampilan";
import { BackToAkunPageButton } from "../component";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const expertises = userData.mitra.expertises;

  // console.log(userData);
  return <>
    <BackToAkunPageButton />
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Keterampilan</h3>
    </div>
    <UbahKeterampilan
      expertises={expertises}
      user={userData}
    />
  </>
}
