"use client";

import toast from "react-hot-toast";

export const UbahTglLahirBtn = ({ dateOfBirth }) => {
  async function handleUpdate() {
    const birthdate = document.getElementById("birthdate").value;
    const res = await fetch("/api/ubah-data-mitra", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dateOfBirth: new Date(birthdate).toISOString() }),
    })
      .then((res) => {
        if (
          res.ok &&
          res.headers.get("Content-Type").includes("application/json")
        ) {
          return res.json();
        } else {
          toast.error("Gagal mengubah tanggal lahir");
        }
      })
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => console.error("Fetch error:", error));
  }

  return (
    <div>
      <div className="flex items-center justify-between border-2 border-black rounded-md mb-8">
        <input
          className="bg-transparent text-black text-lg p-2 flex-1"
          id="birthdate"
          type="date"
          defaultValue={dateOfBirth}
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
