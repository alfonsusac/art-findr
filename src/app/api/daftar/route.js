import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/auth";

export async function POST(request) {
  const session = await getUserSession();
  try {
    const data = await request.formData();

    const existingUsers = await prisma.user.findMany({
      where: {
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
        fullName: data.get("fullName"),
        email: session ? session.email : data.get("email"),
        phoneNumber: String(data.get("phoneNumber")),
        location: {
          create: {
            provinsi: data.get("provinsi"),
            kota: data.get("kota"),
            kecamatan: data.get("kecamatan"),
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
