import { Controller } from "react-hook-form";
import OtpInput from "react-otp-input";

export const LoginOtp = ({ control }) => {
  return (
    <div className="flex flex-col gap-4 text-center w-full">
      <p>
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
          <div className="p-4 m-auto">
            <OtpInput
              value={value}
              onChange={onChange}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        )}
      />
      <p>
        Tidak menerima kode OTP?{" "}
        <button type="reset" className="text-rose-400">
          Kirim ulang.
        </button>
      </p>
      <button type="submit" className="bg-rose-400 rounded-md text-white h-12">
        Masuk
      </button>
    </div>
  );
};
