import React from "react";

export const InputKebutuhan = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="kebutuhan-khusus">Kebutuhan khusus:</label>
      <input
        type="text"
        id="kebutuhan-khusus"
        name="kebutuhan-khusus"
        className="p-2 border border-gray-300 h-8 rounded-md"
        value={formData.kebutuhanKhusus}
        onChange={(e) =>
          setFormData({ ...formData, kebutuhanKhusus: e.target.value })
        }
      />
    </>
  );
};
