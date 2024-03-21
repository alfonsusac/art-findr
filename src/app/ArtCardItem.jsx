import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";


/**
 * 
 * @param {{
 *   user: import("@prisma/client").User & {
 *     mitra: import("@prisma/client").Mitra, 
 *   },
 *   onClick: (id: string) => void,
 *   imageUrl: string,
 *   session: any
 * }} param0 
 */
export function ArtCardItem({ user, onClick, imageUrl, session, selected }) {

  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-8",
        "hover:bg-neutral-100 bg-white rounded-xl p-2",
        "pointer-events-auto", 
        "cursor-pointer",
        // selected && "absolute inset-0 mb-0 rounded-none"
      )}
      key={user.id}
      onClick={() => onClick(user.id)}
    >
      {/* {
        selected && <button>Back</button>
      } */}
      <div className="bg-neutral-300 aspect-[9/12] rounded-xl object-cover relative">
        <Image
          className="bg-neutral-300 aspect-[9/12] rounded-xl object-cover"
          src={imageUrl} fill unoptimized alt="Mitra ART"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{user.fullName}</div>
        <div>
          Lokasi: {user?.location?.kecamatan}, {user?.location?.kota},
          {user?.location?.provinsi}
        </div>
        {session ? (
          <>
            {/* <div>Keahlian: {user.mitra.expertises.join(", ")}</div> */}
            {/* <div>Kebutuhan: {user.mitra.considerations.join(", ")}</div> */}
            {user.mitra.pricePerHour && <div>Rp{user.mitra.pricePerHour}/jam</div>}
            {user.mitra.pricePerDay && <div>Rp{user.mitra.pricePerDay}/hari</div>}
            {user.mitra.pricePerMonth && <div>Rp{user.mitra.pricePerMonth}/bulan</div>}
            <div>
              {user.mitra.allowOvernight ? "Bisa Menginap" : "Tidak bisa menginap"}
            </div>
          </>
        ) : (
          <div>
            Harga:{" "}
            <Link href="/masuk">Login untuk melihat lebih detail</Link>
          </div>
        )}
        <div>
          Umur {new Date().getFullYear() - new Date(user.mitra.dateOfBirth).getFullYear()} tahun
        </div>
      </div>
    </div>
  )
}