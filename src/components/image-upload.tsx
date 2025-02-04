"use client";

import { Box, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onImageUpload: (files: FileList) => void;
  onImageDelete: (index: number) => void;
}

export function ImageUpload({
  images,
  onImageUpload,
  onImageDelete,
}: ImageUploadProps) {
  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && onImageUpload(e.target.files)}
        style={{ marginBottom: 2 }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, flexWrap: "wrap", gap: 2 }}
      >
        {images.map((image, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <Image
              src={image}
              alt={`Preview ${index}`}
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "background.paper",
              }}
              onClick={() => onImageDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
