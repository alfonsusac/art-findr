import React from "react";
import { getUserData } from "@/lib/auth";

import { DashboardRegular } from "./DashboardRegular";
import { DashboardMitra } from "./DashboardMitra";
import DaftarMitra from "./DaftarMitra";
import { getURLfotoDiri, getURLfotoKTP } from "@/lib/link-foto";


export default async function pageAkun() {
  const userData = await getUserData({
    redirectIfNoData: true,
    redirectIfNoSession: true,
  });


  if (userData.mitra) {
    const urlFotoDiri = await getURLfotoDiri(userData.id)
    const urlFotoKTP = await getURLfotoKTP(userData.id)

    return <DashboardMitra
      mitra={userData.mitra}
      uid={userData.id}
      fullName={userData.fullName}
      phoneNumber={userData.phoneNumber}
      email={userData.email}
      province={userData.location.provinsi}
      city={userData.location.kota}
      urlFotoDiri={urlFotoDiri}
      urlFotoKTP={urlFotoKTP}
    />;
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
