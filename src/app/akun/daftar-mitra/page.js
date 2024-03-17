import { getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";

import DaftarMitra from "./components/DaftarMitra";

export default function page() {
//   const userData = getUserData();

//   if (!userData.mitra) {
//     redirect("/akun");
//   }

  return(
    <div className="flex flex-col items-center w-full">
        <DaftarMitra />
    </div>
  );
}
