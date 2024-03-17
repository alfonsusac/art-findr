import React from "react";

export const InputTanggalLahir = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  return (
    <>
      <label htmlFor="tanggal-lahir">Tanggal lahir:</label>
      <input
        type="date"
        id="tanggal-lahir"
        name="tangga-lahir"
        defaultValue={defaultDate}
        className="p-2 border border-gray-300 h-8 rounded-md"
      />
    </>
  );
};
