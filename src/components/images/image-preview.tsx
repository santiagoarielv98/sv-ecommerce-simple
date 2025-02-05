"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import React from "react";

interface ImagePreviewProps {
  images: string[];
}

function ImagePreview({ images }: ImagePreviewProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
        }}
      >
        <Image
          src={images[selectedImage]}
          alt="Product image"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
        {images.map((image, index) => (
          <Box
            key={image}
            sx={{
              width: 80,
              height: 80,
              position: "relative",
              cursor: "pointer",
              border: index === selectedImage ? "2px solid" : "none",
              borderColor: "primary.main",
            }}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default ImagePreview;
