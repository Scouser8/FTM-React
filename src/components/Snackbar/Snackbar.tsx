import MIUSnackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import {
  HorizontalAlignment,
  SnackSeverity,
  VerticalAlignment,
} from "../../types/snackbar.types";
import { useDispatch } from "react-redux";
import { hideSnackbar } from "../../store/actions/snackbar";

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
    vertical = "bottom",
    horizontal = "right",
  } = props;

  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideSnackbar());

  return (
    <MIUSnackbar
      anchorOrigin={{ vertical, horizontal }}
      open
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
      autoHideDuration={timeout}
    >
      <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MIUSnackbar>
  );
}

export default Snackbar;
