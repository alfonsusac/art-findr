import React from "react";

export const InputHarga = () => {
  return (
    <>
      <label htmlFor="harga">Harga per jam:</label>
      <input
        type="number"
        id="harga"
        name="harga"
        className="p-2 border border-gray-300 h-8 rounded-md"
      />
    </>
  );
};
