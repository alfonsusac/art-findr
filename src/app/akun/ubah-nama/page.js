import React from "react";
import { UbahNama } from "./components/UbahNama";
import { getUserData } from "@/lib/auth";

export default async function ubahNamaPage() {
  const userData = await getUserData();
  return <UbahNama userData={userData} />;
}
