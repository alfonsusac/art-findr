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
    <>
      <div className="mb-4 text-black space-y-2">
        <form className="flex flex-col gap-2">
          <label className="text-xl">Nama Lengkap Saya</label>
          <input
            name="fullName"
            type="text"
            value={fullName}
            className="input w-full text-black"
            onChange={(e) => setFullName(e.target.value)}
          />
        </form>
      </div>
      <button
        className="button btn-primary w-full text-xl h-14 "
        onClick={handleUpdate}
      >
        Simpan
      </button>
    </>
  );
};
