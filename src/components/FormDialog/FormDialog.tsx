import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DEFAULT_CANCEL_BUTTON_TEXT,
  DEFAULT_SUBMIT_BUTTON_TEXT,
} from "../../constants/dialog";
import { Box } from "@mui/material";

type Props = {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  form: React.ReactNode;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  title: string;
  submitText?: string;
  cancelText?: string;
};

export default function FormDialog(props: Props) {
  const {
    isDialogOpen,
    handleDialogClose,
    form,
    handleSubmit,
    title,
    submitText = DEFAULT_SUBMIT_BUTTON_TEXT,
    cancelText = DEFAULT_CANCEL_BUTTON_TEXT,
  } = props;

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{title}</DialogTitle>
      <Box component="form">
        <DialogContent>{form}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{cancelText}</Button>
          <Button onClick={handleSubmit} type="submit">
            {submitText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
