import { RegisterForm } from "../components/RegisterForm";
import { getUserSession, getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOutRegister } from "../components/LogOutRegister";

export default async function PageDaftar() {
  const session = await getUserSession();
  const userData = await getUserData();

  if (!session) {
    redirect("/masuk");
  }

  if (userData) {
    redirect("/akun");
  }

  console.log(userData);

  return (
    <div
      key="1"
      className="bg-white min-h-screen flex flex-col items-center justify-center text-black p-4"
    >
      <div className="w-full max-w-sm rounded-lg bg-[#262626] p-6 text-white">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-lg font-bold uppercase">CariART</h1>
            <h2 className="text-3xl font-bold">Daftar</h2>
          </div>
          <div />
        </div>
        <div className="mt-4">
          <div className="text-center text-sm space-y-4">
            <p>Masuk dengan</p>
            <a className="font-semibold underline" href="#">
              {session.email || session.phoneNumber}
            </a>
          </div>
          <LogOutRegister />
        </div>

        <RegisterForm session={session} />
      </div>
    </div>
  );
}
