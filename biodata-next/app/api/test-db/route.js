import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS hasil");
    return Response.json({ status: "berhasil", data: rows });
  } catch (error) {
    return Response.json({ status: "gagal", error: error.message }, { status: 500 });
  }
}