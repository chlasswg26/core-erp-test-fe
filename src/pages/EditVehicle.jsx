import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const EditVehicleDetailPage = () => {
  const { register, formState: { errors } } = useForm();
  const { pid } = useParams()
  const navigate = useNavigate()
  const [vehicleDetails, setVehicleDetails] = useState({});
  const fetchData = async (filters) => {
    try {
      const response = await axios.get(`https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan/${pid}`)
      setVehicleDetails(response.data?.response_data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data")
    }
  };
  const patchData = async (data) => {
    try {
      const response = await axios.patch("https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan", {
        brand: data.brand,
        fuel: data.fuel,
        registration_number: data.registration_number,
        owner_name: data.owner_name,
        production_year: parseInt(data.production_year),
        cilinder_capacity: parseInt(data.cilinder_capacity),
        color_id: data.color_id,
        owner_address: data.owner_address
      })
      if (typeof response.data?.response_data === 'object') {
        alert("Data berhasil diperbarui")
        navigate("/")
      }
    } catch (error) {
      alert("Gagal memperbarui data")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleSave = async () => {
    patchData(vehicleDetails)
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
              name="registration_number"
              {...register("registration_number", { required: "Nomor Registrasi Kendaraan wajib diisi" })}
              value={vehicleDetails?.registration_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {errors.registration_number && <p className="text-red-500 text-xs">{errors.registration_number.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Tahun Pembuatan</label>
            <input
              type="text"
              name="production_year"
              {...register("production_year", { required: "Tahun Pembuatan Kendaraan wajib diisi" })}
              value={vehicleDetails?.production_year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {errors.production_year && <p className="text-red-500 text-xs">{errors.production_year.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Nama Pemilik</label>
            <input
              type="text"
              name="owner_name"
              {...register("owner_name", { required: "Pemilik Kendaraan wajib diisi" })}
              value={vehicleDetails?.owner_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {errors.owner_name && <p className="text-red-500 text-xs">{errors.owner_name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Kapasitas Silinder</label>
            <input
              type="text"
              name="cilinder_capacity"
              {...register("cilinder_capacity", { required: "Kapasitas Silinder Kendaraan wajib diisi" })}
              value={vehicleDetails?.cilinder_capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {errors.cilinder_capacity && <p className="text-red-500 text-xs">{errors.cilinder_capacity.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Merk Kendaraan</label>
            <input
              type="text"
              name="brand"
              {...register("brand", { required: "Merk Kendaraan wajib diisi" })}
              value={vehicleDetails?.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
          </div>
          <div>
            <label class="block text-gray-600 text-sm font-medium mb-1">Warna Kendaraan</label>
            <select
              name="color_id"
              onChange={handleChange}
              {...register("color_id", { required: "Warna kendaraan wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              defaultValue={vehicleDetails?.color_id}
            >
              <option value="">Pilih warna</option>
              <option value="Merah">Merah</option>
              <option value="Hitam">Hitam</option>
              <option value="Biru">Biru</option>
              <option value="Abu-Abu">Abu-Abu</option>
            </select>
            {errors?.vehicleColor && (
              <p className="text-red-500 text-xs">{errors.vehicleColor.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 text-sm font-medium mb-1">Alamat Pemilik Kendaraan</label>
            <textarea
              name="owner_address"
              {...register("owner_address", { required: "Alamat Pemilik kendaraan wajib diisi" })}
              value={vehicleDetails?.owner_address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 resize-none"
            />
            {errors.owner_address && <p className="text-red-500 text-xs">{errors.owner_address.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Bahan Bakar</label>
            <input
              type="text"
              name="fuel"
              {...register("fuel", { required: "Bahan Bakar kendaraan wajib diisi" })}
              value={vehicleDetails?.fuel}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {errors.fuel && <p className="text-red-500 text-xs">{errors.fuel.message}</p>}
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
            onClick={() => navigate("/")}
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
