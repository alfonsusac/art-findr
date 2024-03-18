"use client";

import { Controller, useForm } from "react-hook-form";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import OtpInput from "react-otp-input";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import PhoneInput from "react-phone-number-input/react-hook-form-input";

export const LoginForm = () => {
  const [phoneStep, setPhoneStep] = useState(0);

  const valSchema = [
    yup.object({
      phone: yup
        .string()
        .required()
        .matches(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g)
        .min(10),
    }),
    yup.object({
      otp: yup.number().required().min(6),
    }),
  ];

  const currentValSchema = valSchema[phoneStep];

  const { control, handleSubmit, trigger } = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentValSchema),
    mode: "onChange",
  });

  const onSubmit = ({ phone, otp }) => {
    signIn("phoneOTP", {
      phoneNumber: phone,
      otp: otp,
      callbackUrl: "/akun",
    });
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setPhoneStep((step) => step + 1);
  };

  const onError = (e) => {
    console.log(e);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-4 width-full"
    >
      <section className={phoneStep > 0 ? "hidden" : "block"}>
        <div className="flex flex-col gap-4">
          <PhoneInput
            name="phone"
            placeholder="Nomor handphone"
            country="ID"
            control={control}
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
      </section>

      <section className={phoneStep > 0 ? "block" : "hidden"}>
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
