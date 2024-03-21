"use server"

import { getUserData } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function setTanggalLahir(value) {
  const userData = await getUserData()
  const date = new Date(value)
  const cm = await prisma.calonMitra.update({
    where: { userId: userData.id },
    data: { dateOfBirth: date }
  })
  return true
}

export async function setKeterampilan(value) {
  const userData = await getUserData()
  const cm = await prisma.calonMitra.update({
    where: { userId: userData.id },
    data: { expertises: value }
  })
  return true
}

export async function setKebutuhanKhusus(value) {
  const userData = await getUserData()
  const cm = await prisma.calonMitra.update({
    where: { userId: userData.id },
    data: { considerations: value }
  })
  return true
}

export async function setFotodiri() {
  const userData = await getUserData()
  const cm = await prisma.calonMitra.update({
    where: { userId: userData.id },
    data: { isFotoDiri: true }
  })
  return true
}

export async function setFotoKTP() {
  const userData = await getUserData()
  const cm = await prisma.calonMitra.update({
    where: { userId: userData.id },
    data: { isFotoKTP: true }
  })
  return true
}

export async function setHarga(perDay, perHour, perMonth) {
  const userData = await getUserData()
  const cm = await prisma.calonMitra.update({
    where: { userId: userData.id },
    data: {
      pricePerDay: perDay ?? undefined,
      pricePerHour: perHour ?? undefined,
      pricePerMonth: perMonth ?? undefined,
    }
  })
  return true
}

export async function selesaiPendaftaran() {
  
}