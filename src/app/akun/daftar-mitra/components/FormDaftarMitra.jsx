"use client";
import { useState } from "react";

import { InputTanggalLahir } from "./InputTanggalLahir";
import { InputKeterampilan } from "./InputKeterampilan";
import { InputKebutuhan } from "./InputKebutuhan";
import { InputHarga } from "./InputHarga";
import { InputFotoDiri } from "./InputFotoDiri";
import { InputFotoKTP } from "./InputFotoKTP";

export default function FormDaftarMitra() {
  const [pageNum, setPageNum] = useState(0);
  const pageLength = 5;
  const formTitles = `Langkah ${(pageNum + 1)}/${pageLength + 1}`;

  const PageDisplay = () => {
    if (pageNum === 0) {
      return <InputTanggalLahir />;
    }
    if (pageNum === 1) {
      return <InputKeterampilan />;
    }

    if (pageNum === 2) {
      return <InputKebutuhan />;
    }
    if (pageNum === 3) {
      return <InputHarga />;
    }
    if (pageNum === 4) {
      return <InputFotoDiri />;
    }
    if (pageNum === 5) {
      return <InputFotoKTP />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="progressbar"></div>
      <div className="flex flex-col items-center py-8"></div>
      <div className="header">
        <h1>{formTitles}</h1>
      </div>
      <div className="flex flex-col gap-4">{PageDisplay()}</div>
      <div className="flex gap-4">
        <button
          disabled={pageNum === 0}
          onClick={() => {
            setPageNum((curr) => curr - 1);
          }}
        >
          Prev
        </button>
        <button
          disabled={pageNum === pageLength}
          onClick={() => {
            setPageNum((curr) => curr + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
