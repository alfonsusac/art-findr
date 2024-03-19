"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { SingleArtCards } from "./SingleArtCard";
import Image from "next/image";

export const ArtCards = ({ session, availableMitra, mitraIdUrlMap }) => {
  const [id, setId] = useQueryState("id");
  const [allMitra, setAllMitra] = useState(availableMitra);
  const [keahlian, setKeahlian] = useQueryState("keahlian");

  if (id) {
    const user = allMitra.find((user) => user.id === id);
    return (
      <SingleArtCards
        user={user}
        session={session}
        imageUrl={mitraIdUrlMap[user.phoneNumber]}
      />
    );
  }

  return (
    <div>
      <div className="bg-white pb-20 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 px-8">
        {availableMitra.map((user) => (
          <div
            className="flex flex-col gap-2 mb-8"
            key={user.id}
            onClick={() => setId(user.id)}
          >
            <Image
              src={mitraIdUrlMap[user.phoneNumber]}
              width={150}
              height={100}
              unoptimized={true}
              alt="Mitra ART"
            />
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{user.fullName}</div>
              <div>
                Lokasi: {user?.location?.kecamatan}, {user?.location?.kota},
                {user?.location?.provinsi}
              </div>
              {session ? (
                <>
                  <div>Keahlian: {user.mitra.expertises.join(", ")}</div>
                  <div>Kebutuhan: {user.mitra.considerations.join(", ")}</div>
                  <div>Harga Perjam: {user.mitra.pricePerHour}</div>
                  <div>Harga Perhari: {user.mitra.pricePerDay}</div>
                  <div>Harga perbulan: {user.mitra.pricePerMonth}</div>
                  <div>
                    Menginap: {user.mitra.allowOvernight ? "Yes" : "No"}
                  </div>
                </>
              ) : (
                <div>
                  Harga:{" "}
                  <Link href="/masuk">Login untuk melihat lebih detail</Link>
                </div>
              )}
              <div>
                Umur:{" "}
                {new Date().getFullYear() -
                  new Date(user.mitra.dateOfBirth).getFullYear()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
