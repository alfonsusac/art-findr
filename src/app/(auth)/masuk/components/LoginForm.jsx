"use client";

import { Controller, useForm } from "react-hook-form";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import OtpInput from "react-otp-input";

import PhoneInput from "react-phone-number-input/react-hook-form-input";

export const LoginForm = () => {
  const [phoneStep, setPhoneStep] = useState(0);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = ({ phone, otp }) => {
    alert("OK");

    // signIn("phoneOTP", {
    //   phoneNumber: phone,
    //   otp: otp,
    //   callbackUrl: "/akun",
    // });
  };

  const onError = (e) => {
    console.log(e);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-4 width-full"
    >
      <section className={phoneStep >= 0 ? "block" : "hidden"}>
        <div className="flex flex-col gap-4">
          <PhoneInput
            name="phone"
            placeholder="Nomor handphone"
            country="ID"
            control={control}
            rules={{
              required: true,
              pattern: /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g,
            }}
            aria-invalid={errors.phone ? "true" : "false"}
            className="border border-gray-300 rounded-md px-2 h-12"
          />
          {errors.phone?.type === "pattern" && (
            <p role="alert" className="text-sm italic text-red-400">
              Masukkan nomor handphone yang valid.
            </p>
          )}
          <button
            type="submit"
            // onClick={() => {
            //   setPhoneStep("otp");
            // }}
            className="bg-rose-400 rounded-md text-white h-12"
          >
            Masuk
          </button>
        </div>
      </section>

      <section className={phoneStep >= 0 ? "hidden" : "block"}>
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
            render={({ field: { onChange, value, ref }, fieldState }) => (
              <div className="p-4 m-auto">
                <OtpInput
                  value={value}
                  onChange={onChange}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
                {fieldState.invalid && (
                  <p
                    role="alert"
                    className="mt-2 text-sm text-center italic text-red-400"
                  >
                    Kode OTP minimal 6 digit.
                  </p>
                )}
              </div>
            )}
          />
          <p>
            Tidak menerima kode OTP?{" "}
            <button type="reset" className="text-rose-400">
              Kirim ulang.
            </button>
          </p>
          <button
            type="submit"
            className="bg-rose-400 rounded-md text-white h-12"
          >
            Kirim kode OTP
          </button>
        </div>
      </section>
    </form>
  );
};
