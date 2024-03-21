import { getImageURL } from "./upload";

export async function getURLfotoDiri(id) {
  return getImageURL(`fotodiri/${id}.webp`)
}
export async function getURLfotoKTP(id) {
  return getImageURL(`fotoKTP/${id}.webp`)
}