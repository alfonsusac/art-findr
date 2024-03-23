"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { useLoading } from "@/components/useLoading";

export const UbahNama = ({ userData }) => {
  const route = useRouter();
  const [fullName, setFullName] = useState(userData.fullName);
  const { loading, setLoading } = useLoading()

  async function handleUpdate() {
    setLoading(true)
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
      <Button
        className="button btn-primary w-full text-xl h-14 "
        onClick={handleUpdate}
        loading={loading}
      >
        Simpan
      </Button>
    </>
  );
};
