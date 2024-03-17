import { UbahKeterampilan } from "./components/UbahKeterampilan";
import { getUserData } from "@/lib/auth";

export default async function UbahKeterampilanPage() {
  const userData = await getUserData();
  const expertises = userData?.mitra?.expertises;
  console.log(userData);
  return <UbahKeterampilan expertises={expertises} />;
}
