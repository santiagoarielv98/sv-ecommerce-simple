import HideImageIcon from "@mui/icons-material/HideImage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
              <HideImageIcon fontSize="large" />
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
                  <KeyboardArrowLeftIcon />
                ) : (
                  <KeyboardArrowRightIcon />
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
                  <KeyboardArrowRightIcon />
                ) : (
                  <KeyboardArrowLeftIcon />
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
