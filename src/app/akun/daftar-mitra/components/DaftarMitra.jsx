"use client";
import { useState } from "react";
import { PageDisplay } from "./PageDisplay";

export default function DaftarMitra() {
  const [pageNum, setPageNum] = useState(0);
  const [formData, setFormData] = useState({
    tanggalLahir: "2000-01-01",
    keterampilan: "",
    kebutuhanKhusus: "",
    harga: 0,
    fotoDiri: "",
    fotoKTP: "",
  });
  const pageLength = 5;
  const formTitles = `Langkah ${pageNum + 1}/${pageLength + 1}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex justify-between">
        <h1>{formTitles}</h1>
        <button
          onClick={async () => {
            await fetch("/daftar-mitra/batal", { method: "DELETE" });
          }}
        >
          Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {PageDisplay({ pageNum, formData, setFormData })}
        <div className="flex gap-4">
          {pageNum !== 0 && (
            <button
              type="button"
              disabled={pageNum === 0}
              onClick={() => {
                setPageNum((curr) => curr - 1);
              }}
            >
              Prev
            </button>
          )}
          {pageNum < pageLength ? (
            <button
              type="button"
              disabled={pageNum === pageLength}
              onClick={() => {
                setPageNum((curr) => curr + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}
