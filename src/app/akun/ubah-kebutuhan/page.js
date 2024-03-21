import { UbahKebutuhan } from "./components/UbahKebutuhan";
import { getUserData } from "@/lib/auth";
import Link from "next/link";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const considerations = userData.mitra.considerations;
  return <>
    <Link href="/akun" className="button h-12 self-start text-base">
      {'<'} Kembali ke Akun Saya
    </Link>
    <div className="py-8">
      <div className="text-xl font-semibold">Penyetelan</div>
      <h3 className="text-4xl font-bold">Ubah Kebutuhan</h3>
    </div>
    <UbahKebutuhan considerations={considerations} />
  </>
}
