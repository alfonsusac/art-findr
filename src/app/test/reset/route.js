import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


/**
 * 
 * @param {NextRequest} req 
 */
export async function POST() {
  const deleteUser = prisma.user.deleteMany({ where: { phoneNumber: { in: ['198', '199', '200', '299'] }, }, })
  const deleteLocation = prisma.seekerAddress.deleteMany({ where: { user: { phoneNumber: { in: ['198', '199', '200', '299'] } } }, })
  const deleteMitra = prisma.mitra.deleteMany({ where: { user: { phoneNumber: { in: ['198', '199', '200', '299'] } } }, })
  const deleteCalonMitra = prisma.calonMitra.deleteMany({ where: { user: { phoneNumber: { in: ['198', '199', '200', '299'] } } }, })
  await prisma.$transaction([deleteLocation, deleteCalonMitra, deleteMitra, deleteUser])


  await prisma.user.create({
    data: {
      id: "198",
      fullName: "Jojo", email: "", phoneNumber: "198",
      location: { create: { kecamatan: "kecamatanXXX", kota: "kotaYYY", provinsi: "provinsiZZZ", } }
    }
  })
  await prisma.user.create({
    data: {
      id: "199",
      fullName: "Bibi",
      email: "",
      phoneNumber: "199",
      location: {
        create: {
          kecamatan: "kecamatanAAA",
          kota: "kotaBBB",
          provinsi: "provinsiCCC",
        }
      },
      calonMitra: {
        create: {

        }
      }
    }
  })
  await prisma.user.create({
    data: {
      id: "200",
      fullName: "Lili",
      email: "",
      phoneNumber: "200",
      location: {
        create: {
          kecamatan: "kecamatan111X",
          kota: "kota222",
          provinsi: "provinsi333",
        }
      },
      mitra: {
        create: {
          allowOvernight: true,
          dateOfBirth: new Date(Date.now()),
          status: "Tersedia",
          considerations: ["considerationCCC"],
          expertises: ["expertiseXXX"],
          pricePerDay: 90,
        }
      }
    }
  })
  await prisma.user.create({
    data: {
      id: "299",
      fullName: "Lala",
      email: "",
      phoneNumber: "299",
      location: {
        create: {
          kecamatan: "kecamatan111XU",
          kota: "kota222ZZ",
          provinsi: "provinsi333ZX",
        }
      },
      mitra: {
        create: {
          allowOvernight: true,
          dateOfBirth: new Date(Date.now()),
          status: "Tersedia",
          considerations: ["considerationCCCasdasd"],
          expertises: ["expertiseXXasdasdX"],
          pricePerDay: 90,
        }
      }
    }
  })
  console.log("Data Reseted")
  return NextResponse.json({})
}