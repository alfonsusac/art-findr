import React from "react";

export const InputTanggalLahir = () => {
  return (
    <>
      <label htmlFor="tanggal-lahir">Tanggal lahir:</label>
      <input
        type="date"
        id="tanggal-lahir"
        name="tanggal-lahir"
        className="p-2 border border-gray-300 h-8 rounded-md"
      />
    </>
  );
};
