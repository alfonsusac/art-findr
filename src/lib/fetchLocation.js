const BASE_URL = "https://wilayah.id/api/";

export async function getListProvinsi() {
  const url = `${BASE_URL}/provinces.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data.data;
  } else {
    throw new Error(`Error ${res.status} fetching from ${url}`);
  }
}

export async function getListKotaKabupaten(idProvinsi) {
  const url = `${BASE_URL}/regencies/${idProvinsi}.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data.data;
  } else {
    throw new Error(`Error ${res.status} fetching from ${url}`);
  }
}

export async function getKecamatan(idKota) {
  const url = `${BASE_URL}/districts/${idKota}.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data.data;
  } else {
    throw new Error(`Error ${res.status} fetching from ${url}`);
  }
}
