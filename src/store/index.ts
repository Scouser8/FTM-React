import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import flightTickets from "./flightTicketsSlice";
import snackbar from "./snackbarSlice";

export default configureStore({
  reducer: { user, flightTickets, snackbar },
});
