import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("foto");

    if (!file) {
      return Response.json({ status: "gagal", error: "Tidak ada file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Bikin nama file unik biar nggak numpuk/ketimpa file lain
    const ext = path.extname(file.name);
    const filename = `foto_${Date.now()}${ext}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filepath, buffer);

    return Response.json({ status: "berhasil", filename });
  } catch (error) {
    return Response.json({ status: "gagal", error: error.message }, { status: 500 });
  }
}