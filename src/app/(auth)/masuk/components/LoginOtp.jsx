import { Controller } from "react-hook-form";
import OtpInput from "react-otp-input";

export const LoginOtp = ({ control }) => {
  return (
    <div className="flex flex-col gap-4 text-center w-full">
      <p className="text-lg">
        Masukkan 6 digit kode OTP yang telah dikirim melalui SMS ke nomor
        handphone Anda:
      </p>
      <Controller
        name="otp"
        control={control}
        rules={{
          required: true,
          validate: (value) => value.length === 6,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <div className="p-4 m-auto
          [&_input]:bg-neutral-200
          [&_input]:p-2
          [&_input]:rounded-md
          [&_input]:text-xl
          [&_input]:!w-8
          ">
            <OtpInput
              value={value}
              onChange={onChange}
              numInputs={6}
              renderSeparator={<span className="mx-1 text-neutral-400">-</span>}
              renderInput={(props) => <input type="number" {...props} />}
            />
          </div>
        )}
      />
      <p className="text-lg">
        Tidak menerima kode OTP?{" "}<br />
        👉 <button type="reset" className=" text-blue-500">
          Kirim ulang
        </button> 👈
      </p>
      <button type="submit" className="button btn-primary h-14 text-lg">
        Masuk
      </button>
    </div>
  );
};
