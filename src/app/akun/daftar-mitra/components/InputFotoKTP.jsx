import React from "react";

export const InputFotoKTP = () => {
  return (
    <>
      <label htmlFor="foto-ktp">Foto KTP:</label>
      <input
        type="file"
        id="foto-ktp"
        name="foto-ktp"
        accept="image/png, image/jpeg"
      />
    </>
  );
};
