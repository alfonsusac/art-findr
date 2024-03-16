"use client";
import { setSourceMapsEnabled } from "process";
import { useState } from "react";

export const UbahKeterampilan = () => {
  const [skill, setSkills] = useState([]);
  const [input, setInput] = useState(""); // new state for the input value

  const handleDelete = (index) => {
    const newSkills = [...skill];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAdd = () => {
    setSkills([...skill, input]);
    setInput(""); // clear the input after adding the skill
  };
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <a className="text-gray-400 hover:text-gray-300" href="#">
          Batal{"\n          "}
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-4">Ubah Keterampilan</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Keterampilan Saya:</h2>
        <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
          {skill.length > 0 ? (
            skill.map((skill, index) => (
              <div key={index}>
                <span>{skill}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  hapus
                </button>
              </div>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      </div>
      <div className="mb-6 text-black">
        <input
          placeholder="Mengurus Anjing"
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
