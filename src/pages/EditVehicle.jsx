import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const EditVehicleDetailPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { pid } = useParams();
  const navigate = useNavigate();
  const [vehicleDetails, setVehicleDetails] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan/${pid}`
      );
      const data = response.data?.response_data;
      if (data) {
        setVehicleDetails(data);
        // Set form default values
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data");
    }
  };

  const patchData = async (data) => {
    try {
      const response = await axios.patch(
        "https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan",
        {
          ...data,
          production_year: parseInt(data.production_year),
          cilinder_capacity: parseInt(data.cilinder_capacity),
        }
      );
      if (typeof response.data?.response_data === "object") {
        alert("Data berhasil diperbarui");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal memperbarui data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // `fetchData` is safe here as it's declared inside `useEffect`.

  const handleSave = async (data) => {
    patchData(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Detail Kendaraan</h2>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                No. Registrasi Kendaraan
              </label>
              <input
                type="text"
                {...register("registration_number", { required: "Nomor Registrasi Kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              />
              {errors.registration_number && (
                <p className="text-red-500 text-xs">{errors.registration_number.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Tahun Pembuatan</label>
              <input
                type="text"
                {...register("production_year", { required: "Tahun Pembuatan Kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              />
              {errors.production_year && (
                <p className="text-red-500 text-xs">{errors.production_year.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Nama Pemilik</label>
              <input
                type="text"
                {...register("owner_name", { required: "Pemilik Kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              />
              {errors.owner_name && (
                <p className="text-red-500 text-xs">{errors.owner_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Kapasitas Silinder</label>
              <input
                type="text"
                {...register("cilinder_capacity", { required: "Kapasitas Silinder Kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              />
              {errors.cilinder_capacity && (
                <p className="text-red-500 text-xs">{errors.cilinder_capacity.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Merk Kendaraan</label>
              <input
                type="text"
                {...register("brand", { required: "Merk Kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              />
              {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Warna Kendaraan</label>
              <select
                {...register("color_id", { required: "Warna kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              >
                <option value="">Pilih warna</option>
                <option value="Merah">Merah</option>
                <option value="Hitam">Hitam</option>
                <option value="Biru">Biru</option>
                <option value="Abu-Abu">Abu-Abu</option>
              </select>
              {errors.color_id && <p className="text-red-500 text-xs">{errors.color_id.message}</p>}
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 text-sm font-medium mb-1">Alamat Pemilik Kendaraan</label>
              <textarea
                {...register("owner_address", { required: "Alamat Pemilik kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 resize-none"
              />
              {errors.owner_address && (
                <p className="text-red-500 text-xs">{errors.owner_address.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Bahan Bakar</label>
              <input
                type="text"
                {...register("fuel", { required: "Bahan Bakar kendaraan wajib diisi" })}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              />
              {errors.fuel && <p className="text-red-500 text-xs">{errors.fuel.message}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-6 gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleDetailPage;
