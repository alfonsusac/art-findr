"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { SingleArtCards } from "./SingleArtCard";
import Image from "next/image";
import { ArtCardItem } from "../ArtCardItem";
import { cn } from "@/lib/utils";

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
    /**
     * @type {import("@prisma/client").User}
     */
    const user = filteredMitra.find((user) => user.id === id);
    return (
      <SingleArtCards
        user={user}
        session={session}
        imageUrl={mitraIdUrlMap[user.id]}
      />
    );
  }

  // Get all unique expertises
  const allExpertises = [
    ...new Set(availableMitra.flatMap((user) => user.mitra.expertises)),
  ];

  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "bg-white pb-20 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 px-8"
      )}>
        {filteredMitra.map((user) => (
          <ArtCardItem
            key={user.id}
            user={user}
            onClick={(id) => { setId(id) }}
            imageUrl={mitraIdUrlMap[user.id]}
            session={session}
            selected={id === user.id}
          />
        ))}
      </div>
    </div>
  );
};
