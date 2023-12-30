import { createSlice } from "@reduxjs/toolkit";
import {
  HorizontalAlignment,
  SnackSeverity,
  VerticalAlignment,
} from "../types/snackbar.types";

export type SnackbarState = {
  message: string;
  status?: SnackSeverity;
  timeoutMS?: number;
  vertical?: VerticalAlignment;
  horizontal?: HorizontalAlignment;
};

const initialState: SnackbarState = {
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (_, action) => action.payload,
    hideSnackbar: () => initialState,
  },
});

export default snackbarSlice.reducer;
