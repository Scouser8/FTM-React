import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types/store.types";

const flightTickets = (state: RootState) => state.flightTickets;

export const flightTicketsSelector= createSelector(
  [flightTickets],
  (flightTickets) => flightTickets
);
