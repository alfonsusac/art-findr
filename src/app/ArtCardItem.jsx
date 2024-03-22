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
      <div className="bg-neutral-300 aspect-[9/12] rounded-xl object-cover relative group-hover:shadow-xl transition-all duration-300">
        <Image
          className="bg-neutral-300 aspect-[9/12] rounded-xl object-cover"
          src={imageUrl} fill unoptimized alt="Mitra ART"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold leading-tight mb-2 my-1">{user.fullName}</div>
        <div className="leading-tight">
          {user?.location?.kecamatan}, {user?.location?.kota},
          {user?.location?.provinsi}
        </div>
      </div>
    </div>
  )
}