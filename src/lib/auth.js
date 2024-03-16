import { getServerSession } from "next-auth";
import { authOptions } from "./next-auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

// export async function auth() {
//   const session = await getServerSession(authOptions)
//   // put validation here or something
//   return session
// }


export async function getUserSession() {
  const session = await getServerSession(authOptions)
  return session
}

/**
 * 
 * @param {{
 *   redirectIfNoSession?: boolean
 *   redirectIfNoData?: boolean
 * }} [opts] 
 * @returns {import("@prisma/client").User}
 */
export async function getUserData(opts) {
  const session = await getServerSession(authOptions)
  if (!session && opts?.redirectIfNoSession) {
    redirect('/test') // TODO: Change this to actual login page lol
  }
  const user = await prisma.user.findUnique({
    where: {
      // email: session.email ?? "",
      // phoneNumber: session.phoneNumber ?? "",
      email_phoneNumber: {
        email: session?.email ?? "",
        phoneNumber: session?.phoneNumber ?? ""
      }
    }
  })
  if (!user && opts?.redirectIfNoData ) {
    redirect('/daftar')
  }
  return user
}