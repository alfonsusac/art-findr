import { getUserData } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { debug } from "console";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 */
export async function POST(req) {
  const timeNow = new Date();
  const data = await req.json();
  try {
    await prisma.verifikasiOtp.create({
      data: {
        nomorHandphone: data.nomorHandphone,
        otp: Number(data.otp),
        createdAt: new Date(),
      },
    });
    return NextResponse.json({ status: 200, body: "Berhasil" });
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    return NextResponse.json({ status: 500, body: "error dari server" });
  }
}
