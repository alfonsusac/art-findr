"use client";

import Image from "next/image";
import { useState } from "react";

export default function UbahFoto() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  function handleSubmit() {
    console.log(selectedImage);
  }

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
