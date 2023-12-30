import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../axios";
import { FlightTicket } from "../types/store.types";
import {
  FLIGHT_TICKETS_CREATED_SUCCESSFULLY,
  FLIGHT_TICKETS_DELETED_SUCCESSFULLY,
  FLIGHT_TICKETS_FAILED,
  FLIGHT_TICKETS_FETCHED_SUCCESSFULLY,
  FLIGHT_TICKETS_INITIAL,
  FLIGHT_TICKETS_PENDING,
  FLIGHT_TICKETS_UPDATED_SUCCESSFULLY,
} from "../constants/thunk-status";

export const getFlightTickets = createAsyncThunk(
  "flightTickets/get",
  async (_, thunkAPI) => {
    try {
      const res = await axios("/flightTickets");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createFlightTicket = createAsyncThunk(
  "flightTickets/create",
  async (flightTicket: FlightTicket, thunkAPI) => {
    try {
      const res = await axios.post(`flightTickets`, flightTicket);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateFlightTicket = createAsyncThunk(
  "flightTickets/update",
  async (
    { flightTicket, id }: { flightTicket: FlightTicket; id: number | string },
    thunkAPI
  ) => {
    try {
      const res = await axios.put(`flightTickets/${id}`, flightTicket);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteFlightTicket = createAsyncThunk(
  "flightTickets/delete",
  async (id: number | string, thunkAPI) => {
    try {
      const res = await axios.delete(`flightTickets/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

type UsersState = {
  flightTickets: FlightTicket[] | null;
  status: string;
  error: unknown;
};

const initialState: UsersState = {
  flightTickets: null,
  status: FLIGHT_TICKETS_INITIAL,
  error: null,
};

const flightTicketsSlice = createSlice({
  name: "flightTickets",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(getFlightTickets.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
      })
      .addCase(getFlightTickets.fulfilled, (state, action) => {
        state.status = FLIGHT_TICKETS_FETCHED_SUCCESSFULLY;
        state.flightTickets = action.payload;
      })
      .addCase(getFlightTickets.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload;
      })
      .addCase(createFlightTicket.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
      })
      .addCase(createFlightTicket.fulfilled, (state) => {
        state.status = FLIGHT_TICKETS_CREATED_SUCCESSFULLY;
      })
      .addCase(createFlightTicket.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload;
      })
      .addCase(updateFlightTicket.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
      })
      .addCase(updateFlightTicket.fulfilled, (state) => {
        state.status = FLIGHT_TICKETS_UPDATED_SUCCESSFULLY;
      })
      .addCase(updateFlightTicket.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload;
      })
      .addCase(deleteFlightTicket.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
      })
      .addCase(deleteFlightTicket.fulfilled, (state, action) => {
        state.status = FLIGHT_TICKETS_DELETED_SUCCESSFULLY;
      })
      .addCase(deleteFlightTicket.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload;
      });
  },
});

export default flightTicketsSlice.reducer;
