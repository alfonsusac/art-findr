import React from "react";

export const InputTanggalLahir = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="tanggal-lahir">Tanggal lahir:</label>
      <input
        type="date"
        id="tanggal-lahir"
        name="tanggal-lahir"
        value={formData.tanggalLahir}
        onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value})}
        className="p-2 border border-gray-300 h-8 rounded-md"
      />
    </>
  );
};
