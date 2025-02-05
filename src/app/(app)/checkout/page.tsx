"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AddressForm from "./_components/address-form";
import Info from "./_components/info";
import InfoMobile from "./_components/info-mobile";
import Button from "@mui/material/Button";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Container from "@mui/material/Container";

export default function Checkout() {
  return (
    <Container>
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={"$134.98"} />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">{"$134.98"}</Typography>
              </div>
              <InfoMobile totalPrice={"$134.98"} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <AddressForm />
            <Box
              sx={[
                {
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  alignItems: "end",
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 0 },
                  mb: "60px",
                },
                {
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                sx={{ width: { xs: "100%", sm: "fit-content" } }}
              >
                Place order
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
