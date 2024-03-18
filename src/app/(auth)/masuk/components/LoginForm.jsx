"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, signOut } from "next-auth/react";

import { LoginPhone } from "./LoginPhone";
import { LoginOtp } from "./LoginOtp";
import { generateOTP } from "@/lib/otpGenerator";

export const LoginForm = () => {
  const [phoneStep, setPhoneStep] = useState(0);
  const [phoneNum, setPhoneNum] = useState("");

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

  // TODO:
  // Move this to handleNext once feature is completed
  const otpValue = generateOTP();

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) {
      return;
    }

    await fetch("/api/kirim-otp", {
      method: "POST",
      body: JSON.stringify({
        nomorHandphone: phoneNum,
        otp: otpValue,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("OTP:" + otpValue + "generated in VerifikasiOtp table!");
        setPhoneStep((step) => step + 1);
      } else {
        alert(res.status);
      }
    });
  };

  const onSubmit = ({ phone, otp }) => {
    signIn("phoneOTP", {
      phoneNumber: phone,
      otp: otp,
      callbackUrl: "/akun",
    });
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
        <LoginPhone
          control={control}
          setPhoneNum={setPhoneNum}
          handleNext={handleNext}
        />
      </section>

      <section className={phoneStep > 0 ? "block" : "hidden"}>
        <LoginOtp control={control} />
      </section>
    </form>
  );
};
