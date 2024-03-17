import React from "react";

export const DashboardMitra = ({ mitra }) => {
  return (
    <main>
      <h1>Dashboard Mitra</h1>
      <div className="space-y-3">
        <div>
          <p>Expertise : {mitra.expertises}</p>
          <a href="/akun/ubah-expertise" className="text-rose-400">
            Edit Keterampilan
          </a>
        </div>
        <div>
          <p>Consideration : {mitra.considerations}</p>
          <a href="/akun/ubah-kebutuhan" className="text-rose-400">
            Edit Kebutuhan
          </a>
        </div>

        <p>Status : {mitra.status}</p>
        <p>Price per Hour : {mitra.pricePerHour?.toString()}</p>
        <p>Price per Day : {mitra.pricePerDay?.toString()}</p>
        <p>Price per Month : {mitra.pricePerMonth?.toString()}</p>
        <div>
          <p>Date of Birth: {mitra.dateOfBirth.toString()}</p>
          <a href="/akun/ubah-tgl-lahir" className="text-rose-400">
            Ubah Tgl Lahir
          </a>
        </div>

        <p>Menginap : {mitra.allowOvernight}</p>
      </div>
    </main>
  );
};
