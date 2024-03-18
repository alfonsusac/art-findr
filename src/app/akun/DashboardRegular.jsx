"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const DashboardRegular = ({ uid, fullName, email, province, city }) => {
  const route = useRouter();
  async function handleCreate() {
    const res = await fetch("/api/daftar-mitra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uid,
        isFotoDiri: true,
        isFotoKTP: true,
        dateOfBirth: new Date(),
        allowOvernight: true,
        expertises: [],
        considerations: [],
        pricePerHour: 0,
        pricePerDay: 0,
        pricePerMonth: 0,
      }),
    });

    const data = res.json();
    console.log(data);
    route.refresh();
  }
  return (
    <main className="flex flex-col gap-2 items-center mt-6">
      <div className="p-10">
        <h3 className="text-4xl font-bold">CariART</h3>
      </div>
      <h1 className="mb-2 text-lg">Selamat Datang</h1>
      <div className="border-2 border-blue-400 rounded-lg p-4">
        <h3>{fullName}</h3>
        <p>{email}</p>
        <p>
          {city}, {province}
        </p>
      </div>
      <Link href="/" className="bg-rose-400 rounded-md text-white h-12 p-4 ">
        Lihat Daftar ART
      </Link>
      <p className="border-b-2 border-gray-400">Penyetelan</p>
      <Link href="/akun/ubah-lokasi" className="border-b-2 border-gray-400">
        Ubah Lokasi Saya
      </Link>
      <Link href="/akun/ubah-nama" className="border-b-2 border-gray-400">
        Ubah Nama Lengkap
      </Link>
      <button
        className="bg-rose-400 rounded-md text-white h-12 p-4 "
        onClick={() => {
          signOut();
        }}
      >
        Keluar
      </button>
      <button className="bg-rose-400 rounded-md text-white h-12 p-4 ">
        Daftar Menjadi Mitra
      </button>
    </main>
  );
};
