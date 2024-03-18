"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { SingleArtCards } from "./SingleArtCard";
import Image from "next/image";

export const ArtCards = ({ session, mitra }) => {
  const [id, setId] = useQueryState("id");
  const [allMitra, setAllMitra] = useState(mitra);
  const [expertiseFilter, setExpertiseFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [overnightFilter, setOvernightFilter] = useState("");

  useEffect(() => {
    let filteredMitra = mitra;
    if (expertiseFilter) {
      filteredMitra = filteredMitra.filter((user) =>
        user.mitra.expertises.includes(expertiseFilter)
      );
    }
    if (provinceFilter) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.provinsi === provinceFilter
      );
    }
    if (overnightFilter) {
      filteredMitra = filteredMitra.filter(
        (user) => String(user.mitra.allowOvernight) === overnightFilter
      );
    }
    setAllMitra(filteredMitra);
  }, [expertiseFilter, provinceFilter, overnightFilter]);

  const expertises = Array.from(
    new Set(mitra.flatMap((user) => user.mitra.expertises))
  );
  const provinces = Array.from(
    new Set(mitra.map((user) => user.location.provinsi))
  );

  if (id) {
    const user = allMitra.find((user) => user.id === id);
    return <SingleArtCards user={user} session={session} />;
  }

  return (
    <div>
      <select
        value={expertiseFilter}
        onChange={(e) => setExpertiseFilter(e.target.value)}
      >
        <option value="">Semua Keahlian</option>
        {expertises.map((expertise) => (
          <option key={expertise} value={expertise}>
            {expertise}
          </option>
        ))}
      </select>

      <select
        value={provinceFilter}
        onChange={(e) => setProvinceFilter(e.target.value)}
      >
        <option value="">Semua Provinsi</option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>

      <select
        value={overnightFilter}
        onChange={(e) => setOvernightFilter(e.target.value)}
      >
        <option value="">Menginap</option>
        <option value="true">Allow Overnight</option>
        <option value="false">Don't Allow Overnight</option>
      </select>
      <div className="bg-white pb-20 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 px-8">
        {allMitra.map((user) => (
          <div
            className="flex flex-col gap-2 mb-8"
            key={user.id}
            onClick={() => setId(user.id)}
          >
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
        ))}
      </div>
    </div>
  );
};
