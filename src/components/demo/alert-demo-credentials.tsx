import React from "react";

import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { DEMO_CRENDETIALS_MP } from "@/config/demo";

const AlertDemoCredentials = () => {
  return (
    <Alert severity="info">
      <Typography variant="body2">
        Use these credentials to pay: <br />
        <strong>Email:</strong> {DEMO_CRENDETIALS_MP.email} <br />
        <strong>Password:</strong> {DEMO_CRENDETIALS_MP.password}
      </Typography>
    </Alert>
  );
};

export default AlertDemoCredentials;
