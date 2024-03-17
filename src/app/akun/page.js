import React from "react";
import { getUserSession, getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardRegular } from "@/components/akun/DashboardRegular";
import { DaftarMitra } from "@/components/akun/DaftarMitra";
import { DashboardMitra } from "@/components/akun/DashboardMitra";

export default async function pageAkun() {
  const session = await getUserSession();

  if (!session) {
    redirect("/masuk");
  }

  const userData = await getUserData();

  if (!userData) {
    redirect("/daftar");
  }

  if (userData.mitra) {
    return <DashboardMitra mitra={userData.mitra} />;
  }

  if (!userData.calonMitra) {
    return (
      <DashboardRegular
        fullName={userData.fullName}
        email={userData.email}
        province={userData.location.provinsi}
        city={userData.location.kota}
      />
    );
  }
  <DaftarMitra />;
}
