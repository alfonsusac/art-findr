import { InputTanggalLahir } from "./InputTanggalLahir";
import { InputKeterampilan } from "./InputKeterampilan";
import { InputKebutuhan } from "./InputKebutuhan";
import { InputHarga } from "./InputHarga";
import { InputFotoDiri } from "./InputFotoDiri";
import { InputFotoKTP } from "./InputFotoKTP";

export const PageDisplay = ({ pageNum, formData, setFormData }) => {
  if (pageNum === 0) {
    return <InputTanggalLahir formData={formData} setFormData={setFormData} />;
  }
  if (pageNum === 1) {
    return <InputKeterampilan formData={formData} setFormData={setFormData} />;
  }
  if (pageNum === 2) {
    return <InputKebutuhan formData={formData} setFormData={setFormData} />;
  }
  if (pageNum === 3) {
    return <InputHarga formData={formData} setFormData={setFormData} />;
  }
  if (pageNum === 4) {
    return <InputFotoDiri formData={formData} setFormData={setFormData} />;
  }
  if (pageNum === 5) {
    return <InputFotoKTP formData={formData} setFormData={setFormData} />;
  }
};
