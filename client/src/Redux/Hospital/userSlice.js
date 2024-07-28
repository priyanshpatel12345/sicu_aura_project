import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  code: null,
  capturedImage: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    specialAccessCode: (state, action) => {
      state.code = action.payload;
      state.error = false;
      state.loading = false;
    },
    setImageFileUrl: (state, action) => {
      state.capturedImage = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  specialAccessCode,
  setImageFileUrl,
} = userSlice.actions;

export default userSlice.reducer;
