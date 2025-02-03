import {
  HideImage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  MobileStepper,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export interface ImagePreviewDialogProps {
  images: string[];
}

export default function ImagePreviewDialog({
  images,
}: ImagePreviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          height: "400px",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <Image
          src={images[0]}
          alt="Preview"
          fill
          style={{ objectFit: "cover" }}
        />
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        slotProps={{
          paper: {
            sx: {
              height: "auto",
            },
          },
        }}
      >
        <DialogContent
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            flexDirection: "column",
            p: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: "auto",
              overflow: "hidden",
            }}
          >
            <Avatar
              variant="square"
              src={images[currentImageIndex]}
              sx={{
                width: "100%",
                position: "relative",
                height: "auto",
                overflow: "hidden",
              }}
            >
              <HideImage />
            </Avatar>
          </Box>
          <MobileStepper
            variant="dots"
            steps={images.length}
            position="static"
            activeStep={currentImageIndex}
            sx={{ flexGrow: 1, width: "100%" }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={currentImageIndex === images.length - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handlePrev}
                disabled={currentImageIndex === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
