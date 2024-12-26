import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const App = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  let navigate = useNavigate();

  const fetchData = async (filters) => {
    try {
      let paramsData = {};
      if (filters?.registration_number)
        paramsData = {
          ...paramsData,
          registration_number: filters?.registration_number,
        };
      if (filters?.owner_name)
        paramsData = {
          ...paramsData,
          owner_name: filters?.owner_name,
        };
      const response = await axios.get(
        "https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan",
        {
          params: paramsData,
        }
      );
      setData(response.data?.response_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onDeleteData = async () => {
    try {
      const response = await axios.delete(
        "https://datakendaraanapi-production-3037.up.railway.app/api/kendaraan",
        {
          params: {
            registration_number: selectedId,
          },
        }
      );

      if (response.data?.success) {
        alert("Data berhasil dihapus");
        setShowModal(false);
        setSelectedId(null);
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert(`Failed to delete data: ${error?.message}`);
    }
  };

  const confirmDelete = (registrationNumber) => {
    setSelectedId(registrationNumber);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Data Kendaraan</h1>

      {/* Form Pencarian */}
      <form
        onSubmit={handleSubmit(fetchData)}
        className="bg-orange-100 p-4 rounded-md mb-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Search by Registration Number
          </label>
          <input
            type="text"
            placeholder="Enter registration number"
            {...register("registration_number")}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Search by Owner Name
          </label>
          <input
            type="text"
            placeholder="Enter owner name"
            {...register("owner_name")}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Tombol Add */}
      <button
        onClick={() => navigate("/add")}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600"
      >
        Add New Vehicle
      </button>

      {/* Tabel Data */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Registration Number</th>
            <th className="border border-gray-300 px-4 py-2">Owner Name</th>
            <th className="border border-gray-300 px-4 py-2">Brand</th>
            <th className="border border-gray-300 px-4 py-2">Production Year</th>
            <th className="border border-gray-300 px-4 py-2">Cylinder Capacity</th>
            <th className="border border-gray-300 px-4 py-2">Color</th>
            <th className="border border-gray-300 px-4 py-2">Fuel</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.registration_number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.owner_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.brand}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.production_year}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.cilinder_capacity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.color_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.fuel}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => navigate(`/detail/${item.registration_number}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${item.registration_number}`)}
                    className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(item.registration_number)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Aksi</h2>
            <p>Anda yakin ingin menghapus data kendaraan ini?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Batal
              </button>
              <button
                onClick={onDeleteData}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
