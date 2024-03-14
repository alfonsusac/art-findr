import { getUserSession } from "@/lib/auth";
import { ClientTestPage } from "./client";

export default async function TestPage() {

  const session = await getUserSession()

  return (
    <main>
      Welcome to test page<br />
      {JSON.stringify(session)}<br />
      <ClientTestPage />
    </main>
  )
}