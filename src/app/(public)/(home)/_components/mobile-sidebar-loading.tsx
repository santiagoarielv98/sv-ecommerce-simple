// "use client";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const MobileSidebarLoading = () => {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: (theme) => theme.mixins.toolbar.minHeight,
        left: 0,
        right: 0,
        display: { xs: "flex", md: "none" },
        p: 1,
        zIndex: 1000,
        gap: 1,
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={36} />
      <Divider orientation="vertical" flexItem />
      <Skeleton variant="rectangular" width="100%" height={36} />
    </Paper>
  );
};

export default MobileSidebarLoading;
