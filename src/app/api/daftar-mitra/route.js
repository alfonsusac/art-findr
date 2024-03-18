import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { getUserData } from "@/lib/auth";

export async function POST(req) {
  try {
    const userData = getUserData();
    // const datas = await req.json();
    console.log(userData.id);

    const res = await prisma.calonMitra.create({
      data: {
        userId: userData.id,
      },
    });

    return NextResponse.json({ status: 200, body: res });
  } catch (error) {
    return NextResponse.json({ status: 500, body: res });
  }
}
