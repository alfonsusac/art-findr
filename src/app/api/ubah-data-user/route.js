import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserData } from "@/lib/auth";

export async function PATCH(request) {
  const userData = await getUserData(request);
  //   console.log(userData);
  try {
    const { fullName, location } = await request.json();

    if (fullName) {
      const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: {
          fullName: fullName,
        },
      });
      return NextResponse.json(
        { message: "Data berhasil dirubah", data: updatedUser },
        { status: 200 }
      );
    }

    if (location) {
      const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: {
          location: {
            update: {
              provinsi,
              kota,
              kecamatan,
            },
          },
        },
      });
      return NextResponse.json(
        { message: "Data berhasil dirubah", data: updatedUser },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error(500, error.message);
  }
}
