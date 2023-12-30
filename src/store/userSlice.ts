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
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/signup", newUser);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userInfo: UserLoginInfo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("login", userInfo);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

type UsersState = {
  user: User | null;
  token: string | null;
  status: string;
  error: string;
};

const initialState: UsersState = {
  user: null,
  token: null,
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = USER_AUTH_PENDING;
        state.error = "";
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.status = USER_REGISTRATION_SUCCESSFUL;
        state.error = "";
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = USER_AUTH_FAILED;
        state.error = action.payload as string;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = USER_AUTH_PENDING;
        state.token = null;
        state.error = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = USER_LOGIN_SUCCESSFUL;
        state.user = action.payload?.user;
        state.token = action.payload?.accessToken;
        state.error = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = USER_AUTH_FAILED;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
