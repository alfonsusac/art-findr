// Server Only Function

/**
 * @typedef {{
 *    code: string,
 *    name: string,
 *    coordinates: {
 *      lat: string,
 *      lng: string,
 *    },
 *    google_place_id: string
 * }} Provinsi
 */
/**
 * @typedef {{
 *    code: `${string}.${string}`,
 *    name: string,
 *    coordinates: {
 *      lat: string,
 *      lng: string,
 *    },
 *    google_place_id: string
 * }} Kabupaten
 */
/**
 * @typedef {{
 *    code: `${string}.${string}.${string}`,
 *    name: string,
 *    coordinates: {
 *      lat: string,
 *      lng: string,
 *    },
 *    google_place_id: string
 * }} Kecamatan
 */


/**
 * Get List of Provinsi
 * @returns {Promise<Provinsi[]>}
 */
export async function getListProvinsi() {
  const res = await fetch('https://wilayah.id/api/provinces.json')
  return (await res.json()).data
}

/**
 * 
 * @param {string} kodeProvinsi 
 * @returns {Promise<Provinsi | undefined>}
 */
export async function getProvinsi(kodeProvinsi) {
  if(!kodeProvinsi) return
  const list = await getListProvinsi()
  return list.find(p => p.code === kodeProvinsi)
}

/**
 * Get List of Kota/Kabupaten
 * @param {string} kodeProvinsi 
 * @returns {Promise<Kabupaten[] | undefined>}
 */
export async function getListKotaKabupaten(kodeProvinsi) {
  if (!kodeProvinsi) return
  const provinsi = await getProvinsi(kodeProvinsi)
  if (!provinsi) return
  const res = await fetch(`https://wilayah.id/api/regencies/${provinsi.code}.json`)
  return (await res.json()).data
}

/**
 * 
 * @param {`${string}.${string}`} kodeKabupaten 
 * @returns {Promise<Kabupaten | undefined>}
 */
export async function getKotaKabupaten(kodeKabupaten) {
  if (!kodeKabupaten) return
  const kodeProvinsi = kodeKabupaten.split('.')[0]
  const kabupatenList = await getListKotaKabupaten(kodeProvinsi)
  if (!kabupatenList) return
  return kabupatenList.find(kab => kab.code === kodeKabupaten)
}

/**
 * Get List of Kota/Kabupaten
 * @param {`${string}.${string}`} kodeKabupaten 
 * @returns {Promise<Kecamatan[] | undefined>}
 */
export async function getListKecamatan(kodeKabupaten) {
  if (!kodeKabupaten) return
  const kodeProvinsi = kodeKabupaten.split('.')[0]
  const provinsi = await getProvinsi(kodeProvinsi)
  if (!provinsi) return
  const kabupaten = await getKotaKabupaten(kodeKabupaten)
  if (!kabupaten) return
  const res = await fetch(`https://wilayah.id/api/districts/${kabupaten.code}.json`)
  return (await res.json()).data
}

/**
 * Get List of Kota/Kabupaten
 * @param {`${string}.${string}.${string}`} kodeKecamatan 
 * @returns {Promise<Kecamatan | undefined>}
 */
export async function getKecamatan(kodeKecamatan) {
  if (!kodeKecamatan) return
  const kodeKabupaten = kodeKecamatan.split('.').slice(0, 2).join('.')
  const listKecamatan = await getListKecamatan(kodeKabupaten)
  if (!listKecamatan) return
  return listKecamatan.find(kec => kec.code === kodeKecamatan)
}