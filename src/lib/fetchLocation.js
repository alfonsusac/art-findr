const BASE_URL = "https://ttnsy.github.io/api-wilayah-indonesia/api";

async function getListProvinsi() {
  const url = `${BASE_URL}/provinces.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

async function getListKotaKabupaten(idProvinsi) {
  const url = `${BASE_URL}/regencies/${idProvinsi}.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

async function getKecamatan(idKota) {
  const url = `${BASE_URL}/districts/${idKota}.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

async function getKelurahan(idKecamatan) {
  const url = `${BASE_URL}/villages/${idKecamatan}.json`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  if (!!res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

