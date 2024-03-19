"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { SingleArtCards } from "./SingleArtCard";
import Image from "next/image";

export const ArtCards = ({ session, availableMitra, mitraIdUrlMap }) => {
  const [id, setId] = useQueryState("id");
  const [keahlianFilter, setKeahlianFilter] = useQueryState("keahlian");
  const [provinsiFilter, setProvinsiFilter] = useQueryState("provinsi");
  const [kotaFilter, setKotaFilter] = useQueryState("kota");
  const [kecamatanFilter, setKecamatanFilter] = useQueryState("kecamatan");
  const [menginapFilter, setMenginapFilter] = useQueryState("menginap");
  const [filteredMitra, setFilteredMitra] = useState(availableMitra);

  useEffect(() => {
    let filteredMitra = availableMitra;
    if (keahlianFilter) {
      filteredMitra = filteredMitra.filter((user) =>
        user.mitra.expertises.includes(keahlianFilter)
      );
    }
    if (provinsiFilter) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.provinsi === provinsiFilter
      );
    }
    if (kotaFilter) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.kota === kotaFilter
      );
    }
    if (kecamatanFilter) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.kecamatan === kecamatanFilter
      );
    }
    if (menginapFilter !== null) {
      filteredMitra = filteredMitra.filter(
        (user) => String(user.mitra.allowOvernight) === menginapFilter
      );
    }
    setFilteredMitra(filteredMitra);
  }, [
    keahlianFilter,
    provinsiFilter,
    kotaFilter,
    kecamatanFilter,
    availableMitra,
    menginapFilter,
  ]);

  if (id) {
    const user = filteredMitra.find((user) => user.id === id);
    return (
      <SingleArtCards
        user={user}
        session={session}
        imageUrl={mitraIdUrlMap[user.phoneNumber]}
      />
    );
  }

  // Get all unique expertises
  const allExpertises = [
    ...new Set(availableMitra.flatMap((user) => user.mitra.expertises)),
  ];
  // Get all unique provinsi, kota, and kecamatan
  const allProvinsi = [
    ...new Set(availableMitra.map((user) => user.location.provinsi)),
  ];
  const allKota = [
    ...new Set(availableMitra.map((user) => user.location.kota)),
  ];
  const allKecamatan = [
    ...new Set(availableMitra.map((user) => user.location.kecamatan)),
  ];

  return (
    <div className="flex flex-col items-center">
      {/* <div className="flex min-w-48 mx-auto bg-red-100 p-2 gap-4">
        <select
          value={keahlianFilter || ""}
          onChange={(e) => setKeahlianFilter(e.target.value || null)}
        >
          <option value="">Select Keahlian</option>
          {allExpertises.map((expertise, index) => (
            <option key={index} value={expertise}>
              {expertise}
            </option>
          ))}
        </select>
        <select
          value={provinsiFilter || ""}
          onChange={(e) => setProvinsiFilter(e.target.value || null)}
        >
          <option value="">Select Provinsi</option>
          {allProvinsi.map((provinsi, index) => (
            <option key={index} value={provinsi}>
              {provinsi}
            </option>
          ))}
        </select>
        <select
          value={kotaFilter || ""}
          onChange={(e) => setKotaFilter(e.target.value || null)}
        >
          <option value="">Select Kota</option>
          {allKota.map((kota, index) => (
            <option key={index} value={kota}>
              {kota}
            </option>
          ))}
        </select>
        <select
          value={kecamatanFilter || ""}
          onChange={(e) => setKecamatanFilter(e.target.value || null)}
        >
          <option value="">Select Kecamatan</option>
          {allKecamatan.map((kecamatan, index) => (
            <option key={index} value={kecamatan}>
              {kecamatan}
            </option>
          ))}
        </select>
        <select
          value={menginapFilter || ""}
          onChange={(e) => setMenginapFilter(e.target.value || null)}
        >
          <option value="">Semua Menginap atau Tidak </option>
          <option value="true">Menginap</option>
          <option value="false">Tidak Menginap</option>
        </select>
        <button
          onClick={() => {
            setKeahlianFilter(null);
            setProvinsiFilter(null);
            setKotaFilter(null);
            setKecamatanFilter(null);
            setMenginapFilter(null);
          }}
        >
          Reset All
        </button>
      </div> */}

      <div className="bg-white pb-20 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 px-8">
        {filteredMitra.map((user) => (
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
