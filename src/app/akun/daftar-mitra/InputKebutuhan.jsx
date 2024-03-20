import CreatableSelect from "react-select/creatable";

export const InputKebutuhan = ({ kebutuhan, setKebutuhan }) => {
  const options = [
    { value: "1", label: "Bisa mengendarai motor" },
    { value: "2", label: "Mau mengolah B2" },
    { value: "3", label: "Takut/alergi anjing" },
    { value: "4", label: "Takut/alergi kucing" },
    { value: "5", label: "Tidak pulang saat lebaran" },
    { value: "6", label: "Tidak pulang saat natal & tahun baru" },
  ];
  return (
    <>
      <label htmlFor="kebutuhan-khusus">Kebutuhan khusus:</label>
      <CreatableSelect
        isClearable
        isMulti
        id="kebutuhan-khusus"
        name="kebutuhan-khusus"
        options={options}
        onChange={(value) => setKebutuhan(value.map((i) => i.label))}
      />
    </>
  );
};
