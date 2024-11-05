"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Spinner = () => (
  <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20">
    <style>
      {`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spin {
          transform-origin: center;
          animation: spin 0.9s ease-in-out infinite;
        }
      `}
    </style>
    <circle
      className="spin"
      cx="400"
      cy="400"
      fill="none"
      r="106"
      strokeWidth="38"
      stroke="#000"
      strokeDasharray="474 1400"
      strokeLinecap="round"
    />
  </svg>
);

interface TableProps {
  id: string;
  instansi: string;
  tarif: string;
  start: string;
  end: string;
}

const Table = () => {
  const [dataNews, setDataNews] = useState<TableProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setDataNews(
          result.map((item: any) => ({
            id: item.id,
            instansi: item.instansi,
            tarif: item.tarif,
            start: item.startDate,
            end: item.endDate,
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const response = await fetch("/api/news", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemToDelete,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

    //   const result = await response.json();
    //   console.log("Successfully deleted:", result);

      // Refresh the data after deletion
      const responseFetch = await fetch("/api/news");
      if (!responseFetch.ok) {
        throw new Error("Failed to fetch data");
      }

      const resultFetch = await responseFetch.json();
      setDataNews(
        resultFetch.map((item: any) => ({
          id: item.id,
          instansi: item.instansi,
          tarif: item.tarif,
          start: item.startDate,
          end: item.endDate,
        })),
      );

      setIsModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex flex-col bg-white border border-dashed border-stone-200 rounded-[.95rem] m-5">
            <div className="flex-auto block py-8 px-9">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex justify-center items-center text-center h-32">
                    <Spinner />
                    <span className="text-black">Loading...</span>
                  </div>
                ) : dataNews.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600">Tidak ada data untuk ditampilkan.</p>
                  </div>
                ) : (
                  <table className="min-w-full text-dark border-neutral-200">
                    <thead>
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">INSTANSI PENYEWA</th>
                        <th className="pb-3 text-end min-w-[100px]">TARIF</th>
                        <th className="pb-3 text-end min-w-[100px]">AWAL</th>
                        <th className="pb-3 text-end min-w-[100px]">AKHIR</th>
                        <th className="pb-3 text-end min-w-[50px]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataNews.map((data) => (
                        <tr key={data.id} className="border-b border-neutral-200">
                          <td className="py-3 text-start">{data.instansi}</td>
                          <td className="py-3 text-end">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(Number(data.tarif))}
                          </td>
                          <td className="py-3 text-end">{formatDate(data.start)}</td>
                          <td className="py-3 text-end">{formatDate(data.end)}</td>
                          <td className="py-3 text-end">
                            <button
                              onClick={() => handleDelete(data.id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Table;
