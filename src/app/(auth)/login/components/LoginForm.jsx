"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input/react-hook-form-input";

import { generateOTP } from "@/lib/otpGenerator";

export const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setPhoneNumber(data.phoneInput);
    const otp = generateOTP();

    setShowOtpInput(true);
  };

  return (
    <>
      {!showOtpInput ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <PhoneInput
            name="phoneInput"
            placeholder="Nomor handphone"
            country="ID"
            control={control}
            rules={{
              required: true,
              pattern: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g,
            }}
            aria-invalid={errors.phoneInput ? "true" : "false"}
            className="border border-gray-300 rounded-md px-2 h-12"
          />
          {errors.phoneInput?.type === "pattern" && (
            <p role="alert" className="text-sm italic text-slate-400">
              Masukkan nomor handphone yang valid.
            </p>
          )}
          <button
            type="submit"
            className="bg-rose-400 rounded-md text-white h-12"
          >
            Masuk
          </button>
        </form>
      ) : (
        <form action="">
          <p>
            Masukkan kode OTP yang telah dikirim ke nomor handphone Anda:
            {phoneNumber}
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> - </span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"border-gray-400"}
            containerStyle={"p-4 flex justify-center"}
          />
        </form>
      )}
    </>
  );
};
