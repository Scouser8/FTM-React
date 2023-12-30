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

type FlighTicketsState = {
  flightTickets: FlightTicket[] | null;
  status: string;
  error: string;
};

const initialState: FlighTicketsState = {
  flightTickets: null,
  status: FLIGHT_TICKETS_INITIAL,
  error: "",
};

const flightTicketsSlice = createSlice({
  name: "flightTickets",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<FlighTicketsState>) => {
    builder
      .addCase(getFlightTickets.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
        state.error = "";
      })
      .addCase(getFlightTickets.fulfilled, (state, action) => {
        state.status = FLIGHT_TICKETS_FETCHED_SUCCESSFULLY;
        state.flightTickets = action.payload;
        state.error = "";
      })
      .addCase(getFlightTickets.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload as string;
      })
      .addCase(createFlightTicket.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
        state.error = "";
      })
      .addCase(createFlightTicket.fulfilled, (state) => {
        state.status = FLIGHT_TICKETS_CREATED_SUCCESSFULLY;
      })
      .addCase(createFlightTicket.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload as string;
      })
      .addCase(updateFlightTicket.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
        state.error = "";
      })
      .addCase(updateFlightTicket.fulfilled, (state) => {
        state.status = FLIGHT_TICKETS_UPDATED_SUCCESSFULLY;
        state.error = "";
      })
      .addCase(updateFlightTicket.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload as string;
      })
      .addCase(deleteFlightTicket.pending, (state) => {
        state.status = FLIGHT_TICKETS_PENDING;
        state.error = "";
      })
      .addCase(deleteFlightTicket.fulfilled, (state) => {
        state.status = FLIGHT_TICKETS_DELETED_SUCCESSFULLY;
        state.error = "";
      })
      .addCase(deleteFlightTicket.rejected, (state, action) => {
        state.status = FLIGHT_TICKETS_FAILED;
        state.error = action.payload as string;
      });
  },
});

export default flightTicketsSlice.reducer;
