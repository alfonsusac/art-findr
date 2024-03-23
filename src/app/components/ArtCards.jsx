"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { SingleArtCards } from "./SingleArtCard";
import Image from "next/image";
import { ArtCardItem } from "../ArtCardItem";
import { cn } from "@/lib/utils";

export const ArtCards = ({
  session,
  availableMitra,
  // mitraIdUrlMap,
  allProvinsi,
  listKota,
  listKecamatan,
}) => {
  const [id, setId] = useQueryState("id");
  const [keahlianFilter, setKeahlianFilter] = useQueryState("keahlian");
  const [provinsiFilter, setProvinsiFilter] = useQueryState("provinsi");
  const [kotaFilter, setKotaFilter] = useQueryState("kota");
  const [kecamatanFilter, setKecamatanFilter] = useQueryState("kecamatan");
  const [menginapFilter, setMenginapFilter] = useQueryState("menginap");
  const [filteredMitra, setFilteredMitra] = useState(availableMitra)

  useEffect(() => {
    let filteredMitra = availableMitra;
    if (keahlianFilter) {
      filteredMitra = filteredMitra.filter((user) =>
        user.mitra.expertises.includes(keahlianFilter)
      );
    }
    if (provinsiFilter && allProvinsi) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.provinsi === allProvinsi.find(item => item.code === provinsiFilter)?.name ?? ""
      );
    }
    if (kotaFilter && listKota) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.kota === listKota.find(item => item.code === kotaFilter)?.name ?? ""
      );
    }
    if (kecamatanFilter && listKecamatan) {
      filteredMitra = filteredMitra.filter(
        (user) => user.location.kecamatan === listKecamatan.find(item => item.code === kecamatanFilter)?.name ?? ""
      );
    }
    if (menginapFilter !== null) {
      filteredMitra = filteredMitra.filter(
        (user) => String(user.mitra.allowOvernight) === menginapFilter
      );
    }
    setFilteredMitra(filteredMitra);
  }, [keahlianFilter, provinsiFilter, kotaFilter, kecamatanFilter, availableMitra, menginapFilter, allProvinsi, listKota, listKecamatan]);

  // if (id) {
  //   /**
  //    * @type {import("@prisma/client").User}
  //    */
  //   const user = filteredMitra.find((user) => user.id === id);
  //   return (
  //     <SingleArtCards
  //       user={user}
  //       session={session}
  //       imageUrl={mitraIdUrlMap[user.id]}
  //     />
  //   );
  // }

  // Get all unique expertises
  // const allExpertises = [
  //   ...new Set(availableMitra.flatMap((user) => user.mitra.expertises)),
  // ]; 

  return (
    <div className={cn(
      "bg-white pb-20 grid gap-1 sm:gap-4  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-4"
    )}>
      {filteredMitra.map((user) => (
        <a key={user.id} href={`/${user.id}`}>
          <ArtCardItem
            key={user.id}
            user={user}
            onClick={(id) => { setId(id) }}
            imageUrl={`https://carimitraart.s3.ap-southeast-1.amazonaws.com/fotodiri/${user.id}.webp`}
            session={session}
            selected={id === user.id}
          />
        </a>
      ))}
    </div>
  );
};
