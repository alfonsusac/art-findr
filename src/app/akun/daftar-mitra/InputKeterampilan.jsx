import React from "react";

export const InputKeterampilan = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="keterampilan">Keterampilan:</label>
      <input
        type="text"
        id="keterampilan"
        name="keterampilan"
        className="p-2 border border-gray-300 h-8 rounded-md"
      />
    </>
  );
};
