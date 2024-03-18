import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  const { id, mitraValue } = await request.json();
  console.log(id, mitraValue);
  try {
    const updatedData = await prisma.mitra.update({
      where: {
        userId: id,
      },
      data: {
        status: mitraValue,
      },
    });
    return NextResponse.json(
      { message: "Data berhasil diubah", data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error(500, error.message);
  }
}
