import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types/store.types";

const user = (state: RootState) => state.user;

export const getUserSelector = createSelector([user], (user) => user);
