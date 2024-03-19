import { cn } from "@/lib/utils";
import PhoneInput from "react-phone-number-input/react-hook-form-input";

export const LoginPhone = ({ control, setPhoneNum, handleNext }) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "border border-gray-300 rounded-md h-14 px-4 text-lg"
        )}
      >
        <span className="text-neutral-500">
          <PhPhoneFill className="inline text-2xl align-[-0.3rem]" />
        </span>
        <PhoneInput
          name="phone"
          placeholder="Nomor handphone"
          country="ID"
          control={control}
          onChange={setPhoneNum}
          className="px-2 h-14 bg-transparent text-lg focus-within:outline-none"
        />
      </div>
      <button
        type="button"
        onClick={handleNext}
        className="button btn-primary font-medium text-lg tracking-normal rounded-md text-white h-14"
      >
        Masuk
      </button>
    </div>
  );
};


export function PhPhoneFill(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="#525252" d="M231.88 175.08A56.26 56.26 0 0 1 176 224C96.6 224 32 159.4 32 80a56.26 56.26 0 0 1 48.92-55.88a16 16 0 0 1 16.62 9.52l21.12 47.15v.12A16 16 0 0 1 117.39 96c-.18.27-.37.52-.57.77L96 121.45c7.49 15.22 23.41 31 38.83 38.51l24.34-20.71a8.12 8.12 0 0 1 .75-.56a16 16 0 0 1 15.17-1.4l.13.06l47.11 21.11a16 16 0 0 1 9.55 16.62"></path></svg>
  )
}