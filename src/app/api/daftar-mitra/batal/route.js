import { getUserData } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { response } from "@/lib/response";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 */
export async function DELETE(req) {
  try {
    const userData = await getUserData();
    const deleteCalonMitra = await prisma.calonMitra.delete({
      where: {
        userId: userData.id,
      },
    });

    return response(200, "berhasil");
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    return response(500, "error dari server");
  }
}
