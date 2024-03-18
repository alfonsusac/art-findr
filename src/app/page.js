import Image from "next/image";
import { Twitter, Instagram, Camera } from "lucide-react";
import { ArtCards } from "./components/ArtCards";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { getURLfotoDiri } from "@/lib/link-foto";
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getUserSession();
  const res = await prisma.user.findMany({
    where: {
      mitra: {
        isNot: null,
      },
    },
    include: {
      mitra: true,
      location: true,
    },
  });

  // Filter out the mitra objects where mitra is defined and its status is "Tersedia"
  const availableMitra = res.filter(
    (m) => m.mitra && m.mitra.status === "Tersedia"
  );

  // Modify the availableMitra array in-place
  availableMitra.forEach((m) => {
    // Convert pricePerDay to a number
    if (m.mitra.pricePerDay) {
      m.mitra.pricePerDay = Number(m.mitra.pricePerDay.toString());
    }
    // Convert updatedAt to an ISO string
    if (m.mitra.updatedAt) {
      m.mitra.updatedAt = m.mitra.updatedAt.toISOString();
    }
  });

  // Create an object where the keys are the mitra phoneNumber and the values are the URLs
  const mitraIdUrlMap = await availableMitra.reduce(async (accPromise, m) => {
    const acc = await accPromise;
    const url = await getURLfotoDiri(m.phoneNumber);
    acc[m.phoneNumber] = url;
    return acc;
  }, Promise.resolve({}));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-14 flex border-b border-neutral-200">
        <div className="content flex justify-between items-center p-4">
          <div className="font-bold tracking-tight">CariART</div>
          <div className="">
            <Link
              href="/masuk"
              className="p-1 px-5 border border-neutral-200 rounded-lg text-sm font-semibold"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>
      <main className="bg-neutral-100 grow">
        <section className="min-h-48 flex bg-yellow-200">
          <div className="content flex flex-col gap-4 p-12 items-center justify-center text-center bg-white">
            <h1 className="text-3xl font-bold tracking-tight">
              Cari ART Sesuai Kebutuhanmu
            </h1>
            <div className="w-80 p-2 px-4 border border-neutral-200 rounded-full flex focus-within:border-neutral-400">
              <input
                placeholder="Search"
                className="block w-full outline-none"
              />
            </div>
          </div>
        </section>
        <section className="">
          <ArtCards
            session={session}
            availableMitra={availableMitra}
            mitraIdUrlMap={mitraIdUrlMap}
          />

          <Link href="/daftar">Daftar jadi Mitra</Link>
        </section>
      </main>
      <footer className="bg-blue-100 min-h-48 flex">
        <div className="content flex flex-col">
          <div className="content p-8 flex justify-between grow">
            <div className="">
              <div className="font-bold tracking-tight">CariART</div>
            </div>
            <div className="text-end flex flex-col gap-2">
              <div className="text-blue-900/60">Company</div>
              <div>About us</div>
              <div>Blog</div>
              <div>Careers</div>
              <div>Press</div>
              <div>Partner with us</div>
            </div>
            <div className="text-end flex flex-col gap-2">
              <div className="text-blue-900/60">Resources</div>
              <div>Help center</div>
              <div>Contact support</div>
              <div>Community</div>
              <div>For Mitra</div>
              <div>For Seekers</div>
            </div>
          </div>
          <div className="flex justify-between py-5 border-t border-blue-900/20 text-sm mx-8">
            <div className="flex gap-2">
              <div>© 2024 CariART, Inc.</div>
              <div>·</div>
              <div>Privacy</div>
              <div>Terms</div>
              <div>Sitemap</div>
            </div>
            <div className="flex gap-2">
              <div>Instagram</div>
              <div>Facebook</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
