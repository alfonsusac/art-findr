import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


/**
 * 
 * @param {NextRequest} req 
 */
export async function POST(req) {
  const deleteUser = prisma.user.deleteMany({
    where: {
      phoneNumber: {
        in: ['198', '199']
      },
    },
  })
  const deleteLocation = prisma.seekerAddress.deleteMany({
    where: {
      user: {
        phoneNumber: {
          in: ['198', '199']
        }
      }
    },
  })
  const deleteMitra = prisma.mitra.deleteMany({
    where: {
      user: {
        phoneNumber: {
          in: ['198', '199']
        }
      }
    },
  })
  const deleteCalonMitra = prisma.calonMitra.deleteMany({
    where: {
      user: {
        phoneNumber: {
          in: ['198', '199']
        }
      }
    },
  })
  const transaction = await prisma.$transaction([deleteLocation, deleteCalonMitra, deleteMitra, deleteUser])


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

  return NextResponse.json({})
}