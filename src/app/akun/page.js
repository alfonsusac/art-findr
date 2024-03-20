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
    return <DashboardMitra mitra={userData.mitra} uid={userData.id} />;
  }

  if (!userData.calonMitra) {
    return (
      <>

        <DashboardRegular
          uid={userData.id}
          fullName={userData.fullName}
          phoneNumber={userData.phoneNumber}
          email={userData.email}
          province={userData.location.provinsi}
          city={userData.location.kota}
        />
      </>
    );
  }
  return (
    <div className="">
      <DaftarMitra user={userData} />
    </div>
  );
}
