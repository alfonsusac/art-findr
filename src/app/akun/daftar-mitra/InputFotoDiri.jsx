import React from "react";

// async function handleChange() {
//   try {
//     await uploadImage(fotoDiri, `fotodiri/${userData.id}`);
//     await uploadImage(fotoKTP, `fotoKTP/${userData.id}`);
//   } catch (error) {
//     return NextResponse.json({ status: 500, body: "Error uploading Image!" });
//   }
// }

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
