"use server"

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { put } from '@vercel/blob';
import { createSingleton } from './utils';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';

const S3 = createSingleton('s3', () => new S3Client({ region: "ap-southeast-1" }))

/**
 * Get Upload URL (server function)
 * @param {string} pathAndKey 
 * @param {string} type 
 * @returns {Promise<string>}
 */
export async function getUploadURL(pathAndKey, type) {
  const command = new PutObjectCommand({ Bucket: 'carimitraart', Key: pathAndKey, ContentType: type })
  try {
    // Yes, you only have 10 seconds to upload the image.
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 10 })
    return signedUrl
  } catch (error) {
    console.log("Error getting presigned url (upload)")
    console.log(error)
    return null
  }
}

export async function getImageURL(pathAndKey) {
  const command = new GetObjectCommand({ Bucket: 'carimitraart', Key: pathAndKey })
  try {
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 10 })
    return signedUrl
  } catch (error) {
    console.log("Error getting presigned url (get)")
    console.log(error)
  }
}

export async function convertToWebp(form) {
  "use server"
  const file = form.get("image")
  const arrayBuffer = await file.arrayBuffer()
  const buffer = await sharp(arrayBuffer).webp({ quality: 80 }).resize({
    height: 320,
    width: 240,
    fit: "cover",
    withoutEnlargement: true
  }).toBuffer()
  return buffer.toString("binary")
}
