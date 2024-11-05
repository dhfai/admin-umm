'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

const CreateSchedule = () => {
  const [newData, setNewData] = useState({
    id: "",
    instansi: "",
    tarif: "",
    start: "",
    end: "",
    status: "",
  });
  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instansi: newData.instansi,
          tarif: parseInt(newData.tarif, 10),
          startDate: new Date(newData.start).toISOString(),
          endDate: new Date(newData.end).toISOString(),
          status: newData.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add new data");
      }

      const result = await response.json();
      console.log("Successfully added:", result);

      router.push('/');

    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg border p-8 w-full max-w-lg animate-fadeIn">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Instansi */}
          <div className="relative">
            <label htmlFor="instansi" className="block text-sm font-medium text-gray-700">
              Instansi
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-1">
              <span className="p-2 text-gray-600">
                <FaBuilding />
              </span>
              <input
                type="text"
                id="instansi"
                name="instansi"
                value={newData.instansi}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan Nama Instansi"
              />
            </div>
          </div>

          {/* Tarif */}
          <div className="relative">
            <label htmlFor="tarif" className="block text-sm font-medium text-gray-700">
              Tarif
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-1">
              <span className="p-2 text-gray-600">
                <FaDollarSign />
              </span>
              <input
                type="number"
                id="tarif"
                name="tarif"
                value={newData.tarif}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tarif"
              />
            </div>
          </div>

          {/* Date Start */}
          <div className="relative">
            <label htmlFor="start" className="block text-sm font-medium text-gray-700">
              Date Start
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-1">
              <span className="p-2 text-gray-600">
                <FaCalendarAlt />
              </span>
              <input
                type="date"
                id="start"
                name="start"
                value={newData.start}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date End */}
          <div className="relative">
            <label htmlFor="end" className="block text-sm font-medium text-gray-700">
              Date End
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-1">
              <span className="p-2 text-gray-600">
                <FaCalendarAlt />
              </span>
              <input
                type="date"
                id="end"
                name="end"
                value={newData.end}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-lg p-2.5 transition-all duration-300 transform hover:bg-blue-700 hover:scale-105"
          >
            Tambahkan
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedule;
