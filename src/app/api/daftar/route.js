import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { fullName, email, provinsi, kota, kecamatan, phoneNumber } =
      await request.json();

    // To check if the user already exists. But cannot do it right now because email is not unique in schema

    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (existingUser) {
    //   return NextResponse.error(400, "Email already exists");
    // }

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        phoneNumber,
        location: {
          create: {
            provinsi,
            kota,
            kecamatan,
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
