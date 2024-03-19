import { getUserSession, getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOutRegister } from "../components/LogOutRegister";
import { DaftarForm } from "../components/DaftarForm";
import {
  getListProvinsi,
  getListKotaKabupaten,
  getKecamatan,
} from "@/lib/fetchLocation";
import { TextLogo } from "@/components/logo";

export default async function PageDaftar({ searchParams }) {
  const listProvinsi = await getListProvinsi();
  const session = await getUserSession();
  const userData = await getUserData();
  let listKota;
  let listKecamatan;

  if (!session) {
    redirect("/masuk");
  }

  if (userData) {
    redirect("/akun");
  }

  if (searchParams.provinsi) {
    try {
      listKota = await getListKotaKabupaten(searchParams.provinsi);
    } catch (error) {
      throw new Error("Error fetching list kota");
    }
  }

  if (searchParams.kota) {
    try {
      listKecamatan = await getKecamatan(searchParams.kota);
    } catch (error) {
      throw new Error("Error fetching list kecamatan");
    }
  }

  return (
    <>
      <div className="pb-6 text-center flex flex-col gap-2 text-lg">
        <TextLogo />
        <h1 className="mb-2 text-3xl font-semibold">Pendaftaran</h1>
        <p className="max-w-xs text-lg">
          Satu langkah lagi sebelum anda bisa mulai menggunakan layanan CariART
        </p>
      </div>

      <div className="text-center text-lg w-full max-w-xs">
        <p>Saat ini, anda teridentifikasi dengan:</p>
        <div className="font-semibold" href="#">
          {session.email || session.phoneNumber}
        </div>
        <LogOutRegister className={"mt-2 text-lg"}>
          Batalkan
        </LogOutRegister>
      </div>

      <DaftarForm
        session={session}
        listProvinsi={listProvinsi}
        listKota={listKota}
        listKecamatan={listKecamatan}
      />
    </>
  );
}
