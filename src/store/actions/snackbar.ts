import { SnackbarState } from "../snackbarSlice";

const SHOW_SNACKBAR = "snackbar/showSnackbar";
const HIDE_SNACKBAR = "snackbar/hideSnackbar";

export const showSnackbar = (values: SnackbarState) => ({
  type: SHOW_SNACKBAR,
  payload: values,
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
