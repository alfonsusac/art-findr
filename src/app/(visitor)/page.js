import { ArtCards } from "../components/ArtCards";
import { getUserSession } from "@/lib/auth";
import { MitraFilterList, SearchMitra } from "../client";
import { prisma } from "@/lib/prisma";
import { getListKecamatan, getListKotaKabupaten, getListProvinsi } from "@/lib/wilayah";
import { Header } from "./Header";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {


  // TODO: pindahin ke server component sendiri. this is too messy
  // For Mitra Image. Create an object where the keys are the mitra phoneNumber and the values are the URLs.
  // const mitraIdUrlMap = await availableMitra.reduce(async (urlMapPromise, mitra) => {
  //   const urlMap = await urlMapPromise
  //   const url = await getURLfotoDiri(mitra.id);
  //   urlMap[mitra.id] = url;
  //   return urlMap;
  // }, Promise.resolve({}));

  return (
    <>
      <Header />
      <main className=" grow">
        <section className="my-0 flex items-end rounded-b-[3rem]">
          <div className="content flex flex-col gap-2 items-center justify-center text-center">
            <h1 className="text-xl font-bold tracking-tight px-12">
              Cari <span className="text-primary">ART</span> Sesuai Kebutuhanmu
            </h1>
            <div className="w-full max-w-96 p-2 px-4 border border-neutral-200 rounded-full flex focus-within:border-neutral-400">
              <SearchMitra />
              <div className="aspect-square h-9 w-9 -my-1 bg-primary text-white rounded-full flex items-center justify-center -mr-3">
                <PhMagnifyingGlassBold className="text-lg" />
              </div>
            </div>
          </div>
        </section>
        <section className="flex overflow-auto">
          <MitraFilterList
            allProvinsi={await getListProvinsi()}
            listKota={await getListKotaKabupaten(searchParams.provinsi)}
            listKecamatan={await getListKecamatan(searchParams.kota)}
          />
        </section>
        <section className="max-w-screen-xl mx-auto">
          <Suspense fallback={
            <div className="w-full"></div>
          }>
            <ARTListServer searchParams={searchParams} />
          </Suspense>
        </section>
      </main>
    </>
  );
}

async function ARTListServer({ searchParams }) {
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

  return (
    <ArtCards
      session={session}
      availableMitra={availableMitra}
      allProvinsi={await getListProvinsi()}
      listKota={await getListKotaKabupaten(searchParams.provinsi)}
      listKecamatan={await getListKecamatan(searchParams.kota)}
    />
  )
}


export function PhMagnifyingGlassBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"></path></svg>
  )
}