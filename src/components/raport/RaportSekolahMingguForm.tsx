"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { postAccomodation } from "../../../services/accomodation";

import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Save,
  Sparkles,
  User,
  ArrowLeft,
} from "lucide-react";

export default function RaportSekolahMingguForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const [form, setForm] = useState<any>({
    nama: "",
    nomorInduk: "",
    jenjang: "",
    sektor: "",
    semester: "Semester I",

    pengetahuan: {},
    sikap: {},
    keterampilan: {},

    hadirSmtpi: "",
    alpaSmtpi: "",
    izinSmtpi: "",
    sakitSmtpi: "",

    hadirTpi: "",
    alpaTpi: "",
    izinTpi: "",
    sakitTpi: "",
  });

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const errorClass = "border-red-500 focus:ring-red-500 focus:border-red-500";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleNestedChange = (
    category: string,
    field: string,
    key: string,
    value: string,
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: {
          ...prev[category]?.[field],
          [key]: value,
        },
      },
    }));

    setErrors((prev: any) => ({
      ...prev,
      [`${category}-${field}`]: "",
      [`${category}-komentar-${field}`]: "",
    }));
  };

  const validateForm = () => {
    let newErrors: any = {};

    // IDENTITAS
    if (!form.nama.trim()) {
      newErrors.nama = "Nama anak wajib diisi";
    }

    if (!form.nomorInduk.trim()) {
      newErrors.nomorInduk = "Nomor induk wajib diisi";
    }

    if (!form.jenjang.trim()) {
      newErrors.jenjang = "Jenjang wajib diisi";
    }

    if (!form.sektor.trim()) {
      newErrors.sektor = "Sektor wajib diisi";
    }

    // PENGETAHUAN
    ["Firman", "Gereja", "Konteks"].forEach((item) => {
      const data = form.pengetahuan?.[item];

      if (!data?.predikat) {
        newErrors[`pengetahuan-${item}`] = "Predikat wajib dipilih";
      }

      if (!data?.komentar?.trim()) {
        newErrors[`pengetahuan-komentar-${item}`] = "Komentar wajib diisi";
      }
    });

    // SIKAP
    [
      "Kedisiplinan",
      "Kejujuran",
      "Tanggung Jawab",
      "Percaya Diri",
      "Hubungan Sosial",
    ].forEach((item) => {
      const data = form.sikap?.[item];

      if (!data?.predikat) {
        newErrors[`sikap-${item}`] = "Predikat wajib dipilih";
      }

      if (!data?.komentar?.trim()) {
        newErrors[`sikap-komentar-${item}`] = "Komentar wajib diisi";
      }
    });

    // KETERAMPILAN
    [
      "Memimpin Ibadah",
      "Berdoa",
      "Membaca Alkitab",
      "Memimpin Lagu dan Bernyanyi",
    ].forEach((item) => {
      const data = form.keterampilan?.[item];

      if (!data?.predikat) {
        newErrors[`keterampilan-${item}`] = "Predikat wajib dipilih";
      }

      if (!data?.komentar?.trim()) {
        newErrors[`keterampilan-komentar-${item}`] = "Komentar wajib diisi";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = async () => {
    const isValid = validateForm();

    if (!isValid) {
      alert("Mohon lengkapi semua data");

      return;
    }

    try {
      setLoading(true);

      await postAccomodation(form, "sekolahminggu");

      alert("Data berhasil disimpan");

      navigate("/report");
    } catch (error) {
      console.error(error);

      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const renderPredikat = (category: string, field: string) => (
    <div className="space-y-3">
      {/* SELECT */}
      <div>
        <select
          value={form?.[category]?.[field]?.predikat || ""}
          onChange={(e) =>
            handleNestedChange(category, field, "predikat", e.target.value)
          }
          className={`${inputClass} ${
            errors[`${category}-${field}`] ? errorClass : ""
          }`}
        >
          <option value="">Pilih Predikat</option>

          <option value="SB">SB - Sangat Baik</option>

          <option value="B">B - Baik</option>

          <option value="C">C - Cukup</option>

          <option value="K">K - Kurang</option>
        </select>

        {errors[`${category}-${field}`] && (
          <p className="text-sm text-red-500 mt-1">
            {errors[`${category}-${field}`]}
          </p>
        )}
      </div>

      {/* TEXTAREA */}
      <div>
        <textarea
          rows={3}
          placeholder="Tulis komentar..."
          value={form?.[category]?.[field]?.komentar || ""}
          onChange={(e) =>
            handleNestedChange(category, field, "komentar", e.target.value)
          }
          className={`${inputClass} ${
            errors[`${category}-komentar-${field}`] ? errorClass : ""
          }`}
        />

        {errors[`${category}-komentar-${field}`] && (
          <p className="text-sm text-red-500 mt-1">
            {errors[`${category}-komentar-${field}`]}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-sm border p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-3xl">
              <GraduationCap size={40} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            LAPORAN HASIL BELAJAR ANAK
          </h1>

          <div className="mt-4 space-y-1 text-gray-600">
            <p className="font-semibold">
              SEKOLAH MINGGU TUNAS PEKABARAN INJIL
            </p>

            <p className="font-semibold">GPM JEMAAT LATTA</p>

            <p className="font-semibold">TAHUN AJARAN 2025 / 2026</p>
          </div>
        </div>

        {/* IDENTITAS */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
              <User size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Identitas Anak</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* NAMA */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Nama Anak
              </label>

              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama anak"
                className={`${inputClass} ${errors.nama ? errorClass : ""}`}
              />

              {errors.nama && (
                <p className="text-sm text-red-500 mt-1">{errors.nama}</p>
              )}
            </div>

            {/* NOMOR INDUK */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Nomor Induk
              </label>

              <input
                type="text"
                name="nomorInduk"
                value={form.nomorInduk}
                onChange={handleChange}
                placeholder="Masukkan nomor induk"
                className={`${inputClass} ${
                  errors.nomorInduk ? errorClass : ""
                }`}
              />

              {errors.nomorInduk && (
                <p className="text-sm text-red-500 mt-1">{errors.nomorInduk}</p>
              )}
            </div>

            {/* JENJANG */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Jenjang
              </label>

              <input
                type="text"
                name="jenjang"
                value={form.jenjang}
                onChange={handleChange}
                placeholder="Contoh: Anak"
                className={`${inputClass} ${errors.jenjang ? errorClass : ""}`}
              />

              {errors.jenjang && (
                <p className="text-sm text-red-500 mt-1">{errors.jenjang}</p>
              )}
            </div>

            {/* SEKTOR */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Sektor
              </label>

              <input
                type="text"
                name="sektor"
                value={form.sektor}
                onChange={handleChange}
                placeholder="Contoh: Betesda"
                className={`${inputClass} ${errors.sektor ? errorClass : ""}`}
              />

              {errors.sektor && (
                <p className="text-sm text-red-500 mt-1">{errors.sektor}</p>
              )}
            </div>

            {/* SEMESTER */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Semester
              </label>

              <select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Semester I">Semester I</option>

                <option value="Semester II">Semester II</option>
              </select>
            </div>
          </div>
        </div>

        {/* PENGETAHUAN */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
              <BookOpen size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">A. Pengetahuan</h2>
          </div>

          {["Firman", "Gereja", "Konteks"].map((item) => (
            <div
              key={item}
              className="grid md:grid-cols-2 gap-5 border border-gray-100 rounded-2xl p-5 bg-gray-50"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{item}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  Isi penilaian dan komentar
                </p>
              </div>

              {renderPredikat("pengetahuan", item)}
            </div>
          ))}
        </div>

        {/* SIKAP */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
              <Sparkles size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">B. Sikap</h2>
          </div>

          {[
            "Kedisiplinan",
            "Kejujuran",
            "Tanggung Jawab",
            "Percaya Diri",
            "Hubungan Sosial",
          ].map((item) => (
            <div
              key={item}
              className="grid md:grid-cols-2 gap-5 border border-gray-100 rounded-2xl p-5 bg-gray-50"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{item}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  Isi penilaian dan komentar
                </p>
              </div>

              {renderPredikat("sikap", item)}
            </div>
          ))}
        </div>

        {/* KETERAMPILAN */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-2xl">
              <Sparkles size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              C. Keterampilan
            </h2>
          </div>

          {[
            "Memimpin Ibadah",
            "Berdoa",
            "Membaca Alkitab",
            "Memimpin Lagu dan Bernyanyi",
          ].map((item) => (
            <div
              key={item}
              className="grid md:grid-cols-2 gap-5 border border-gray-100 rounded-2xl p-5 bg-gray-50"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{item}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  Isi penilaian dan komentar
                </p>
              </div>

              {renderPredikat("keterampilan", item)}
            </div>
          ))}
        </div>

        {/* KEHADIRAN */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl">
              <ClipboardCheck size={22} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">D. Kehadiran</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* SMTPI */}
            <div className="border rounded-3xl p-5 bg-gray-50">
              <h3 className="font-bold text-lg mb-5 text-gray-800">SMTPI</h3>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="hadirSmtpi"
                  value={form.hadirSmtpi}
                  onChange={handleChange}
                  placeholder="Hadir"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="alpaSmtpi"
                  value={form.alpaSmtpi}
                  onChange={handleChange}
                  placeholder="Alpa"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="izinSmtpi"
                  value={form.izinSmtpi}
                  onChange={handleChange}
                  placeholder="Izin"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="sakitSmtpi"
                  value={form.sakitSmtpi}
                  onChange={handleChange}
                  placeholder="Sakit"
                  className={inputClass}
                />
              </div>
            </div>

            {/* TPI */}
            <div className="border rounded-3xl p-5 bg-gray-50">
              <h3 className="font-bold text-lg mb-5 text-gray-800">TPI</h3>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="hadirTpi"
                  value={form.hadirTpi}
                  onChange={handleChange}
                  placeholder="Hadir"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="alpaTpi"
                  value={form.alpaTpi}
                  onChange={handleChange}
                  placeholder="Alpa"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="izinTpi"
                  value={form.izinTpi}
                  onChange={handleChange}
                  placeholder="Izin"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="sakitTpi"
                  value={form.sakitTpi}
                  onChange={handleChange}
                  placeholder="Sakit"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={handleSaveData}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl font-semibold shadow-sm disabled:opacity-50"
          >
            <Save size={20} />

            {loading ? "Menyimpan..." : "Simpan Data"}
          </button>

          <Link
            to="/report"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black transition text-white px-6 py-4 rounded-2xl font-semibold"
          >
            <ArrowLeft size={20} />
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
