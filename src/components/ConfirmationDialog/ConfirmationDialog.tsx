import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  DEFAULT_CANCEL_BUTTON_TEXT,
  DEFAULT_SUBMIT_BUTTON_TEXT,
} from "../../constants/dialog";
import { Typography } from "@mui/material";

type Props = {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  confirmationMessage: string;
  handleSubmit: () => void;
  submitText?: string;
  cancelText?: string;
};

export default function ConfirmationDialog(props: Props) {
  const {
    isDialogOpen,
    handleDialogClose,
    confirmationMessage,
    handleSubmit,
    submitText = DEFAULT_SUBMIT_BUTTON_TEXT,
    cancelText = DEFAULT_CANCEL_BUTTON_TEXT,
  } = props;

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogContent>
        <Typography>{confirmationMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>{cancelText}</Button>
        <Button onClick={handleSubmit}>{submitText}</Button>
      </DialogActions>
    </Dialog>
  );
}
