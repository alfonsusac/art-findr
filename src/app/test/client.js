"use client"
import { signIn, signOut } from "next-auth/react"


export function ClientTestPage() {
  return (
    <div className="flex flex-col max-w-48">
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
        <input type="tel" name="phone" placeholder="phone number"/>
        <input type="text" name="otp" placeholder="otp"/>
        <button>
          Sign in with phone
        </button>
      </form>
      <hr />
      <button onClick={() => { signOut()}}>
        Log out
      </button>
    </div>
  )
}