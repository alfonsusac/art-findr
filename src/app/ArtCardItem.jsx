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
        "bg-white rounded-xl p-2",
        "group",
        "pointer-events-auto",
        "cursor-pointer",
        // selected && "absolute inset-0 mb-0 rounded-none"
      )}
      key={user.id}
      // onClick={() => onClick(user.id)}
    >
      {/* {
        selected && <button>Back</button>
      } */}
      <div className="bg-neutral-300 aspect-[3/4] rounded-xl object-cover relative group-hover:shadow-xl transition-all duration-300">
        <Image
          className="bg-neutral-300 aspect-[3/4] rounded-xl object-cover"
          src={imageUrl} fill unoptimized alt="Mitra ART"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold leading-tight mt-1">{user.fullName}</div>
        <div className="leading-tight text-neutral-500">
          {user?.location?.kecamatan}, {/* {user?.location?.kota}, */}
          {user?.location?.provinsi}
        </div>
        <div>
          {user.mitra.expertises.length} Keterampilan
        </div>
        <div className="flex gap-2 flex-wrap
        mt-0.5
        text-neutral-600
        *:leading-none
        *:p-1 *:px-2
        *:text-sm
        *:font-medium
        *:rounded-lg *:bg-neutral-200">
          <div>Per Jam</div>
          <div>Harian</div>
          <div>Bulanan</div>
        </div>
      </div>
    </div>
  )
}