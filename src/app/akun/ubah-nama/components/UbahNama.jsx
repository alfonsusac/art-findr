"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const UbahNama = ({ userData }) => {
  const route = useRouter();
  const [fullName, setFullName] = useState(userData.fullName);

  async function handleUpdate() {
    const res = await fetch("/api/ubah-data-user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        route.push("/akun");
      })
      .catch((error) => console.error("Fetch error:", error));
  }
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/akun">Batal{"\n          "}</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Ubah Nama Lengkap</h1>

      <div className="mb-6 text-black space-y-2">
        <form className="flex flex-col gap-2">
          <input
            name="fullName"
            type="text"
            value={fullName}
            className="w-full text-black"
            onChange={(e) => setFullName(e.target.value)}
          />
        </form>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Simpan
      </button>
    </div>
  );
};
