"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const MitraStatus = ({ status, uid }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [mitraValue, setMitraValue] = useState(status);

  async function handleUpdate() {
    const res = await fetch("http://localhost:3000/api/akun", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uid,
        mitraValue,
      }),
    });
    const data = await res.json();
    console.log(data);

    router.refresh();
    setEditMode(false);
  }

  if (editMode) {
    return (
      <main>
        <select
          className="select select-secondary select-bordered select-xs w-fit max-w-xs"
          value={mitraValue}
          onChange={(e) => setMitraValue(e.target.value)}
        >
          <option value={"Tersedia"}>Tersedia</option>
          <option value={"Sibuk"}>Sibuk</option>
        </select>
        <button
          className="bg-blue-600 rounded-md text-white h-12 p-4 "
          onClick={handleUpdate}
        >
          Save
        </button>
        <button
          className="bg-rose-400 rounded-md text-white h-12 p-4 "
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </main>
    );
  }
  return (
    <main>
      <p>{status}</p>

      <button
        className="bg-rose-400 rounded-md text-white h-12 p-4 "
        onClick={() => setEditMode(true)}
      >
        Edit
      </button>
    </main>
  );
};
