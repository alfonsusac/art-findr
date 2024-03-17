import React from "react";

export const InputHarga = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="harga">Harga per jam:</label>
      <input
        type="number"
        id="harga"
        name="harga"
        value={formData.harga}
        onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
        className="p-2 border border-gray-300 h-8 rounded-md"
      />
    </>
  );
};
