/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { InputTanggalLahir } from "./daftar-mitra/InputTanggalLahir";
import { InputKebutuhan } from "./daftar-mitra/InputKebutuhan";
import { InputKeterampilan } from "./daftar-mitra/InputKeterampilan";
import { InputHarga } from "./daftar-mitra/InputHarga";
import { InputFotoDiri } from "./daftar-mitra/InputFotoDiri";
import { InputFotoKTP } from "./daftar-mitra/InputFotoKTP";
import { TextLogo } from "@/components/logo";
import { useEffect, useRef, useState } from "react";
import { setFotodiri, setFotoKTP, setHarga, setKebutuhanKhusus, setKeterampilan, setTanggalLahir } from "./action";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/upload-client";
import { getImageURL } from "@/lib/upload";


/**
 * 
 * @param {{
 *   user: import("@/lib/auth").UserComplete
 * }} param0 
 */
export default function DaftarMitra({ user }) {
  const route = useRouter();
  const [keterampilan, setKeterampilan] = useState("");
  const [kebutuhan, setKebutuhan] = useState("");


  async function handleSubmit(formData) {
    await fetch("/api/daftar-mitra/selesai", {
      method: "POST",
      body: formData,
    });
    route.refresh();
  }

  return (
    <>
      <button
        className="button h-12 self-start text-base"
        onClick={async () => {
          // await fetch("/api/daftar-mitra/batal", { method: "DELETE" });
          // route.refresh()
        }}
      >
        {/* TODO: Alert: Proses ini akan menghapus semua data pendaftaran mitra */}
        Batal
      </button>
      <div className="py-8">
        <TextLogo />
        <h3 className="text-4xl font-bold">Daftar Menjadi Mitra</h3>
      </div>

      <DaftarMitraContent user={user} />



      {/* <form action={handleSubmit} className="flex flex-col gap-4">
        <InputTanggalLahir />
        <InputKeterampilan
          keterampilan={keterampilan}
          setKeterampilan={setKeterampilan}
        />
        <InputKebutuhan
          kebutuhan={kebutuhan}
          setKebutuhan={setKebutuhan}
        />
        <InputHarga />
        <InputFotoDiri />
        <InputFotoKTP />
        <button> Submit</button>
      </form> */}
    </>
  );
}

/**
 * 
 * @param {{
 *   user: import("@/lib/auth").UserComplete
 * }} param0 
 */
function DaftarMitraContent({ user }) {

  const router = useRouter()

  const [langkah, setLangkah] = useState(0)
  const [error, setError] = useState({})
  const clearFormError = () => setError({})

  // alert(user.calonMitra.dateOfBirth)
  const defaultTglLahir = user.calonMitra.dateOfBirth?.toISOString().split('T')[0]
  // console.log(defaultTglLahir)

  const formTanggalLahir = (
    <form action={async (form) => {
      clearFormError()
      const value = form.get('tanggal-lahir')
      // TODO: cek if value is not greater than Date.now()
      // TODO: cek umur (atleast 18 year? 20 year? idk)
      if (!value) {
        return setError({ tglLahir: "Mohon isi tanggal lahir anda 🙏" })
      }
      const ok = await setTanggalLahir(value)
      if (ok) {
        router.refresh()
        return setLangkah(1)
      }
    }}>
      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Tanggal lahir Saya:</label>
        <input
          type="date"
          id="tanggal-lahir"
          name="tanggal-lahir"
          className="input"
          data-error={!!error.tglLahir}
          defaultValue={defaultTglLahir ?? undefined}
        />

        {
          error.tglLahir && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.tglLahir}
          </div>
        }
      </fieldset>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selanjutnya
      </button>
    </form>
  )

  return (
    <>
      <div className="text-lg font-semibold mt-4">Langkah {langkah + 1} of 6</div>
      {langkah === 0 && formTanggalLahir}
      {langkah === 1 &&
        <FormKeterampilan
          user={user}
          setLangkah={setLangkah}
          error={error}
          clearFormError={clearFormError}
          setError={setError}
        />}
      {langkah === 2 &&
        <FormKebutuhanKhusus
          user={user}
          setLangkah={setLangkah}
          error={error}
          clearFormError={clearFormError}
          setError={setError}
        />
      }
      {langkah === 3 &&
        <FormFotoDiri
          user={user}
          setLangkah={setLangkah}
          error={error}
          clearFormError={clearFormError}
          setError={setError}
        />
      }
      {langkah === 4 &&
        <FormFotoKTP
          user={user}
          setLangkah={setLangkah}
          error={error}
          clearFormError={clearFormError}
          setError={setError}
        />
      }
      {langkah === 5 &&
        <FormInputHarga
          user={user}
          setLangkah={setLangkah}
          error={error}
          clearFormError={clearFormError}
          setError={setError}
        />
      }

      {
        langkah > 0 && <>
          <hr className="my-4" />
          <button
            className="button text-lg h-14 w-full"
            onClick={() => {
              setLangkah(prev => prev - 1)
            }}
          >Balik</button>
        </>
      }
      {

      }

    </>
  )
}

