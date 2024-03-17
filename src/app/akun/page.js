import React from "react";
import { getUserSession, getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";

import { DashboardRegular } from "./DashboardRegular";
import { DashboardMitra } from "./DashboardMitra";
import DaftarMitra from "./DaftarMitra";

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
  return (

    <div className="p-10">
      <DaftarMitra />
    </div>
  )
}
