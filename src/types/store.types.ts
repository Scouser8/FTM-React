import store from "../store";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export type RootState = ReturnType<typeof store.getState>;
