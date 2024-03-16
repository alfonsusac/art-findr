import { UbahKebutuhan } from "./components/UbahKebutuhan";
import { getUserData } from "@/lib/auth";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  const considerations = userData?.mitra?.considerations;
  return <UbahKebutuhan considerations={considerations} />;
}
