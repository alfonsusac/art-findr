import { getImageURL } from "./upload";

export async function getURLfotoDiri(id) {
  return getImageURL(`fotodiri/${id}.webp`)
}