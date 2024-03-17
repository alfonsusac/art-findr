import React from "react";

export const InputFotoDiri = () => {
  return (
    <>
      <label htmlFor="foto-diri">Foto diri:</label>
      <input
        type="file"
        id="foto-diri"
        name="foto-diri"
        accept="image/png, image/jpeg"
      />
    </>
  );
};
