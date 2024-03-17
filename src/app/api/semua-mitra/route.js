import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const res = await prisma.user.findMany({
      where: {
        mitra: {
          isNot: null,
        },
      },
      include: {
        mitra: true,
        location: true,
      },
    });
    return NextResponse.json({ status: 200, body: res });
  } catch (error) {
    console.error(error);
  }
}
