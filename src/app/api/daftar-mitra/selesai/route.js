import { getUserData } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/upload-client";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 */
export async function POST(req) {
  const userData = await getUserData();
  const data = await req.formData();

  const dateOfBirth = new Date(data.get("tanggal-lahir"));

  const expertises = JSON.parse(data.get("keterampilan"));
  const considerations = [data.get("kebutuhan-khusus")];

  const fotoDiri = data.get("foto-diri");
  const fotoKTP = data.get("foto-ktp");

  await prisma.calonMitra.update({
    where: {
      userId: userData.id,
    },
    data: {
      allowOvernight: true,
      considerations,
      expertises,
      dateOfBirth,
      isFotoDiri: !!fotoDiri.name,
      isFotoKTP: !!fotoKTP.name,
    },
  });

  const calonMitra = await prisma.calonMitra.findUnique({
    where: {
      userId: userData.id,
    },
  });

  if (!calonMitra) {
    return response(401, "Bukan calon mitra!");
  }

  if (Object.values(calonMitra).every((x) => x === null || x.length === 0)) {
    return response(400, "Data belum lengkap!");
  }

  try {
    if (!!calonMitra.isFotoDiri) {
      await uploadImage(fotoDiri, `/fotodiri/${userData.id}`);
    }
    if (!!calonMitra.isFotoKTP) {
      await uploadImage(fotoKTP, `/fotoKTP/${userData.id}`);
    }
  } catch (error) {
    throw new Error("Error uploading image!");
  }

  try {
    const createMitra = prisma.mitra.create({
      data: {
        dateOfBirth: calonMitra.dateOfBirth,
        allowOvernight: true,
        status: "Tersedia",
        userId: calonMitra.userId,
        considerations: calonMitra.considerations,
        expertises: calonMitra.expertises,
        pricePerDay: calonMitra.pricePerDay,
        pricePerHour: calonMitra.pricePerHour,
        pricePerMonth: calonMitra.pricePerMonth,
      },
    });

    const deleteCalonMitra = prisma.calonMitra.delete({
      where: {
        userId: userData.id,
      },
    });

    const transaction = await prisma.$transaction([
      createMitra,
      deleteCalonMitra,
    ]);

    return NextResponse.json({ status: 200, body: "Berhasil" });
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    return NextResponse.json({ status: 500, body: "error dari server" });
  }
}
