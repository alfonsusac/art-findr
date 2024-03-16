import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param {NextRequest} req 
 */
export async function POST(req) {
  const data = await req.formData()
  // console.log(data)
  console.log(data.get('input1'))
  console.log(data.get('input2'))
  return NextResponse.json({ ok: "yes"})
}