import React from "react";
import { HeaderWithSearch } from "../Header";
import { prisma } from "@/lib/prisma";
import { getURLfotoDiri } from "@/lib/link-foto";
export const dynamic = "force-dynamic";
import dobToAge from "dob-to-age";

export default async function ArtPage({ params }) {
  const id = params.artid;
  const art = await prisma.user.findUnique({
    where: { id },
    include: { location: {}, mitra: {} },
  });
  if (!art) return <>ART Not Found Balik Ke Halaman</>;
  const ageMitra = dobToAge(art.mitra.dateOfBirth);

  const imgurl = await getURLfotoDiri(id);

  return (
    <>
      <HeaderWithSearch />
      <section className="max-w-screen-xl mx-auto  flex-1 mt-8">
        <div className="mx-4 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="flex-1  max-w-sm self-center lg:self-start w-4/5 flex flex-col gap-4">

            <img
              src={imgurl}
              className="aspect-[9/10] rounded-3xl object-cover"
            />

            {/* CTO Bar */}
            <div
              className="bg-white p-6 rounded-t-xl lg:rounded-xl fixed bottom-0 left-0 right-0 lg:static
            flex flex-col gap-2 justify-between
            shadow-lg border border-neutral-200
          "
            >
              <div>
                <div className="leading-none">Mulai Dari</div>
                {
                  art.mitra.pricePerDay
                    ? <div className="text-2xl font-bold">Rp. {art.mitra.pricePerHour.toLocaleString()} / jam</div>
                    : art.mitra.pricePerHour
                      ? <div className="text-2xl font-bold">Rp. {art.mitra.pricePerDay.toLocaleString()} / hari</div>
                      : art.mitra.pricePerMonth
                        ? <div className="text-2xl font-bold">Rp. {art.mitra.pricePerDay.toLocaleString()} / month</div>
                        : <></>
                }

              </div>
              <div className="flex gap-2 justify-stretch">
                <button className="lg:hidden button text-lg flex-1">
                  Lihat Harga
                </button>
                <button className="button btn-primary text-lg flex-1">
                  Kontak
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="
            bg-white flex-1 flex-grow-[2] py-4 pb-20 px-4 w-full max-w-screen-md
          [&_h2]:text-2xl
          [&_h2]:font-semibold
          [&_h2]:mt-8
          [&_hr]:my-8
        "
          >

            <h1 className="text-4xl font-bold">{art.fullName}</h1>
            <div className="flex gap-2 my-2 items-center">
              <PhMapPinFill className="text-neutral-400" />
              <div>{art.location.provinsi},</div>
              <div>{art.location.kota},</div>
              <div>{art.location.kecamatan}</div>
            </div>
            <div className="flex gap-2 my-2 items-center">
              <PhPersonFill className="text-neutral-400" />
              <div>{ageMitra} tahun</div>
            </div>
            <div className="inline-flex p-2 px-3 text-lg rounded-md bg-emerald-500 text-white font-semibold leading-none mt-2">
              {art.mitra.status}
            </div>

            <hr />

            <h2>Keterampilan</h2>
            <div>
              {art.mitra.expertises.map((e) => (
                <div className="my-3 text-lg list-item list-inside" key={e}>
                  {e}
                </div>
              ))}
            </div>

            <hr />

            <h2>Kebutuhan Khusus</h2>
            <div>
              {art.mitra.considerations.length ? (
                art.mitra.considerations.map((e) => (
                  <div className="my-3 text-lg list-item list-inside" key={e}>
                    {e}
                  </div>
                ))
              ) : (
                <div className="my-3 text-base">Tidak ada ✅</div>
              )}
            </div>

            <hr />

            <h2>Harga</h2>
            <div className="text-xl leading-none flex flex-col gap-4 mt-4">
              <div className="">
                <div className="text-base font-semibold leading-loose">
                  Per Jam
                </div>
                <div>
                  <span className="text-neutral-400">Rp. </span>

                  {art.mitra.pricePerHour.toLocaleString()}
                  <span> per jam</span>
                </div>
              </div>
              <div className="">
                <div className="text-base font-semibold leading-loose">
                  Harian
                </div>
                <div>
                  <span className="text-neutral-400">Rp. </span>
                  {art.mitra.pricePerDay.toLocaleString()}
                  <span> per hari</span>
                </div>
              </div>

              <div className="">
                <div className="text-base font-semibold leading-loose">
                  Bulanan
                </div>
                <div>
                  <span className="text-neutral-400">Rp. </span>
                  {art.mitra.pricePerMonth.toLocaleString()}
                  <span> per bulan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function PhMapPinFill(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"
      ></path>
    </svg>
  );
}

export function PhPersonFill(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M100 36a28 28 0 1 1 28 28a28 28 0 0 1-28-28m115.42 104.78l-45.25-51.3a28 28 0 0 0-21-9.48h-42.34a28 28 0 0 0-21 9.48l-45.25 51.3a16 16 0 0 0 22.56 22.69L89 142.7l-19.7 74.88a16 16 0 0 0 29.08 13.35L128 180l29.58 51a16 16 0 0 0 29.08-13.35L167 142.7l25.9 20.77a16 16 0 0 0 22.56-22.69Z"
      ></path>
    </svg>
  );
}
