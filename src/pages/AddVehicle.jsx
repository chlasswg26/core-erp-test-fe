import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const AddVehiclePage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const url = 'https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan';

  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(url, {
        brand: data.vehicleBrand,
        fuel: data.fuelType,
        registration_number: data.registrationNumber,
        owner_name: data.ownerName,
        production_year: parseInt(data.manufactureYear),
        cilinder_capacity: parseInt(data.cylinderCapacity),
        color_id: data.vehicleColor,
        owner_address: data.ownerAddress
      });

      console.log('Response:', response.data);
      alert('Data kendaraan berhasil ditambahkan!');
      reset();
      navigate("/");
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Gagal menambahkan data kendaraan');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tambah Data Kendaraan</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">No. Registrasi Kendaraan</label>
            <input
              type="text"
              name="registrationNumber"
              {...register("registrationNumber", { required: "No. Registrasi wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Masukkan nomor registrasi"
            />
            {errors.registrationNumber && <p className="text-red-500 text-xs">{errors.registrationNumber.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Tahun Pembuatan</label>
            <input
              type="number"
              name="manufactureYear"
              {...register("manufactureYear", { required: "Tahun pembuatan wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Masukkan tahun pembuatan"
            />
            {errors.manufactureYear && <p className="text-red-500 text-xs">{errors.manufactureYear.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Nama Pemilik</label>
            <input
              type="text"
              name="ownerName"
              {...register("ownerName", { required: "Nama pemilik wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Masukkan nama pemilik"
            />
            {errors.ownerName && <p className="text-red-500 text-xs">{errors.ownerName.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Kapasitas Silinder</label>
            <input
              type="number"
              name="cylinderCapacity"
              {...register("cylinderCapacity", { required: "Kapasitas silinder wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Masukkan kapasitas silinder"
            />
            {errors.cylinderCapacity && <p className="text-red-500 text-xs">{errors.cylinderCapacity.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Merk Kendaraan</label>
            <input
              type="text"
              name="vehicleBrand"
              {...register("vehicleBrand", { required: "Merk kendaraan wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Masukkan merk kendaraan"
            />
            {errors.vehicleBrand && <p className="text-red-500 text-xs">{errors.vehicleBrand.message}</p>}
          </div>
          <div>
            <label class="block text-gray-600 text-sm font-medium mb-1">Warna Kendaraan</label>
            <select
              name="vehicleColor"
              {...register("vehicleColor", { required: "Warna kendaraan wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
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
              name="ownerAddress"
              {...register("ownerAddress", { required: "Alamat pemilik wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 resize-none"
              placeholder="Masukkan alamat pemilik"
            />
            {errors.ownerAddress && <p className="text-red-500 text-xs">{errors.ownerAddress.message}</p>}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Bahan Bakar</label>
            <input
              type="text"
              name="fuelType"
              {...register("fuelType", { required: "Bahan bakar wajib diisi" })}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
              placeholder="Masukkan jenis bahan bakar"
            />
            {errors.fuelType && <p className="text-red-500 text-xs">{errors.fuelType.message}</p>}
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehiclePage;
