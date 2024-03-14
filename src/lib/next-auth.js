import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "./utils"

/**
@type {import("next-auth").AuthOptions}
 */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_ID'),
      clientSecret: env('GOOGLE_SECRET')
    }),
    CredentialsProvider({
      id: "phoneOTP",
      async authorize(credentials, req) {
        const phoneNumber = credentials.phoneNumber
        const otp = credentials.otp
        console.log(phoneNumber, otp)
        // TODO: Check OTP sama Database
        if (!otp) throw new Error("Wrong OTP!!")
        return {
          phoneNumber,
        }
      }
    })
  ],
  callbacks: {
    jwt({ user, token }) {
      console.log("User", user)
      // Only store email or phoneNumber in the JWT
      return {
        email: user ? user.email : token.email,
        phoneNumber: user ? user.phoneNumber : token.phoneNumber
      }
    },
    session({ token }) {
      return {
        email: token.email,
        phoneNumber: token.phoneNumber,
      }
    }


  }

}