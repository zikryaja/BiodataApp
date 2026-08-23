"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function BiodataPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [form, setForm] = useState({
    nama_lengkap: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "L",
    alamat: "",
    no_hp: "",
    asal_sekolah: "",
    foto: "",
  });

  const [fotoFile, setFotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/biodata/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          setForm({
            nama_lengkap: result.data.nama_lengkap || "",
            tempat_lahir: result.data.tempat_lahir || "",
            tanggal_lahir: result.data.tanggal_lahir
              ? result.data.tanggal_lahir.split("T")[0]
              : "",
            jenis_kelamin: result.data.jenis_kelamin || "L",
            alamat: result.data.alamat || "",
            no_hp: result.data.no_hp || "",
            asal_sekolah: result.data.asal_sekolah || "",
            foto: result.data.foto || "",
          });
          if (result.data.foto) {
            setPreview(`/uploads/${result.data.foto}`);
          }
        }
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    let namaFoto = form.foto;

    if (fotoFile) {
      const fotoFormData = new FormData();
      fotoFormData.append("foto", fotoFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fotoFormData,
      });
      const uploadResult = await uploadRes.json();

      if (uploadResult.status !== "berhasil") {
        setMessage("❌ Gagal upload foto: " + uploadResult.error);
        setSaving(false);
        return;
      }
      namaFoto = uploadResult.filename;
    }

    const res = await fetch(`/api/biodata/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, foto: namaFoto }),
    });
    const result = await res.json();

    setSaving(false);
    if (result.status === "berhasil") {
      setMessage("✅ Data tersimpan! Mengarahkan ke profil...");
      setTimeout(() => {
        router.push(`/profil/${id}`);
      }, 800);
    } else {
      setMessage("❌ Gagal: " + result.error);
    }
  }

  if (loading) {
    return (
      <div style={styles.pageCenter}>
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Biodata Diri</h1>
          <p style={styles.headerSubtitle}>Lengkapi dan simpan data kamu</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.photoSection}>
            <img
              src={preview || "https://via.placeholder.com/120x120.png?text=Foto"}
              alt="Preview"
              style={styles.photoPreview}
            />
            <label style={styles.uploadButton}>
              Pilih Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Nama Lengkap</label>
              <input
                style={styles.input}
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Tempat Lahir</label>
              <input
                style={styles.input}
                name="tempat_lahir"
                value={form.tempat_lahir}
                onChange={handleChange}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Tanggal Lahir</label>
              <input
                style={styles.input}
                type="date"
                name="tanggal_lahir"
                value={form.tanggal_lahir}
                onChange={handleChange}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Jenis Kelamin</label>
              <select
                style={styles.input}
                name="jenis_kelamin"
                value={form.jenis_kelamin}
                onChange={handleChange}
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Alamat</label>
              <textarea
                style={{ ...styles.input, minHeight: 70, resize: "vertical" }}
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>No. HP</label>
              <input
                style={styles.input}
                name="no_hp"
                value={form.no_hp}
                onChange={handleChange}
              />
            </div>

            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Asal Sekolah</label>
              <input
                style={styles.input}
                name="asal_sekolah"
                value={form.asal_sekolah}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" style={styles.submitButton} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Biodata"}
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  pageCenter: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 600,
    background: "white",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    height: "fit-content",
  },
  header: {
    padding: "35px 45px",
    background: "#6577ff",
    color: "white",
    textAlign: "center",
  },
  headerTitle: {
    margin: 0,
    fontSize: 28,
  },
  headerSubtitle: {
    margin: "8px 0 0",
    opacity: 0.8,
  },
  form: {
    padding: 40,
  },
  photoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
    gap: 12,
  },
  photoPreview: {
    width: 110,
    height: 110,
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid #6577ff",
  },
  uploadButton: {
    padding: "8px 18px",
    background: "#f0f0f0",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 500,
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    fontFamily: "inherit",
    color: "#111",
    background: "#fff",
  },
  submitButton: {
    width: "100%",
    marginTop: 28,
    padding: "13px",
    background: "#6577ff",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: 500,
    color: "#111",
  },
};