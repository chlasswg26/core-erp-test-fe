import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const VehicleDetailPage = () => {
  const [data, setData] = useState({})
  const { pid } = useParams()
  const navigate = useNavigate()
  const fetchData = async (filters) => {
    try {
      const response = await axios.get(`https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan/${pid}`)
      setData(response.data?.response_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Detail Kendaraan</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">No. Registrasi Kendaraan</label>
            <input
              type="text"
              value={data?.registration_number}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Tahun Pembuatan</label>
            <input
              type="text"
              value={data?.production_year}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Nama Pemilik</label>
            <input
              type="text"
              value={data?.owner_name}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Kapasitas Silinder</label>
            <input
              type="text"
              value={data?.fuel}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Merk Kendaraan</label>
            <input
              type="text"
              value={data?.brand}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Warna Kendaraan</label>
            <input
              type="text"
              value={data?.color_id}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 text-sm font-medium mb-1">Alamat Pemilik Kendaraan</label>
            <textarea
              value={data?.owner_address}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800 resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Bahan Bakar</label>
            <input
              type="text"
              value={data?.fuel}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-800"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <button onClick={() => navigate("/")} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Kembali</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