export function FormKeterampilan({ setLangkah, user, error, clearFormError, setError }) {

  const router = useRouter()
  const [extraKeterampilan, setExtraKeterampilan] = useState(user.calonMitra.expertises.filter(ket => !definedListKeterampilan.includes(ket)))
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.value = ""
  }, [extraKeterampilan])

  return (
    <form action={async (form) => {
      clearFormError()
      const keterampilan = []
      form.forEach((e) => {
        keterampilan.push(e)
      })
      if (keterampilan.length === 0) {
        return setError({ keterampilan: "Mohon pilih setidaknya satu keterampilan 🙏" })
      }
      const ok = await setKeterampilan([...keterampilan, ...extraKeterampilan])
      if (ok) {
        router.refresh()
        return setLangkah(2)
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Keterampilan Saya:</label>
        <div className="flex flex-col gap-2">
          {
            [
              "Memasak",
              "Mencuci Manual ",
              "Mencuci (Mesin Cuci)",
              "Merapikan Rumah (sapu + pel)",
              "Menyetrika",
              "Mengurus Bayi Baru Lahir",
              "Mengasuh Balita (-5th)",
              "Merawat Anak (5th+)",
              "Mengurus Taman",
              "Mendongeng",
              "Mengajar Baca Tulis",
              "Membawa Motor",
              "Membawa Mobil",
              "Mengurus Lansia",
            ].map((item, idx) => {
              return <div
                key={idx}
                className="flex gap-2 items-center group"
              >
                <input
                  type="checkbox"
                  id={"item" + idx}
                  name="vehicle1"
                  value={item}
                  className="hidden peer"
                  defaultChecked={user?.calonMitra?.expertises?.includes(item) ?? undefined}
                />
                <label
                  htmlFor={"item" + idx}
                  className={cn(
                    "w-full block p-3 px-3 leading-none border border-neutral-300 rounded-md",
                    "transition-all",
                    "font-normal text-lg",
                    "peer-checked:outline-primary",
                    "hover:bg-primary/10",
                    "peer-checked:bg-primary/20",
                    "outline outline-0",
                    "text-white/0",
                    "peer-checked:text-primary",
                    "select-none",
                    "cursor-pointer",
                    "flex justify-between items-center",
                  )}
                >
                  <div className="text-black text-xl">
                    {item}
                  </div>
                  <PhCheckCircleFill className="text-3xl" />
                </label>
              </div>
            })
          }
        </div>
        {
          error.keterampilan && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.keterampilan}
          </div>
        }

        <div className="mt-6 text-lg border-b pb-2 border-neutral-300">
          Keterampilan Lainnya
        </div>
        {
          extraKeterampilan.map((item, idx) => {
            return (
              <div key={item} className="flex gap-2 justify-between items-start">
                <div className="font-semibold mt-1.5 flex-1 leading-tight">{item}</div>
                <button className="button" onClick={() => {
                  setExtraKeterampilan(prev => prev.filter(p => p !== item))
                }}>hapus</button>
              </div>
            )
          })
        }
        <input
          placeholder="Isi keterampilan tambahan"
          className="input my-2"
          ref={inputRef}
        />
        <button className="button text-lg" onClick={(e) => {
          e.preventDefault()
          if (!inputRef.current.value || !inputRef.current.value === "") {
            inputRef.current.focus()
            return
          }
          if (extraKeterampilan.includes(inputRef.current.value)) {
            setExtraKeterampilan(prev => [...prev])
            return
          }
          setExtraKeterampilan(prev => [...prev, inputRef.current.value])
        }}>Tambah keterampilan</button>
      </fieldset>


      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selanjutnya
      </button>
    </form>
  )
}


export function PhCheckCircleFill(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"></path></svg>
  )
}

