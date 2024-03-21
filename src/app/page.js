import { ArtCards } from "./components/ArtCards";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { getURLfotoDiri } from "@/lib/link-foto";
import { MitraFilterList, SearchMitra } from "./client";
import { prisma } from "@/lib/prisma";
import { getKotaKabupaten, getListKecamatan, getListKotaKabupaten, getListProvinsi } from "@/lib/wilayah";
import { Footer } from "./footer";
import { TextLogo } from "@/components/logo";
export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const session = await getUserSession();
  const res = await prisma.user.findMany({
    where: {
      mitra: {
        isNot: null,
      },
      fullName: {
        contains: searchParams.search,
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

  // TODO: pindahin ke server component sendiri. this is too messy
  // For Mitra Image. Create an object where the keys are the mitra phoneNumber and the values are the URLs.
  const mitraIdUrlMap = await availableMitra.reduce(async (urlMapPromise, mitra) => {
    const urlMap = await urlMapPromise 
    const url = await getURLfotoDiri(mitra.id);
    urlMap[mitra.id] = url;
    return urlMap;
  }, Promise.resolve({}));

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="h-14 flex ">
        <div className="content flex justify-between items-center p-4">
          <TextLogo />
          <div className="">
            <Link
              href="/masuk"
              className="button btn-primary p-2 px-5 border border-neutral-200 rounded-lg text-sm font-semibold"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>

      <main className=" grow">
        <section className="min-h-40 my-4 flex items-end rounded-b-[3rem]">
          <div className="content flex flex-col gap-4 items-center justify-center text-center">
            <h1 className="text-3xl font-bold tracking-tight px-12">
              Cari ART Sesuai Kebutuhanmu
            </h1>
            <div className="w-96 p-2 px-4 border border-neutral-200 rounded-full flex focus-within:border-neutral-400">
              <SearchMitra />
            </div>
          </div>
        </section>
        <section className="bg-primary/10 mb-12 flex overflow-auto">
          <MitraFilterList
            allProvinsi={await getListProvinsi()}
            listKota={await getListKotaKabupaten(searchParams.provinsi)}
            listKecamatan={await getListKecamatan(searchParams.kota)}
          />
        </section>
        <section className="">
          <ArtCards
            session={session}
            availableMitra={availableMitra}
            mitraIdUrlMap={mitraIdUrlMap}
          />
        </section>
        <section className="">
          <Link href="/daftar">Daftar jadi Mitra</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
