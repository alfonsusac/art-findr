"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const SingleArtCards = ({ user, session, imageUrl }) => {
  return user ? (
    <div className={cn(
      "flex flex-col items-center gap-2 mb-8",
      // "bg-neutral-200",
      "px-8",
    )}>
      <div className="max-w-screen-sm w-full">

        <Link href="/">Back</Link>
 
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-neutral-300 aspect-[9/12] max-w-xs w-full rounded-xl object-cover relative">
            <Image
              className="bg-neutral-300 aspect-[9/12] rounded-xl object-cover"
              src={imageUrl} fill unoptimized alt="Foto Mitra ART"
            />
          </div>
          <div className="flex flex-col">
            <section className="my-4">
              <div className="text-3xl font-semibold">{user.fullName}</div>
              {/* <div>Lokasi</div> */}
              <div>
                {user?.location?.kecamatan}, {user?.location?.kota},
                {user?.location?.provinsi}
              </div>
            </section>
            <section className="my-2">
              <div className="text-base font-semibold opacity-80">Keahlian</div>
              <div>{user.mitra.expertises.join(", ")}</div>
            </section>

            <section className="my-2">
              <div className="text-base font-semibold opacity-80">Kebutuhan Khusus</div>
              <div>{user.mitra.considerations.join(", ")}</div>
            </section>

            <section className="my-2">
              <div className="text-base font-semibold opacity-80">Status</div>
              <div className="text-4xl font-normal">{user.mitra.status}</div>
            </section>

            <section className="my-2">
              <div className="text-base font-semibold opacity-80">Harga</div>
              {
                session ? (
                  <div className="text-2xl">
                    {user.mitra.pricePerHour && <div>Rp{user.mitra.pricePerHour}/jam</div>}
                    {user.mitra.pricePerDay && <div>Rp{user.mitra.pricePerDay}/hari</div>}
                    {user.mitra.pricePerMonth && <div>Rp{user.mitra.pricePerMonth}/bulan</div>}
                  </div>
                ) : (
                  <div>
                    Harga: <Link href="/masuk">Login untuk melihat harga</Link>
                  </div>
                )
              }
            </section>

            <section className="my-2">
              <div className="text-base font-semibold opacity-80">Umur</div>
              {new Date().getFullYear() -
                new Date(user.mitra.dateOfBirth).getFullYear()} tahun
            </section>

            <section className="my-2">
              <div className="text-base font-semibold opacity-80">Menginap</div>
              {user.mitra.allowOvernight ? "Bisa menginap" : "Tidak bisa menginap"}
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
