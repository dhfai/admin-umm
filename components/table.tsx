'use client'

import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

interface TableProps {
    id: string;
    instansi: string;
    tarif: string;
    start: string;
    end: string;
    status: string;
}


const Table = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataNews, setDataNews] = useState<TableProps[]>([]);
    const [newData, setNewData] = useState<TableProps>({
        id: '',
        instansi: '',
        tarif: '',
        start: '',
        end: '',
        status: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                throw new Error('Failed to add new data');
            }

            const result = await response.json();
            console.log('Successfully added:', result);


            setNewData({
                id: '0',
                instansi: '',
                tarif: '',
                start: '',
                end: '',
                status: '',
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                console.log('Fetched data:', result);

                setDataNews(result.map((item: any) => ({
                    id: item.id,
                    instansi: item.instansi,
                    tarif: item.tarif,
                    start: item.startDate,
                    end: item.endDate,
                    status: item.status,
                })));

                // setDataNews(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[''])


    const handleDelete = async (id: string) => {
        try {
            const response = await fetch('/api/news', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete data');
            }

            const result = await response.json();
            console.log('Successfully deleted:', result);

            const responseFetch = await fetch('/api/news');
            if (!responseFetch.ok) {
                throw new Error('Failed to fetch data');
            }

            const resultFetch = await responseFetch.json();
            console.log('Fetched data:', resultFetch);

            setDataNews(resultFetch.map((item: any) => ({
                id: item.id,
                instansi: item.instansi,
                tarif: item.tarif,
                start: item.startDate,
                end: item.endDate,
                status: item.status,
            })));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB');
    };



    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full max-w-full px-3 mb-6 mx-auto">
                    <div className="relative flex flex-col bg-white border border-dashed border-stone-200 rounded-[.95rem] m-5">
                        <div className="px-9 pt-5 flex justify-between items-stretch min-h-[70px] pb-0 bg-transparent">
                            <h3 className="flex flex-col items-start m-2 font-medium text-xl text-dark">
                                <span className="font-semibold text-dark">Dashboard</span>
                            </h3>
                            <div className="my-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-[.925rem] flex text-center items-center font-medium text-center rounded-2xl py-2 px-5 text-light-inverse bg-light-dark border-0 hover:bg-secondary active:bg-light focus:bg-light"
                                >
                                    <LuPlus /> Tambah Data
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto block py-8 px-9">
                            <div className="overflow-x-auto">
                                <table className="w-full text-dark border-neutral-200">
                                    <thead>
                                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                            <th className="pb-3 text-start min-w-[175px]">INSTANSI PENYEWA</th>
                                            <th className="pb-3 text-end min-w-[100px]">TARIF</th>
                                            <th className="pb-3 text-end min-w-[100px]">AWAL</th>
                                            <th className="pb-3 text-end min-w-[100px]">AKHIR</th>
                                            <th className="pb-3 text-end min-w-[100px]">STATUS</th>
                                            <th className="pb-3 text-end min-w-[50px]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataNews.map((data) => (
                                            <tr key={data.id} className="border-b border-neutral-200">
                                                <td className="py-3 text-start">{data.instansi}</td>
                                                <td className="py-3 text-end">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                    }).format(Number(data.tarif))}

                                                </td>
                                                <td className="py-3 text-end">{formatDate(data.start)}</td>
                                                <td className="py-3 text-end">{formatDate(data.end)}</td>
                                                <td className="py-3 text-end">{data.status}</td>
                                                <td className="py-3 text-end">
                                                    <button onClick={() => handleDelete(data.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Tambah Data Informasi</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Instansi</label>
                                <input
                                    type="text"
                                    name="instansi"
                                    value={newData.instansi}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Tarif</label>
                                <input
                                    type="text"
                                    name="tarif"
                                    value={newData.tarif}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="start"
                                    value={newData.start}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="end"
                                    value={newData.end}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Status</label>
                                <input
                                    type="text"
                                    name="status"
                                    value={newData.status}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-2 bg-gray-300 text-gray-800 rounded px-4 py-2"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
