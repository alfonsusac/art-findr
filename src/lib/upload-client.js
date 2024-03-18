import { convertToWebp, getUploadURL } from "./upload";

/**
 * 
 * @param {Blob} data 
 * @param {string} filepath 
 * @returns {Promise<string>}
 */
export async function upload(data, filepath) {
  const uploadURL = await getUploadURL(filepath)
  if (!uploadURL) throw new Error('Something went wrong when fetching presigned URL')
  await fetch(uploadURL, { method: "PUT", body: data })
  // does this work with protected buckets?
  console.log(uploadURL)
  return uploadURL.split('?')[0] // returns image url
}

/**
 * 
 * @param {Blob} img 
 * @param {`${string}.webp`} path 
 * @returns {Promise<string>}
 */
export async function uploadImage(img, path) {
  // if (img.type !== "image/png")
  //   throw new Error("Error uploading as Webp: only png is supported")
  const formData = new FormData
  formData.append("image", img)
  const webpBufferString = await convertToWebp(formData)
  const webpBlob = new Blob([Buffer.from(webpBufferString, "ascii")], { type: "image/webp" })
  const imgurl = await upload(webpBlob, path)
  return imgurl
}