import { getUserData } from "@/lib/auth";
import { UbahTglLahirBtn } from "./components/UbahTglLahir";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BackToAkunPageButton } from "../component";

export default async function UbahTglLahir() {
  const user = await getUserData();
  if (!user.mitra) redirect("/akun");
  const date = user.mitra.dateOfBirth;
  const dateOfBirth = new Date(date).toISOString().split("T")[0];

  return (
    <>
      <BackToAkunPageButton />
      <div className="py-8">
        <div className="text-xl font-semibold">Penyetelan</div>
        <h3 className="text-4xl font-bold">Ubah Tanggal Lahir</h3>
      </div>
      <UbahTglLahirBtn dateOfBirth={dateOfBirth} user={user} />
    </>
  );
}
