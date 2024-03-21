import { redirect } from "next/navigation";
import { UbahKeterampilan } from "./UbahKeterampilan";
import { getUserData } from "@/lib/auth";
import Link from "next/link";
import { FormKeterampilan } from "../DaftarMitra";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const expertises = userData.mitra.expertises;

  // console.log(userData);
  return <>
    <Link href="/akun" className="button h-12 self-start text-base">
      {'<'} Kembali ke Akun Saya
    </Link>
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
