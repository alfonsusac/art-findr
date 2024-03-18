"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

export const DashboardRegular = ({ fullName, email, province, city }) => {
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
