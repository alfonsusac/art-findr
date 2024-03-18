import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env, isDevelopment } from "./utils";

/**
@type {import("next-auth").AuthOptions}
 */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env("GOOGLE_ID"),
      clientSecret: env("GOOGLE_SECRET"),
    }),
    CredentialsProvider({
      id: "phoneOTP",
      async authorize(credentials, req) {
        const phoneNumber = credentials.phoneNumber;

        if (isDevelopment && phoneNumber.length === 3) return {
          phoneNumber
        }

        const otp = credentials.otp;

        // Check OTP sama Database
        await prisma.verifikasiOtp
          .findMany({
            where: {
              nomorHandphone: phoneNumber,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          })
          .then((data) => {
            if (otp != data[0].otp) {
              throw new Error("Invalid OTP!");
            }

            // OTP Validity: 5 minutes from createdAt
            const timeNow = new Date();
            const otpCreatedAt = new Date(data.createdAt);
            const otpExpiredAt = otpCreatedAt.setMinutes(
              otpCreatedAt.getMinutes() + 5
            );

            if (timeNow > otpExpiredAt) {
              throw new Error("OTP already expired!");
            }
          })
          .catch(error => {
            console.log(error)
            throw error
          })

        return {
          phoneNumber,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ user, token }) {
      console.log("User", user);
      // Only store email or phoneNumber in the JWT
      return {
        email: user ? user.email : token.email,
        phoneNumber: user ? user.phoneNumber : token.phoneNumber,
      };
    },
    session({ token }) {
      return {
        email: token.email,
        phoneNumber: token.phoneNumber,
      };
    },
  },
};
