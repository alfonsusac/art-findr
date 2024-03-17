import React from "react";
import { getUserData } from "@/lib/auth";

import { DashboardRegular } from "./DashboardRegular";
import { DashboardMitra } from "./DashboardMitra";
import DaftarMitra from "./DaftarMitra";

export default async function pageAkun() {
  const userData = await getUserData({
    redirectIfNoData: true,
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
  return (

    <div className="p-10">
      <DaftarMitra />
    </div>
  )
}
