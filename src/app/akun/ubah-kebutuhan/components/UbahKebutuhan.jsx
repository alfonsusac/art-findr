"use client";
import { setSourceMapsEnabled } from "process";
import { useState } from "react";

export const UbahKebutuhan = () => {
  const [need, setneeds] = useState([]);
  const [input, setInput] = useState(""); // new state for the input value

  const handleDelete = (index) => {
    const newneeds = [...need];
    newneeds.splice(index, 1);
    setneeds(newneeds);
  };

  const handleAdd = () => {
    setneeds([...need, input]);
    setInput(""); // clear the input after adding the need
  };
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <a className="text-gray-400 hover:text-gray-300" href="#">
          Batal{"\n          "}
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-4">Ubah Kebutuhan</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Kebutuhan Saya:</h2>
        <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
          {need.length > 0 ? (
            need.map((need, index) => (
              <div key={index}>
                <span>{need}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  hapus
                </button>
              </div>
            ))
          ) : (
            <p>No needs added yet.</p>
          )}
        </div>
      </div>
      <div className="mb-6 text-black">
        <input
          placeholder="Butuh Tempat Tinggal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleAdd}
        >
          + Tambah
        </button>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700">Simpan</button>
    </div>
  );
};
