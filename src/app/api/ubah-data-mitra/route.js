import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserData } from "@/lib/auth";
import { revalidatePath } from 'next/cache'

export async function PATCH(request) {
  const userData = await getUserData(request);
  console.log(userData);
  try {
    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: {
        mitra: {
          update: {
            ...data,
          },
        },
      },
    });
    revalidatePath('/')
    
    return NextResponse.json(
      { message: "Data berhasil dirubah", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Data gagal diubah" }, { status: 500 });
  }
}
