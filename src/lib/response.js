import { NextRequest, NextResponse } from "next/server";

/**
 * Wrapper for NextResponse
 * @param {number} code 
 * @param {string} message 
 * @param {Object} data 
 * @returns 
 */
export function response(code, message, data) {
  return NextResponse.json({
    ...(() => {
      return message ? { message } : {}
    })(),
    ...(() => {
      return data ? { ...data } : {}
    })
  }, {
    status: code,
  })

}