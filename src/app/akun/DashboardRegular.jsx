"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextLogo } from "@/components/logo";
import { PhArrowLeftBold } from "./DashboardMitra";
import { BackToIndexPageButton } from "./component";

export const DashboardRegular = ({
  uid,
  fullName,
  email,
  phoneNumber,
  province,
  city,
}) => {
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
    <>
      <BackToIndexPageButton />
      <div className="py-8 text-white">
        <h3 className="text-5xl font-bold">Akun Saya</h3>
      </div>

      <section className="card-section">

        <div className="rounded-lg p-4 -mx-4">
          <h3 className="text-2xl font-semibold">{fullName}</h3>
          <p className="text-xl">{email}</p>
          <p className="text-xl">{phoneNumber}</p>
          <p>
            {city}, {province}
          </p>
        </div>

        <div className="py-5">
          <p className="text-neutral-400 mb-2">Penyetelan</p>

          <Link
            href="/akun/ubah-lokasi"
            className="-mx-2 px-2 hover:bg-neutral-100 border-gray-300 py-5 border-y text-xl flex justify-between items-center"
          >
            <span>Ubah Lokasi Saya</span>
            <span>{">"}</span>
          </Link>
          <Link
            href="/akun/ubah-nama"
            className="-mx-2 px-2 hover:bg-neutral-100 border-gray-300 py-5 border-b text-xl flex justify-between items-center"
          >
            <span>Ubah Nama Lengkap</span>
            <span>{">"}</span>
          </Link>
        </div>

        <button
          className="button h-12 p-4 text-lg"
          onClick={() => {
            signOut();
          }}
        >
          Keluar
        </button>
        <hr className="my-2" />
        <button
          className="button btn-primary h-12 p-4 text-lg"
          onClick={handleCreate}
        >
          Daftar Menjadi Mitra
        </button>
      </section>
    </>

  );
};


