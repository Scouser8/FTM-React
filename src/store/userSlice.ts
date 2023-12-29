import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../axios";
import { User } from "../types/store.types";

const addNewUser = createAsyncThunk("user/add", async (newUser, thunkAPI) => {
  try {
    const res = await axios.post("user", newUser);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const userLogin = createAsyncThunk("user/login", async (userInfo, thunkAPI) => {
  try {
    const res = await axios.post("user", userInfo);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

type UsersState = {
  user: User | undefined;
  loading?: boolean;
};

const initialState: UsersState = {
  user: {
    email: "staticUser@email.com",
    firstName: "Static",
    lastName: "User",
  },
  // user: undefined,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(addNewUser.pending, (state, action) => {
        return state;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        return state;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        return state;
      });
  },
});

export default userSlice.reducer;
