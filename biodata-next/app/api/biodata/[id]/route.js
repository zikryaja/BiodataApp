import pool from "@/lib/db";

// Ambil data biodata + email dari tabel users
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const [rows] = await pool.query(
      `SELECT biodata.*, users.email AS email
       FROM users
       LEFT JOIN biodata ON biodata.user_id = users.id
       WHERE users.id = ?`,
      [id]
    );
    return Response.json({ status: "berhasil", data: rows[0] || null });
  } catch (error) {
    return Response.json({ status: "gagal", error: error.message }, { status: 500 });
  }
}

// Simpan / update biodata (email TIDAK disimpan di sini, sudah ada dari signup)
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const {
    nama_lengkap, tempat_lahir, tanggal_lahir,
    jenis_kelamin, alamat, no_hp, asal_sekolah, foto
  } = body;

  try {
    await pool.query(
      `INSERT INTO biodata
        (user_id, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_hp, asal_sekolah, foto)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        nama_lengkap = VALUES(nama_lengkap),
        tempat_lahir = VALUES(tempat_lahir),
        tanggal_lahir = VALUES(tanggal_lahir),
        jenis_kelamin = VALUES(jenis_kelamin),
        alamat = VALUES(alamat),
        no_hp = VALUES(no_hp),
        asal_sekolah = VALUES(asal_sekolah),
        foto = VALUES(foto)`,
      [id, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_hp, asal_sekolah, foto]
    );
    return Response.json({ status: "berhasil" });
  } catch (error) {
    return Response.json({ status: "gagal", error: error.message }, { status: 500 });
  }
}