"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { MitraStatus } from "./MitraStatus";

export const DashboardMitra = ({ mitra, uid }) => {
  return (
    <main>
      <h1>Dashboard Mitra</h1>
      <div className="space-y-3">
        <div>
          <p>Expertise : {mitra.expertises}</p>
          <a href="/akun/ubah-expertise" className="text-rose-400">
            Edit Keterampilan
          </a>
        </div>
        <div>
          <p>Consideration : {mitra.considerations}</p>
          <a href="/akun/ubah-kebutuhan" className="text-rose-400">
            Edit Kebutuhan
          </a>
        </div>
        <div>
          <MitraStatus uid={uid} status={mitra.status} />
        </div>
        <div>
          <p>Price per Hour : {mitra.pricePerHour?.toString()}</p>
          <p>Price per Day : {mitra.pricePerDay?.toString()}</p>
          <p>Price per Month : {mitra.pricePerMonth?.toString()}</p>
          <a href="/akun/ubah-harga" className="text-rose-400">
            Ubah Harga
          </a>
        </div>
        <div>
          <p>
            Date of Birth: {mitra.dateOfBirth.getDate()}-
            {mitra.dateOfBirth.getUTCMonth()}-
            {mitra.dateOfBirth.getUTCFullYear()}
          </p>
          <a href="/akun/ubah-tgl-lahir" className="text-rose-400">
            Ubah Tgl Lahir
          </a>
        </div>

        <p>Menginap : {mitra.allowOvernight}</p>

        <div>
          <a href="/akun/ubah-foto-diri" className="text-rose-400">
            Ubah Foto Diri
          </a>
        </div>

        <div>
          <a href="/akun/ubah-foto-ktp" className="text-rose-400">
            Ubah Foto KTP
          </a>
        </div>
        <button
          className="bg-rose-400 rounded-md text-white h-12 p-4 "
          onClick={() => {
            signOut();
          }}
        >
          Keluar
        </button>
      </div>
    </main>
  );
};
