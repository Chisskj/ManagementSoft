import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "utils/https/auth";

const initialState = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const doLogin = createAsyncThunk(
  "auth/post",
  async ({ email, password }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await login(email, password);
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutRedux: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(doLogin.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(doLogin.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const authAction = {
  ...authSlice.actions,
  doLogin,
};

export default authSlice.reducer;
