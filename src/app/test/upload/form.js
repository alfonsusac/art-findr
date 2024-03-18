"use client"

import { uploadImage } from "@/lib/upload-client"
import { useRouter } from "next/navigation"

export function UploadFormTestPage() {
  const router = useRouter()
  return (
    <form action={async (form) => {
      const res = await uploadImage(form.get('fotodiri'), `fotodiri/test.webp`)
      router.refresh()
    }}>
      <input name="fotodiri" type="file" accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff" />
      <button>Submit</button>
    </form>
  )
}