import { getServerSession } from "next-auth";
import { authOptions } from "./next-auth";

export async function auth() {
  const session = await getServerSession(authOptions)
  // put validation here or something
  return session
  //test
}

