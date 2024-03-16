import { getUserData } from "@/lib/auth";

export default async function UbahTglLahir() {
  const user = await getUserData();
  console.log(user.mitra.dateOfBirth);
  return (
    <div
      key="1"
      className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-4"
    >
      <div className="flex items-center justify-between w-full max-w-md mb-8">
        <span className="text-sm">Batal</span>
      </div>
      <div className="w-full max-w-md mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Ubah Tanggal Lahir
        </h1>
        <label className="block text-lg mb-2" htmlFor="birthdate">
          Tanggal Lahir Saya:
        </label>
        <div className="flex items-center justify-between border-2 border-black rounded-md mb-8">
          <input
            className="bg-transparent text-black text-lg p-2 flex-1"
            id="birthdate"
            type="date"
            defaultValue={
              new Date(user.mitra.dateOfBirth).toISOString().split("T")[0]
            }
          />
        </div>
        <button className="w-full bg-black text-white py-4">Simpan</button>
      </div>
    </div>
  );
}
