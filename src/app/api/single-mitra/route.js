import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { searchParams }) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log("id", id);

    if (!id) {
      return NextResponse.json({
        status: 400,
        body: { message: "id is required" },
      });
    }
    const res = await prisma.user.findUnique({
      where: {
        id,
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
