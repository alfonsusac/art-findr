import { UbahKebutuhan } from "./components/UbahKebutuhan";
import { getUserData } from "@/lib/auth";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  if (!userData.mitra) redirect("/akun");
  const considerations = userData.mitra.considerations;
  return <UbahKebutuhan considerations={considerations} />;
}
