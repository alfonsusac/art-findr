import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/auth";

export async function POST(request) {
  const session = await getUserSession();
  try {
    const data = await request.json();

    const existingUsers = await prisma.user.findMany({
      where: {
        /**
         * Harus diubah jadi "AND", karena harus memenuhi kedua syarat.
         * Kalau OR, hanya salah satu yang terpenuhi.
         * Kalau email: "", berarti ambil semua user yang tidak ada email.
         * Kalau phoneNumber: "", berarti ambil semua user yang tidak ada phoneNumber
         * Kalau AND, dua dua nya mesti terpenuhi.
         * Kalau email: "" DAN phoneNumber: 123 -> ambil user yg phoneNumber cuma 123
         * Kalau email: asdf DAN phoneNumber: "" -> ambil user yang email: asdf
         * Kalau email: asdf ATAU phoneNumber: "" -> ambil semua user yang tidak ada phoneNumber... (salah)
         */
        OR: [
          { email: session?.email ?? "" },
          { phoneNumber: session?.phoneNumber ?? "" },
        ],
      },
    });

    // If a user with the same email or phone number already exists, return a 400 error
    if (existingUsers.length !== 0) {
      // return NextResponse.error(201, "Email or Phone already exists");
      return NextResponse.json(
        { message: "Email or Phone already exists" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        /**
         * Email dan PhoneNumber harus ambil dari session karena
         * data dari form bisa di palsukan. Sedangkan cookies TIDAK BISA DIPALSUKAN.
         * Dan jika tidak ada, default ke ""
         * email: session.email ?? "",
         * phoneNumber: session.phoneNumber ?? ""
         */
        email: session ? session.email : data.email,
        phoneNumber: session ? session.phoneNumber : data.phoneNumber,
        location: {
          create: {
            provinsi: data.provinsi,
            kota: data.kota,
            kecamatan: data.kecamatan,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error(500, error.message);
  }
}
