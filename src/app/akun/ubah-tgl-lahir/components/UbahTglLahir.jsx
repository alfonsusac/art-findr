"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const UbahTglLahirBtn = ({ dateOfBirth }) => {
  const router = useRouter();
  const [dobValue, setDobValue] = useState(dateOfBirth);
  async function handleUpdate() {
    const res = await fetch("/api/ubah-data-mitra", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dateOfBirth: new Date(dobValue) }),
    });

    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      router.push("/akun");
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between border-2 border-black rounded-md mb-8">
        <input
          className="bg-transparent text-black text-lg p-2 flex-1"
          type="date"
          value={dobValue}
          onChange={(e) => setDobValue(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-black text-white py-4"
        onClick={handleUpdate}
      >
        Simpan
      </button>
    </div>
  );
};
