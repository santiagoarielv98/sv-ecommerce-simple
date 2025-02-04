"use server";

import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export async function uploadImageToLocal(buffer: ArrayBuffer): Promise<string> {
  try {
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;

    const uploadDir = join(process.cwd(), "public", "uploads");
    const filepath = join(uploadDir, filename);

    const imageBuffer = Buffer.from(buffer);

    await writeFile(filepath, imageBuffer);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload image");
  }
}

export async function deleteImage(filename: string) {
  try {
    const filepath = join(process.cwd(), "public", filename);
    await unlink(filepath);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete image");
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const paths: string[] = [];

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const path = await uploadImageToLocal(buffer);
    paths.push(path);
  }

  return paths;
}
