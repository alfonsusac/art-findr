import { getUserData } from "@/lib/auth";
import { UbahTglLahirBtn } from "./UbahTglLahir";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BackToAkunPageButton, LayoutPenyetelanAkun } from "../component";

export default async function UbahTglLahir() {
  const user = await getUserData();
  if (!user.mitra) redirect("/akun");
  const date = user.mitra.dateOfBirth;
  const dateOfBirth = new Date(date).toISOString().split("T")[0];

  return (
    <LayoutPenyetelanAkun title={"Ubah Tanggal Lahir"}>
      <UbahTglLahirBtn dateOfBirth={dateOfBirth} user={user} />
    </LayoutPenyetelanAkun>
  );
}
