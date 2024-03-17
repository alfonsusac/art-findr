import React from "react";
import { getUserData } from "@/lib/auth";
import { DashboardRegular } from "./components/DashboardRegular";
import { DashboardMitra } from "./components/DashboardMitra";
import { DaftarMitra } from "./components/DaftarMitra";

export default async function pageAkun() {
  const userData = await getUserData({
    redirectIfNotRegistered: true,
    redirectIfNoSession: true,
  });

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
