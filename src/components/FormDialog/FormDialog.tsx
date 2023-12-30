import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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

const DEFAULT_SUBMIT_BUTTON_TEXT = "Submit";
const DEFAULT_CANCEL_BUTTON_TEXT = "Cancel";

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
    <React.Fragment>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{form}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{cancelText}</Button>
          <Button onClick={handleSubmit}>{submitText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
