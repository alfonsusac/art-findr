import { redirect } from "next/navigation";
import { UbahKeterampilan } from "./components/UbahKeterampilan";
import { getUserData } from "@/lib/auth";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const expertises = userData.mitra.expertises;

  console.log(userData);
  return <UbahKeterampilan expertises={expertises} />;
}
