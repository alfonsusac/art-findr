import { getUserData } from "@/lib/auth";

export default async function UbahTglLahir() {
  const user = await getUserData();
  console.log(user);
  return (
    <div
      key="1"
      className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-4"
    >
      <div className="flex items-center justify-between w-full max-w-md mb-8">
        <ChevronLeftIcon className="text-black" />
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
          />
        </div>
        <button className="w-full bg-black text-white py-4">Simpan</button>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
