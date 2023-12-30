import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types/store.types";

const snackbar = (state: RootState) => state.snackbar;

export const snackbarValuesSelector = createSelector([snackbar], (snackbar) => snackbar);
