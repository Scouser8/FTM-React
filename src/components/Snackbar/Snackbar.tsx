import MIUSnackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import {
  HorizontalAlignment,
  SnackSeverity,
  VerticalAlignment,
} from "../../types/snackbar.types";
import { useDispatch } from "react-redux";
import { hideSnackbar } from "../../store/actions/snackbar";
import {
  AUTO_HIDE_DURATION_MS,
  DEFAULT_HORIZONTAL_ALIGNMENT,
  DEFAULT_STATUS,
  DEFAULT_VERTICAL_ALIGNMENT,
} from "../../constants/snackbar";

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
    status = DEFAULT_STATUS,
    timeout = AUTO_HIDE_DURATION_MS,
    vertical = DEFAULT_VERTICAL_ALIGNMENT,
    horizontal = DEFAULT_HORIZONTAL_ALIGNMENT,
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
