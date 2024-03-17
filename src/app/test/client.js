"use client"
import { uploadImage } from "@/lib/upload-client"
import { signIn, signOut } from "next-auth/react"


export function ClientTestPage() {
  return (
    <div className="flex flex-col max-w-96">
      <button onClick={async () => {
        fetch('/test/reset', { method: 'POST' })
      }}>Reset Data</button>
      <button onClick={() => { signIn("google") }}>
        Sign in with Google
      </button>
      <hr />
      <form action={async (form) => {
        signIn("phoneOTP", {
          phoneNumber: form.get('phone'),
          otp: form.get('otp')
        })
      }}>
        <input type="tel" name="phone" placeholder="phone number" />
        <input type="text" name="otp" placeholder="otp" />
        <button>
          Sign in with phone
        </button><br />
        <button formAction={async () => { signIn("phoneOTP", { phoneNumber: "198", otp: "123" }) }}>Sign in As User</button><br />
        <button formAction={async () => { signIn("phoneOTP", { phoneNumber: "199", otp: "123" }) }}>Sign in As User + calonMitra</button><br />
        <button formAction={async () => { signIn("phoneOTP", { phoneNumber: "200", otp: "123" }) }}>Sign in As User + Mitra</button><br />
      </form>
      <hr />
      <button onClick={() => { signOut() }}>
        Log out
      </button>
      <hr />
      <div className="bg-black/5 p-4 flex flex-col gap-2">
        <h3>Standard Form</h3>
        <form action={async (form) => {
          console.log(form.get('input1'))
          console.log(form.get('input2'))
          const res = await fetch("/test/api", { method: "POST", body: form })
          const data = await res.json()
          console.log(data)
        }}>
          <input name="input1" placeholder="1" />
          <input name="input2" placeholder="2" /> <br />
          <button>Submit</button>
        </form>
      </div>
      <div className="bg-black/5 p-4 flex flex-col gap-2">
        <h3>Image File</h3>
        <form action={async (form) => {
          const res = await uploadImage(form.get('fotodiri'), `/fotodiri/test.webp`)
          console.log(res)
        }}>
          <input name="fotodiri" type="file" accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}