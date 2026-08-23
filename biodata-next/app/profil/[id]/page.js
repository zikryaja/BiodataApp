"use client";

import { useState, useEffect, use } from "react";

export default function ProfilPage({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/biodata/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.pageCenter}>
        <p>Memuat data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.pageCenter}>
        <div style={{ textAlign: "center" }}>
          <p>Kamu belum mengisi biodata.</p>
          <a href={`/biodata/${id}`} style={styles.linkButton}>
            Isi Biodata Sekarang
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src={data.foto ? `/uploads/${data.foto}` : "https://via.placeholder.com/120x120.png?text=Foto"}
            alt="Foto Profil"
            style={styles.photo}
          />
          <h1 style={styles.name}>{data.nama_lengkap}</h1>
          <p style={styles.subtitle}>{data.email}</p>
        </div>

        <div style={styles.body}>
          <div style={styles.row}>
            <span style={styles.label}>Tempat, Tanggal Lahir</span>
            <span style={styles.value}>
              {data.tempat_lahir}
              {data.tanggal_lahir
                ? `, ${new Date(data.tanggal_lahir).toLocaleDateString("id-ID")}`
                : ""}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Jenis Kelamin</span>
            <span style={styles.value}>
              {data.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Alamat</span>
            <span style={styles.value}>{data.alamat}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>No. HP</span>
            <span style={styles.value}>{data.no_hp}</span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Asal Sekolah</span>
            <span style={styles.value}>{data.asal_sekolah}</span>
          </div>

          <div style={styles.buttonGroup}>
            <a href={`/biodata/${id}`} style={styles.editButton}>
              Edit Profil
            </a>
            <a href="http://localhost/Project_Biodata/index.php" style={styles.logoutButton}>
              Log Out
            </a>
          </div>
        </div>
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
    maxWidth: 500,
    background: "white",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    height: "fit-content",
  },
  header: {
    padding: "40px 30px",
    background: "#6577ff",
    color: "white",
    textAlign: "center",
  },
  photo: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid white",
    marginBottom: 15,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  name: {
    margin: 0,
    fontSize: 24,
  },
  subtitle: {
    margin: "6px 0 0",
    opacity: 0.85,
    fontSize: 14,
  },
  body: {
    padding: 30,
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  label: {
    fontSize: 12,
    color: "#999",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 15,
    color: "#222",
  },
  buttonGroup: {
    display: "flex",
    gap: 12,
    marginTop: 25,
  },
  editButton: {
    flex: 1,
    textAlign: "center",
    padding: "12px",
    background: "#6577ff",
    color: "white",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
  logoutButton: {
    flex: 1,
    textAlign: "center",
    padding: "12px",
    background: "#f1f1f1",
    color: "#333",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
  linkButton: {
    display: "inline-block",
    marginTop: 15,
    padding: "12px 24px",
    background: "#6577ff",
    color: "white",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
  },
};