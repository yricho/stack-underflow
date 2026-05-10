"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  User,
  Sparkles,
  ClipboardCheck,
  BadgeCheck,
} from "lucide-react";
import { getAccomodationById } from "../../../services/accomodation";

export default function RaportSekolahMingguDetail() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadDetail(id);
    }
  }, [id]);

  const loadDetail = async (id: string) => {
    try {
      setLoading(true);

      const result = await getAccomodationById("sekolahminggu", id);

      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPredikatColor = (predikat: string) => {
    switch (predikat) {
      case "A":
        return "bg-green-100 text-green-700 border-green-200";
      case "B":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "C":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "K":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const renderSection = (title: string, values: any, icon: React.ReactNode) => {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
            {icon}
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        {Object.entries(values || {}).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(values || {}).map(([key, value]: any) => (
              <div
                key={key}
                className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">{key}</h3>

                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPredikatColor(
                      value?.predikat,
                    )}`}
                  >
                    {value?.predikat || "-"}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Komentar</p>

                  <p className="text-gray-700 leading-relaxed">
                    {value?.komentar || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 bg-gray-50 border rounded-xl p-4">
            Tidak ada data
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-medium text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            Data tidak ditemukan
          </p>

          <Link
            to="/report"
            className="inline-flex items-center gap-2 mt-3 bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            <ArrowLeft size={18} />
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
                <BookOpen size={26} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Detail Raport Sekolah Minggu
                </h1>

                <p className="text-gray-500">
                  Data hasil belajar dan perkembangan anak
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/report"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-2xl transition"
          >
            <ArrowLeft size={18} />
            Kembali
          </Link>
        </div>

        {/* INFORMASI ANAK */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
              <User size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Informasi Anak</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-2xl p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Nama Anak</p>

              <p className="font-semibold text-lg text-gray-800">
                {data.nama || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Nomor Induk</p>

              <p className="font-semibold text-lg text-gray-800">
                {data.nomorInduk || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Jenjang</p>

              <p className="font-semibold text-lg text-gray-800 capitalize">
                {data.jenjang || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Sektor</p>

              <p className="font-semibold text-lg text-gray-800 capitalize">
                {data.sektor || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-gray-50 md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Semester</p>

              <p className="font-semibold text-lg text-gray-800">
                {data.semester || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* KEHADIRAN */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 text-green-600 p-2 rounded-xl">
              <ClipboardCheck size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Rekap Kehadiran
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-2xl p-5 bg-green-50">
              <p className="text-sm text-gray-500">Hadir</p>

              <p className="text-3xl font-bold text-green-600">
                {data.hadirSmtpi || 0}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-red-50">
              <p className="text-sm text-gray-500">Alpa</p>

              <p className="text-3xl font-bold text-red-600">
                {data.alpaSmtpi || 0}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-yellow-50">
              <p className="text-sm text-gray-500">Izin</p>

              <p className="text-3xl font-bold text-yellow-600">
                {data.izinSmtpi || 0}
              </p>
            </div>

            <div className="border rounded-2xl p-5 bg-blue-50">
              <p className="text-sm text-gray-500">Sakit</p>

              <p className="text-3xl font-bold text-blue-600">
                {data.sakitSmtpi || 0}
              </p>
            </div>
          </div>
        </div>

        {/* PENGETAHUAN */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          {renderSection(
            "Pengetahuan",
            data.pengetahuan,
            <BookOpen size={20} />,
          )}
        </div>

        {/* SIKAP */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          {renderSection("Sikap", data.sikap, <BadgeCheck size={20} />)}
        </div>

        {/* KETERAMPILAN */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          {renderSection(
            "Keterampilan",
            data.keterampilan,
            <Sparkles size={20} />,
          )}
        </div>
      </div>
    </div>
  );
}