// TODO: pindahin ke /config
export const definedListKeterampilan = [
  "Memasak",
  "Mencuci Manual ",
  "Mencuci (Mesin Cuci)",
  "Merapikan Rumah (sapu + pel)",
  "Menyetrika",
  "Mengurus Bayi Baru Lahir",
  "Mengasuh Balita (-5th)",
  "Merawat Anak (5th+)",
  "Mengurus Taman",
  "Mendongeng",
  "Mengajar Baca Tulis",
  "Membawa Motor",
  "Membawa Mobil",
  "Mengurus Lansia",
]


function FormKebutuhanKhusus({ setLangkah, user, error, clearFormError, setError }) {

  const router = useRouter()

  return (
    <form action={async (form) => {
      clearFormError()
      const values = []
      form.forEach((e) => {
        values.push(e)
      })

      console.log(values)

      // TODO: Maybe flip the booleans?
      // if (values.length === 0) {
      // return setError({ kebutuhanKhusus: "Mohon pilih setidaknya satu keterampilan 🙏" })
      // }

      const ok = await setKebutuhanKhusus(values)
      if (ok) {
        router.refresh()
        return setLangkah(3)
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Pertimbangan</label>
        <p>Apakah ada yang harus diketahui untuk pencari Mitra?</p>
        <div className="flex flex-col gap-2">
          {
            [
              { value: "Alergi Anjing", detail: "Saya memiliki alergi anjing" },
              { value: "Alergi Kucing", detail: "Saya memiliki alergi kucing" },
            ].map((item, idx) => {
              return <div
                key={idx}
                className="flex gap-2 items-center group"
              >
                <input
                  type="checkbox"
                  id={"item" + idx}
                  name="vehicle1"
                  value={item.value}
                  className="hidden peer"
                  defaultChecked={user?.calonMitra?.considerations?.includes(item.value) ?? undefined}
                />
                <label
                  htmlFor={"item" + idx}
                  className={cn(
                    "w-full block p-3 px-3 leading-none border border-neutral-300 rounded-md",
                    "transition-all",
                    "font-normal text-lg",
                    "peer-checked:outline-primary",
                    "hover:bg-primary/10",
                    "peer-checked:bg-primary/20",
                    "outline outline-0",
                    "text-white/0",
                    "peer-checked:text-primary",
                    "select-none",
                    "cursor-pointer",
                    "flex justify-between items-center",
                  )}
                >
                  <div className="text-black text-xl">
                    {item.detail}
                  </div>
                  <PhCheckCircleFill className="text-3xl" />
                </label>
              </div>
            })
          }
        </div>
        {
          error.kebutuhanKhusus && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.kebutuhanKhusus}
          </div>
        }
      </fieldset>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selanjutnya
      </button>
    </form>
  )
}

function FormFotoDiri({ setLangkah, user, error, clearFormError, setError }) {
  const router = useRouter()

  const [src, setSrc] = useState()

  useEffect(() => {
    (async () => {
      const url = await getImageURL(`fotodiri/${user.id}.webp`)
      setSrc(url)
    })()
  }, [user])

  const inputRef = useRef(null)

  return (
    <form action={async (form) => {
      clearFormError()
      const file = form.get('fotodiri')
      console.log(file.size === 0)
      if (file.size === 0) {
        if (!src) {
          return setError({ fotoDiri: "Mohon upload foto diri 🙏" })
        }
      }

      const ok = await setFotodiri()
      if (ok) {
        router.refresh()
        return setLangkah(4)
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Foto saya:</label>
        <p>Foto ini akan ditampilkan secara umum</p>

        <div className="w-full aspect-[9/10] bg-neutral-200 rounded-xl flex relative items-center justify-center overflow-hidden shadow-lg shadow-black/20">
          {src ? <img src={src} alt="" width={999} height={999} className="absolute inset-0 object-cover h-full w-full" /> : <></>}
          <input
            id="imageupload"
            className="image-upload"
            type="file"
            name="fotodiri"
            accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff"
            hidden
            ref={inputRef}
            onError={() => {
              setSrc("")
            }}
            onChange={async (e) => {
              console.log(e.currentTarget.files[0])
              clearFormError()
              // try {
              await uploadImage(e.currentTarget.files[0], `fotodiri/${user.id}.webp`)
              const url = await getImageURL(`fotodiri/${user.id}.webp`)
              setSrc(url)
              // console.log(url)
              // } catch (error) {
              //   console.log(error)
              // }
            }}
          />
          <label
            htmlFor="imageupload"
            className="absolute inset-0 cursor-pointer w-full h-full hover:bg-black/10 flex items-center justify-center"
          >
            {src ? "" : "Pilih Gambar"}
          </label>
        </div>
        {
          error.fotoDiri && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.fotoDiri}
          </div>
        }
      </fieldset>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selanjutnya
      </button>
    </form>
  )


}

function FormFotoKTP({ setLangkah, user, error, clearFormError, setError }) {
  const router = useRouter()

  const [src, setSrc] = useState()

  useEffect(() => {
    (async () => {
      const url = await getImageURL(`fotoKTP/${user.id}.webp`)
      setSrc(url)
    })()
  }, [user])

  const inputRef = useRef(null)

  return (
    <form action={async (form) => {
      clearFormError()
      const file = form.get('fotoKTP')
      console.log(file.size === 0)
      if (file.size === 0) {
        if (!src) {
          return setError({ fotoKTP: "Mohon upload foto KTP 🙏" })
        }
      }

      const ok = await setFotoKTP()
      if (ok) {
        router.refresh()
        return setLangkah(5)
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Foto KTP saya:</label>
        <p>Foto ini akan digunakan untuk proses verifikasi dan tidak di tampilkan secara umum</p>

        <div className="w-full aspect-[1000/631] bg-neutral-200 rounded-xl flex relative items-center justify-center overflow-hidden shadow-lg shadow-black/20">
          {src ? <img
            src={src}
            alt=""
            width={999}
            height={999}
            className="absolute inset-0 object-cover h-full w-full"
            onError={() => {
              setSrc("")
            }}
          /> : <></>}
          <input
            id="imageupload"
            className="image-upload"
            type="file"
            name="fotoKTP"
            accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff"
            hidden
            ref={inputRef}
            onChange={async (e) => {
              console.log(e.currentTarget.files[0])
              clearFormError()
              // try {
              await uploadImage(e.currentTarget.files[0], `fotoKTP/${user.id}.webp`)
              const url = await getImageURL(`fotoKTP/${user.id}.webp`)
              setSrc(url)
              // console.log(url)
              // } catch (error) {
              //   console.log(error)
              // }
            }}
          />
          <label
            htmlFor="imageupload"
            className="absolute inset-0 cursor-pointer w-full h-full hover:bg-black/10 flex items-center justify-center"
          >
            {src ? "" : "Pilih Gambar"}
          </label>
        </div>
        {
          error.fotoKTP && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.fotoKTP}
          </div>
        }
      </fieldset>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selanjutnya
      </button>
    </form>
  )
}

function FormInputHarga({ setLangkah, user, error, clearFormError, setError }) {

  const [hargaPerJam, setHargaPerJam] = useState(false)
  const [hargaHarian, setHargaHarian] = useState(false)
  const [hargaBulanan, setHargaBulanan] = useState(false)
  const router = useRouter()

  return (
    <form action={async (form) => {
      clearFormError()

      const perJam = form.get('harga-per-jam')
      const perHari = form.get('harga-per-hari')
      const perBulan = form.get('harga-per-bulan')

      // console.log(perJam, perHari, perBulan)

      if (!perJam && !perHari && !perBulan) {
        return setError({ harga: "Mohon isi salah satu harga 🙏" })
      }

      const ok = await setHarga(Number(perJam), Number(perHari), Number(perBulan))
      if (ok) {
        await fetch("/api/daftar-mitra/selesai", {
          method: "POST",
        });
        route.refresh();
      }
    }}>
      <label htmlFor="tanggal-lahir" className="text-2xl">Harga jasa saya:</label>
      <div className="my-4 flex flex-col gap-2">
        <div className="h-36 flex items-stretch">
          {
            hargaPerJam
              ? <fieldset className="flex-1">
                <label htmlFor="harga-per-jam">Harga Per Jam</label>
                <div className="input flex gap-2 items-center text-xl text-neutral-400 select-none">
                  Rp.
                  <input
                    type="number"
                    id="harga-per-jam"
                    name="harga-per-jam"
                    min={0}
                    defaultValue={0}
                    className="h-full outline-none grow text-black text-end flex-1"
                  />
                  <span className="text-neutral-600">
                    per jam
                  </span>
                </div>
                <button className="button" onClick={() => {
                  setHargaPerJam(false)
                }}>Hapus Data Per Jam</button>
              </fieldset>
              : <div
                className="grow flex items-center justify-center bg-neutral-100 rounded-lg gap-2 hover:bg-neutral-200 cursor-pointer"
                onClick={async () => {
                  setHargaPerJam(true)
                }}
              >
                <PhPlusBold /> Tambah Harga Per Jam
              </div>
          }
        </div>
        <div className="w-full h-36 flex items-stretch">

          {
            hargaHarian
              ? <fieldset className="flex-1">
                <label htmlFor="harga-per-hari">Harga Harian</label>
                <div className="input flex gap-2 items-center text-xl text-neutral-400 select-none">
                  Rp.
                  <input
                    type="number"
                    id="harga-per-hari"
                    name="harga-per-hari"
                    min={0}
                    defaultValue={0}
                    className="outline-none flex-1 text-black text-end"
                  />
                  <span className="text-neutral-600">
                    Harian
                  </span>
                </div>
                <button className="button" onClick={() => {
                  setHargaHarian(false)
                }}>Hapus Data Harian</button>
              </fieldset>
              : <div
                className="grow flex items-center justify-center bg-neutral-100 rounded-lg gap-2 hover:bg-neutral-200 cursor-pointer"
                onClick={async () => {
                  setHargaHarian(true)
                }}
              >
                <PhPlusBold /> Tambah Harga Harian
              </div>
          }
        </div>
        <div className="w-full h-36 flex items-stretch">

          {
            hargaBulanan
              ? <fieldset className="flex-1">
                <label htmlFor="harga-per-bulan">Harga Bulanan</label>
                <div className="input flex gap-2 items-center text-xl text-neutral-400 select-none">
                  Rp.
                  <input
                    type="number"
                    id="harga-per-bulan"
                    name="harga-per-bulan"
                    min={0}
                    defaultValue={0}
                    className="outline-none flex-1 text-black text-end"
                  />
                  <span className="text-neutral-600">
                    per bulan
                  </span>
                </div>
                <button className="button" onClick={() => {
                  setHargaBulanan(false)
                }}>Hapus Data Bulanan</button>
              </fieldset>
              : <div
                className="w-full h-36 flex items-center justify-center bg-neutral-100 rounded-lg gap-2 hover:bg-neutral-200 cursor-pointer"
                onClick={async () => {
                  setHargaBulanan(true)
                }}
              >
                <PhPlusBold /> Tambah Harga Bulanan
              </div>
          }
        </div>
        {
          error.harga && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.harga}
          </div>
        }
      </div>
      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Selesai
      </button>
    </form>
  )
}


export function PhPlusBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"></path></svg>
  )
}