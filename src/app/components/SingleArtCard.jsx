"use client";

import Link from "next/link";
import Image from "next/image";

export const SingleArtCards = ({ user, session }) => {
  return user ? (
    <div className="flex flex-col gap-2 mb-8" key={user.id}>
      <Link href="/">Back</Link>
      <Image
        src="https://pixabay.com/get/g9ab6d424456069df40a1f1c50b01f1c5ad91b47b80cb31447e4509a6c4190311cd23bcf3a0da46271bab017997edd38e67a54f162acc3823d42876dabcfa61e01029ae36de1b5cddfac9f0c9f066eb2e_640.jpg"
        width={150}
        height={100}
        unoptimized={true}
      />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{user.fullName}</div>
        <div>
          Lokasi: {user?.location?.kecamatan}, {user?.location?.kota},
          {user?.location?.provinsi}
        </div>
        <div>Keahlian: {user.mitra.expertises.join(", ")}</div>
        <div>Kebutuhan: {user.mitra.considerations.join(", ")}</div>
        <div>Status: {user.mitra.status}</div>
        {session ? (
          <>
            <div>Harga Perjam: {user.mitra.pricePerHour}</div>
            <div>Harga Perhari: {user.mitra.pricePerDay}</div>
            <div>Harga perbulan: {user.mitra.pricePerMonth}</div>
          </>
        ) : (
          <div>
            Harga: <Link href="/masuk">Login untuk melihat harga</Link>
          </div>
        )}
        <div>
          Umur:{" "}
          {new Date().getFullYear() -
            new Date(user.mitra.dateOfBirth).getFullYear()}
        </div>
        <div>Menginap: {user.mitra.allowOvernight ? "Yes" : "No"}</div>
      </div>
    </div>
  ) : null;
};
