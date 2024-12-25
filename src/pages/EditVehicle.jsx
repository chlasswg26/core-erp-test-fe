import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const EditVehicleDetailPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { pid } = useParams()
  const navigate = useNavigate()
  const [vehicleDetails, setVehicleDetails] = useState({});
  const fetchData = async (filters) => {
    try {
      const response = await axios.get(`https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan/${pid}`)
      setVehicleDetails(response.data?.response_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Data disimpan:", vehicleDetails);
    alert("Data berhasil disimpan!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Detail Kendaraan</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">No. Registrasi Kendaraan</label>
            <input
              type="text"
              name="registrationNumber"
              value={vehicleDetails.registration_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Tahun Pembuatan</label>
            <input
              type="text"
              name="manufactureYear"
              value={vehicleDetails.production_year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Nama Pemilik</label>
            <input
              type="text"
              name="ownerName"
              value={vehicleDetails.owner_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Kapasitas Silinder</label>
            <input
              type="text"
              name="cylinderCapacity"
              value={vehicleDetails.cylinder_capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Merk Kendaraan</label>
            <input
              type="text"
              name="vehicleBrand"
              value={vehicleDetails.vehicleBrand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Warna Kendaraan</label>
            <select
              name="vehicleColor"
              {...register("vehicleColor", { required: "Warna kendaraan wajib diisi" })}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            >
              <option>Pilih warna</option>
              <option value="Merah">Merah</option>
              <option value="Hitam">Hitam</option>
              <option value="Biru">Biru</option>
              <option value="Abu-Abu">Abu-Abu</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 text-sm font-medium mb-1">Alamat Pemilik Kendaraan</label>
            <textarea
              name="ownerAddress"
              value={vehicleDetails.ownerAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Bahan Bakar</label>
            <input
              type="text"
              name="fuelType"
              value={vehicleDetails.fuelType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Simpan
          </button>
          <button
            onClick={() => alert("Kembali ke halaman sebelumnya")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleDetailPage;
