"use client";

import { getImageURL } from "@/lib/upload";
import { uploadImage } from "@/lib/upload-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UbahFoto({ user }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  function handleSubmit() {
    console.log(selectedImage);
  }

  const router = useRouter()
  const [error, setError] = useState({})
  const clearFormError = () => setError({})

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
      router.push('/akun')
      router.refresh()
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Foto saya:</label>
        <p>Tekan foto anda dibawah ini untuk mengubah foto diri anda. Foto ini akan ditampilkan secara umum</p>
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
        Selesai
      </button>
    </form>
  )

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <h1 className="text-xl font-semibold">Ubah Foto Diri</h1>
        <div />
      </div>
      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg font-medium mb-4">Foto saya:</h2>
        <div className="flex justify-center items-center w-full h-48 mb-6 border-2 border-white rounded-lg">
          <Image
            alt="Profile"
            className="w-full h-full"
            src={selectedImage || "/placeholder.svg"}
            style={{
              aspectRatio: "500/500",
              objectFit: "cover",
            }}
            width="500"
            height="500"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-4 bg-white text-black"
        />
        <button className="w-full bg-white text-black" onClick={handleSubmit}>
          Simpan
        </button>
      </div>
    </div>
  );
}
