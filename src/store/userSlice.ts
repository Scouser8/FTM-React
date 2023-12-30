import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../axios";
import { User } from "../types/store.types";
import {
  USER_AUTH_FAILED,
  USER_AUTH_PENDING,
  USER_LOGIN_SUCCESSFUL,
  USER_REGISTRATION_SUCCESSFUL,
} from "../constants/thunk-status";
import { UserLoginInfo, UserRegisterInfo } from "../types/form.types";

export const userRegister = createAsyncThunk(
  "user/add",
  async (newUser: UserRegisterInfo, thunkAPI) => {
    try {
      const res = await axios.post("/signup", newUser);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userInfo: UserLoginInfo, thunkAPI) => {
    try {
      const res = await axios.post("login", userInfo);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

type UsersState = {
  user: User | null;
  token: string | null;
  status: string;
  error: unknown;
};

const initialState: UsersState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("state", state.user);
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = USER_AUTH_PENDING;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.status = USER_REGISTRATION_SUCCESSFUL;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = USER_AUTH_FAILED;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = USER_AUTH_PENDING;
        state.token = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = USER_LOGIN_SUCCESSFUL;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = USER_AUTH_FAILED;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
