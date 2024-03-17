import { getImageURL } from "@/lib/upload"
import { UploadFormTestPage } from "./form"
/* eslint-disable @next/next/no-img-element */

export const dynamic = 'force-dynamic'
export default async function UploadExample() {
  
  const testImageLink = await getImageURL('/fotodiri/test.webp')

  return (
    <>
      <UploadFormTestPage />
      <img src={testImageLink} alt="" />
    </>
  )
}