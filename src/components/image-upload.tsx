"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import HideImageIcon from "@mui/icons-material/HideImage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface ImageUploadProps {
  images: string[];
  onImageUpload: (files: FileList) => void;
  onImageDelete: (index: number) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function ImageUpload({
  images,
  onImageUpload,
  onImageDelete,
}: ImageUploadProps) {
  return (
    <Stack spacing={4}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{
          width: "fit-content",
        }}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && onImageUpload(e.target.files)}
          multiple
        />
      </Button>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, flexWrap: "wrap", gap: 2 }}
      >
        {images.map((image, index) => (
          <Badge
            key={image}
            badgeContent={
              <IconButton
                onClick={() => onImageDelete(index)}
                size="small"
                sx={{
                  backgroundColor: "error.main",
                  color: "error.contrastText",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Avatar
              variant="rounded"
              sx={{ width: 100, height: 100, position: "relative" }}
              src={image}
            >
              <HideImageIcon />
            </Avatar>
          </Badge>
        ))}
      </Stack>
    </Stack>
  );
}
