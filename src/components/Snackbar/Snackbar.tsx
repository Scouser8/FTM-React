import React, { useState } from "react";

import MIUSnackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import {
  HorizontalAlignment,
  SnackSeverity,
  VerticalAlignment,
} from "../../types/snackbar.types";

type Props = {
  message: string;
  status?: SnackSeverity;
  timeout?: number;
  vertical?: VerticalAlignment;
  horizontal?: HorizontalAlignment;
};

function Snackbar(props: Props) {
  const {
    message,
    status = "info",
    timeout = 5000,
    vertical = "top",
    horizontal = "right",
  } = props;
  const [open, setOpen] = useState<boolean>();

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <MIUSnackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={timeout}
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MIUSnackbar>
    </React.Fragment>
  );
}

export default Snackbar;
