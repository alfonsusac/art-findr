import { getUserData } from "@/lib/auth";
import { UbahTglLahirBtn } from "./components/UbahTglLahir";
import Link from "next/link";

export default async function UbahTglLahir() {
  const user = await getUserData();
  const date = user?.mitra?.dateOfBirth;
  const dateOfBirth = new Date(date).toISOString().split("T")[0];

  return (
    <div
      key="1"
      className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-4"
    >
      <div className="flex items-center justify-between w-full max-w-md mb-8">
        <Link href="/akun">
          <span className="text-sm">Batal</span>
        </Link>
      </div>
      <div className="w-full max-w-md mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Ubah Tanggal Lahir
        </h1>
        <label className="block text-lg mb-2" htmlFor="birthdate">
          Tanggal Lahir Saya:
        </label>

        <UbahTglLahirBtn dateOfBirth={dateOfBirth} />
      </div>
    </div>
  );
}
