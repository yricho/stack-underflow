"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  deleteAccomodation,
  getAccomodations,
} from "../../../services/accomodation";

import {
  BookOpen,
  GraduationCap,
  Trash2,
  Eye,
  Plus,
  Users,
  Sparkles,
} from "lucide-react";

export default function RaportSekolahMingguList() {
  const [raportData, setRaportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const data = await getAccomodations("sekolahminggu");

      setRaportData(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus raport ini?");

    if (!confirmDelete) return;

    await deleteAccomodation("sekolahminggu", id);

    setRaportData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
                <GraduationCap size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Data Raport Sekolah Minggu
                </h1>

                <p className="text-gray-500">
                  Laporan hasil belajar anak per semester
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              Total Data: {raportData.length}
            </div>
          </div>

          <Link
            to="/createreport"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-2xl font-semibold shadow-sm"
          >
            <Plus size={18} />
            Tambah Raport
          </Link>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="bg-white rounded-3xl border p-12 text-center">
            <div className="animate-pulse text-lg text-gray-500">
              Loading data...
            </div>
          </div>
        ) : raportData.length === 0 ? (
          <div className="bg-white rounded-3xl border p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <BookOpen size={40} className="text-gray-400" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Belum ada data raport
            </h2>

            <p className="text-gray-500 mb-5">
              Tambahkan data raport sekolah minggu terlebih dahulu
            </p>

            <Link
              to="/createreport"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl transition"
            >
              <Plus size={18} />
              Tambah Raport
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {raportData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* TOP */}
                <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 capitalize">
                        {item.nama || "-"}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {item.jenjang || "-"}
                        </span>

                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {item.sektor || "-"}
                        </span>

                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                          {item.semester || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
                      <Sparkles size={22} />
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-5">
                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Pengetahuan</p>

                      <p className="text-2xl font-bold text-blue-600">
                        {Object.keys(item.pengetahuan || {}).length}
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Sikap</p>

                      <p className="text-2xl font-bold text-green-600">
                        {Object.keys(item.sikap || {}).length}
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">
                      <p className="text-sm text-gray-500 mb-1">Keterampilan</p>

                      <p className="text-2xl font-bold text-purple-600">
                        {Object.keys(item.keterampilan || {}).length}
                      </p>
                    </div>
                  </div>

                  {/* KEHADIRAN */}
                  <div className="bg-gray-50 rounded-2xl p-4 border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Hadir</span>

                      <span className="font-bold text-green-600">
                        {item.hadirSmtpi || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-500">Alpa</span>

                      <span className="font-bold text-red-600">
                        {item.alpaSmtpi || 0}
                      </span>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="flex gap-3 pt-2">
                    <Link
                      to={`/report/${item.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-2xl font-semibold"
                    >
                      <Eye size={18} />
                      Detail
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 transition text-red-600 px-5 rounded-2xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
