/* eslint-disable @next/next/no-img-element */
"use client";

import { getImageURL } from "@/lib/upload";
import { uploadImage } from "@/lib/upload-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const UbahKtp = ({ user }) => {
  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   setSelectedImage(URL.createObjectURL(file));
  // };

  // function handleSubmit() {
  //   console.log(selectedImage);
  // }
  const [error, setError] = useState({})
  const clearFormError = () => setError({})
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
      router.push('/akun')
      router.refresh()
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Foto KTP saya:</label>
        <p>Foto ini akan digunakan untuk proses verifikasi dan tidak ditampilkan secara umum</p>

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
              await uploadImage(e.currentTarget.files[0], `fotoKTP/${user.id}.webp`)
              const url = await getImageURL(`fotoKTP/${user.id}.webp`)
              setSrc(url)
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
        Selesai
      </button>
    </form>
  )

};
