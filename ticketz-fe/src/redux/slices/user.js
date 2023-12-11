import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileData } from "utils/https/user";
import { changeProfileData } from "utils/https/user";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getProfile = createAsyncThunk(
  "profile/get",
  async ({ token, controller }) => {
    try {
      const response = await getProfileData(token, controller);
      return response.data.data[0];
    } catch (err) {
      return err;
    }
  }
);

const editUserProfile = createAsyncThunk(
  "profile/patch",
  async ({ body, token, controller }) => {
    try {
      const formData = new FormData();
      formData.append("firstName", body.firstName);
      formData.append("lastName", body.lastName);
      formData.append("lastName", body.phone);
      const response = await changeProfileData(formData, token, controller);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    filter: (prevState) => {
      return {
        ...prevState,
        data: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getProfile.fulfilled, (prevState, action) => {
        // console.log(action.payload);
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getProfile.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      })
      .addCase(editUserProfile.pending, (prevState, action) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(editUserProfile.fulfilled, (prevState, action) => {
        console.log(action.payload);
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
          // data: { ...prevState.data, ...action.payload },
        };
      })
      .addCase(editUserProfile.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const profileAction = {
  ...profileSlice.actions,
  getProfile,
  editUserProfile,
};
export default profileSlice.reducer;
