import GoogleProvider from "next-auth/providers/google"
import { env } from "./utils"

/**
@type {import("next-auth").AuthOptions}
 */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_ID'),
      clientSecret: env('GOOGLE_SECRET')
    })
  ],

}