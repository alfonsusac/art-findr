import { getUserSession, getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOutRegister } from "../components/LogOutRegister";
import { DaftarForm } from "../components/DaftarForm";
import {
  getListProvinsi,
  getListKotaKabupaten,
  getKecamatan,
} from "@/lib/fetchLocation";

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
    <div
      key="1"
      className="bg-white min-h-screen flex flex-col items-center justify-center text-black p-4"
    >
      <div className="w-full max-w-sm rounded-lg bg-[#262626] p-6 text-white">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-lg font-bold uppercase">CariART</h1>
            <h2 className="text-3xl font-bold">Daftar</h2>
          </div>
          <div />
        </div>
        <div className="mt-4">
          <div className="text-center text-sm space-y-4">
            <p>Masuk dengan</p>
            <a className="font-semibold underline" href="#">
              {session.email || session.phoneNumber}
            </a>
          </div>
          <LogOutRegister />
        </div>

        {listProvinsi &&
          (listKota ? (
            listKecamatan ? (
              <DaftarForm
                session={session}
                listProvinsi={listProvinsi}
                listKota={listKota}
                listKecamatan={listKecamatan}
              />
            ) : (
              <DaftarForm
                session={session}
                listProvinsi={listProvinsi}
                listKota={listKota}
              />
            )
          ) : (
            <DaftarForm session={session} listProvinsi={listProvinsi} />
          ))}
      </div>
    </div>
  );
}
