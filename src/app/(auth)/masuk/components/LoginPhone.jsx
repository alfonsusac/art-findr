import PhoneInput from "react-phone-number-input/react-hook-form-input";

export const LoginPhone = ({ control, setPhoneNum, handleNext }) => {
  return (
    <div className="flex flex-col gap-4">
      <PhoneInput
        name="phone"
        placeholder="Nomor handphone"
        country="ID"
        control={control}
        onChange={setPhoneNum}
        className="border border-gray-300 rounded-md px-2 h-12"
      />
      <button
        type="button"
        onClick={handleNext}
        className="bg-rose-400 rounded-md text-white h-12"
      >
        Masuk
      </button>
    </div>
  );
};
