import CreatableSelect from "react-select/creatable";

export const InputKeterampilan = ({
  keterampilan,
  setKeterampilan,
}) => {
  const options = [
    { value: "1", label: "Merawat rumah" },
    { value: "2", label: "Cuci setrika" },
    { value: "3", label: "Cuci piring" },
    { value: "4", label: "Memasak" },
    { value: "5", label: "Merawat bayi" },
    { value: "6", label: "Merawat balita" },
    { value: "7", label: "Merawat lansia" },
  ];

  return (
    <>
      <label htmlFor="keterampilan">Keterampilan:</label>
      <CreatableSelect
        isClearable
        isMulti
        id="keterampilan"
        name="keterampilan"
        options={options}
        onChange={(value) => setKeterampilan(value.map((i) => i.label))}
      />
    </>
  );
};
