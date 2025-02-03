"use client";

import { SnackbarProvider } from "notistack";

export default function AppProvider() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    />
  );
}
