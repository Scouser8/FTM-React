import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import flightTickets from "./flightTicketsSlice";

export default configureStore({
  reducer: { user, flightTickets },
});
