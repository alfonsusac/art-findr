import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ResetPage() {

  // if (process.env.NODE_ENV === "development") {
  const deleteUser = prisma.user.deleteMany({ where: { id: { startsWith: 'seed' } } })
  const deleteLocation = prisma.seekerAddress.deleteMany({ where: { userId: { startsWith: 'seed' } } })
  const deleteMitra = prisma.mitra.deleteMany({ where: { userId: { startsWith: 'seed' } } })
  const deleteCalonMitra = prisma.calonMitra.deleteMany({ where: { userId: { startsWith: 'seed' } } })
  await prisma.$transaction([deleteLocation, deleteCalonMitra, deleteMitra, deleteUser])
  // }

  // await prisma.user.create({ data: { id: `seed-${crypto.randomUUID()}`, fullName: "", email: "", phoneNumber: "", location: { create: { kecamatan: "Tanjung Priok", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date(Date.now()), status: "Tersedia", considerations: [], expertises: [], pricePerDay: 100000, pricePerMonth: 2000000, pricePerHour: 10000 } } } })
  await prisma.user.create({ data: { id: `seed-1`, fullName: "Budi Santoso", email: "budisantoso@example.com", phoneNumber: "081234567890", location: { create: { kecamatan: "Tanjung Priok", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1990-05-15"), status: "Tersedia", considerations: [], expertises: ["Pembangunan", "Desain Interior"], pricePerDay: 100000, pricePerMonth: 2000000, pricePerHour: 10000 } } } })

  await prisma.user.create({ data: { id: `seed-2`, fullName: "Dewi Setiawan", email: "dewisetiawan@example.com", phoneNumber: "082345678901", location: { create: { kecamatan: "Tanjung Priok", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1985-09-20"), status: "Tersedia", considerations: [], expertises: ["Renovasi Rumah", "Desain Grafis"], pricePerDay: 120000, pricePerMonth: 2500000, pricePerHour: 11000 } } } })

  await prisma.user.create({ data: { id: `seed-3`, fullName: "Siti Rahayu", email: "sitirahayu@example.com", phoneNumber: "083456789012", location: { create: { kecamatan: "Tanjung Priok", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1988-12-10"), status: "Tersedia", considerations: [], expertises: ["Taman", "Arsitektur"], pricePerDay: 110000, pricePerMonth: 2100000, pricePerHour: 10500 } } } })

  await prisma.user.create({ data: { id: `seed-4`, fullName: "Rudi Susanto", email: "rudisusanto@example.com", phoneNumber: "084567890123", location: { create: { kecamatan: "Kelapa Gading", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1992-03-25"), status: "Tersedia", considerations: [], expertises: ["Lanskap", "Pembangunan Gedung"], pricePerDay: 105000, pricePerMonth: 2200000, pricePerHour: 10000 } } } })

  await prisma.user.create({ data: { id: `seed-5`, fullName: "Ani Pratiwi", email: "anipratiwi@example.com", phoneNumber: "085678901234", location: { create: { kecamatan: "Kelapa Gading", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1983-08-05"), status: "Tersedia", considerations: [], expertises: ["Desain Produk", "Interior"], pricePerDay: 95000, pricePerMonth: 1800000, pricePerHour: 9500 } } } })

  await prisma.user.create({ data: { id: `seed-6`, fullName: "Iwan Sutanto", email: "iwansutanto@example.com", phoneNumber: "086789012345", location: { create: { kecamatan: "Kelapa Gading", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1986-11-30"), status: "Tersedia", considerations: [], expertises: ["Desain Web", "Renovasi Bangunan"], pricePerDay: 115000, pricePerMonth: 2300000, pricePerHour: 10500 } } } })

  await prisma.user.create({ data: { id: `seed-7`, fullName: "Lina Wijaya", email: "linawijaya@example.com", phoneNumber: "087890123456", location: { create: { kecamatan: "Cilincing", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1989-07-18"), status: "Tersedia", considerations: [], expertises: ["Pengembangan Software", "Desain Arsitektur"], pricePerDay: 125000, pricePerMonth: 2400000, pricePerHour: 11000 } } } })

  await prisma.user.create({ data: { id: `seed-8`, fullName: "Hadi Nugroho", email: "hadinugroho@example.com", phoneNumber: "088901234567", location: { create: { kecamatan: "Cilincing", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1991-01-12"), status: "Tersedia", considerations: [], expertises: ["Desain Komunikasi Visual", "Pembuatan Video"], pricePerDay: 100000, pricePerMonth: 2000000, pricePerHour: 10000 } } } })

  await prisma.user.create({ data: { id: `seed-9`, fullName: "Rina Hartati", email: "rinahartati@example.com", phoneNumber: "089012345678", location: { create: { kecamatan: "Cilincing", kota: "Kota Adm. Jakarta Utara", provinsi: "DKI Jakarta" } }, mitra: { create: { allowOvernight: true, dateOfBirth: new Date("1984-06-22"), status: "Tersedia", considerations: [], expertises: ["Fotografi", "Desain Logo"], pricePerDay: 110000, pricePerMonth: 2200000, pricePerHour: 10500 } } } })

  return redirect('/')
}

export const dynamic = "force-dynamic"