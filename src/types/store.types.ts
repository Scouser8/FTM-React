import store from "../store";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
};

export type FlightTicket = {
  id?: string | number;
  flightCode: string;
  date?: any;
  capacity: number;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
