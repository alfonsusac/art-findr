import { RegisterForm } from "../components/RegisterForm";

export default async function PageDaftar() {
  return (
    <div
      key="1"
      className="bg-white min-h-screen flex flex-col items-center justify-center text-black p-4"
    >
      <div className="w-full max-w-sm rounded-lg bg-[#262626] p-6 text-white">
        <div className="flex items-center justify-between">
          <a
            className="text-sm font-semibold text-gray-400 hover:text-gray-300"
            href="#"
          >
            {`< Batal`}
          </a>
          <div className="text-center">
            <h1 className="text-lg font-bold uppercase">CariART</h1>
            <h2 className="text-3xl font-bold">Daftar</h2>
            <h3>Welcome, </h3> {/* Render user data */}
          </div>
          <div />
        </div>
        <div className="mt-4">
          <div className="text-center text-sm">
            <p>Masuk dengan</p>
            <a className="font-semibold underline" href="#">
              alfonsusac@gmail.com
            </a>
          </div>
          <button className="mt-2 w-full rounded bg-gray-700 py-2 text-sm font-semibold hover:bg-gray-600">
            Batalkan
          </button>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
