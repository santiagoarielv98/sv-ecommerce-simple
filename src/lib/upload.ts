"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadImageToLocal(buffer: ArrayBuffer): Promise<string> {
  try {
    // Crear un nombre único para el archivo
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;

    // Definir la ruta donde se guardará el archivo
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filepath = join(uploadDir, filename);

    // Convertir ArrayBuffer a Buffer
    const imageBuffer = Buffer.from(buffer);

    // Guardar el archivo
    await writeFile(filepath, imageBuffer);

    // Retornar la URL relativa del archivo
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload image");
  }
}
