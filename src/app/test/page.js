import { getUserData, getUserSession } from "@/lib/auth";
import { ClientTestPage } from "./client";
import { prisma } from "@/lib/prisma";

export default async function TestPage() {

  const session = await getUserSession()
  const userData = await getUserData()

  const registeredUser = await prisma.user.findFirst({
    where: {
      phoneNumber: "198"
    }
  })
  if (!registeredUser) {
    await prisma.user.create({ 
      data: {
        fullName: "Jojo",
        email: "",
        phoneNumber: "198",
        location: {
          create: {
            kecamatan: "kecamatanXXX",
            kota: "kotaYYY",
            provinsi: "provinsiZZZ",
          }
        }
      }
    })
  }

  const mitraUser = await prisma.user.findFirst({
    where: {
      phoneNumber: "199",
    }
  })
  if (!mitraUser) {
    await prisma.user.create({
      data: {
        fullName: "Lili",
        email: "",
        phoneNumber: "199",
        location: {
          create: {
            kecamatan: "kecamatanXXX",
            kota: "kotaYYY",
            provinsi: "provinsiZZZ",
          }
        },
        mitra: {
          create: {
            allowOvernight: true,
            dateOfBirth: new Date(Date.now()),
            status: "Sibuk",
            considerations: ["considerationCCC"],
            expertises: ["expertiseXXX"],
            pricePerDay: 90,
          }
        }
      }
    })
  }

  return (
    <main>
      Welcome to test page<br />
      Session: {JSON.stringify(session)}<br />
      UserData: {JSON.stringify(userData)}
      <ClientTestPage />
    </main>
  )
}